// backend/routes/translateRoute.js
import express from "express";
import axios from "axios";

const router = express.Router();

// Fast offline translation dictionary for common medical terms
const medicalTranslations = {
  // English to Hindi
  "en-hi": {
    "headache": "सिरदर्द",
    "fever": "बुखार", 
    "cough": "खांसी",
    "stomach pain": "पेट दर्द",
    "chest pain": "सीने में दर्द",
    "difficulty breathing": "सांस लेने में कठिनाई",
    "nausea": "मतली",
    "dizziness": "चक्कर आना",
    "fatigue": "थकान",
    "pain": "दर्द",
    "hello": "नमस्ते",
    "how are you": "आप कैसे हैं",
    "thank you": "धन्यवाद",
    "I have": "मुझे है",
    "I feel": "मुझे लगता है",
    "doctor": "डॉक्टर",
    "medicine": "दवा",
    "hospital": "अस्पताल"
  },
  // English to Marathi  
  "en-mr": {
    "headache": "डोकेदुखी",
    "fever": "ताप",
    "cough": "खोकला", 
    "stomach pain": "पोटदुखी",
    "chest pain": "छातीत दुखणे",
    "difficulty breathing": "श्वास घेण्यात अडचण",
    "nausea": "मळमळ",
    "dizziness": "चक्कर येणे",
    "fatigue": "थकवा",
    "pain": "वेदना",
    "hello": "नमस्कार",
    "how are you": "तुम्ही कसे आहात",
    "thank you": "धन्यवाद",
    "I have": "मला आहे",
    "I feel": "मला वाटते",
    "doctor": "डॉक्टर",
    "medicine": "औषध",
    "hospital": "रुग्णालय"
  },
  // Hindi to English
  "hi-en": {
    "सिरदर्द": "headache",
    "बुखार": "fever",
    "खांसी": "cough", 
    "पेट दर्द": "stomach pain",
    "सीने में दर्द": "chest pain",
    "सांस लेने में कठिनाई": "difficulty breathing",
    "मतली": "nausea",
    "चक्कर आना": "dizziness",
    "थकान": "fatigue",
    "दर्द": "pain",
    "नमस्ते": "hello",
    "धन्यवाद": "thank you",
    "मुझे है": "I have",
    "मुझे लगता है": "I feel",
    "डॉक्टर": "doctor",
    "दवा": "medicine",
    "अस्पताल": "hospital"
  },
  // Marathi to English
  "mr-en": {
    "डोकेदुखी": "headache",
    "ताप": "fever",
    "खोकला": "cough",
    "पोटदुखी": "stomach pain", 
    "छातीत दुखणे": "chest pain",
    "श्वास घेण्यात अडचण": "difficulty breathing",
    "मळमळ": "nausea",
    "चक्कर येणे": "dizziness",
    "थकवा": "fatigue",
    "वेदना": "pain",
    "नमस्कार": "hello",
    "धन्यवाद": "thank you",
    "मला आहे": "I have",
    "मला वाटते": "I feel",
    "डॉक्टर": "doctor",
    "औषध": "medicine",
    "रुग्णालय": "hospital"
  }
};

// Fast offline translation function
const translateOffline = (text, source, target) => {
  const key = `${source}-${target}`;
  const dictionary = medicalTranslations[key];
  
  if (!dictionary) return null;
  
  let translatedText = text.toLowerCase();
  
  // Replace known terms
  for (const [original, translation] of Object.entries(dictionary)) {
    const regex = new RegExp(original.toLowerCase(), 'gi');
    translatedText = translatedText.replace(regex, translation);
  }
  
  return translatedText !== text.toLowerCase() ? translatedText : null;
};

// Language code mapping for different services
const languageMapping = {
  en: "en",
  hi: "hi", 
  mr: "mr",
  es: "es",
  fr: "fr",
  de: "de",
  it: "it",
  pt: "pt",
  ru: "ru",
  ja: "ja",
  ko: "ko",
  zh: "zh",
  ar: "ar"
};

router.post("/translate", async (req, res) => {
  try {
    const { q, source, target } = req.body;

    // Validate input
    if (!q || !source || !target) {
      return res.status(400).json({ error: "Missing required parameters: q, source, target" });
    }

    // If source and target are the same, return original text
    if (source === target) {
      return res.json({ translatedText: q });
    }

    // Try offline translation first (fastest)
    const offlineTranslation = translateOffline(q, source, target);
    if (offlineTranslation) {
      return res.json({ 
        translatedText: offlineTranslation,
        method: "offline"
      });
    }

    // Map language codes for online services
    const mappedSource = languageMapping[source] || source;
    const mappedTarget = languageMapping[target] || target;

    let translatedText = null;
    let lastError = null;

    // Try MyMemory first (faster and more reliable than LibreTranslate)
    try {
      const response = await axios.get("https://api.mymemory.translated.net/get", {
        params: {
          q: q.trim(),
          langpair: `${mappedSource}|${mappedTarget}`
        },
        timeout: 5000 // Reduced timeout
      });

      if (response.data && response.data.responseData && response.data.responseData.translatedText) {
        translatedText = response.data.responseData.translatedText;
      }
    } catch (error) {
      console.warn("MyMemory failed:", error.message);
      lastError = error;
    }

    // Fallback to LibreTranslate if MyMemory failed
    if (!translatedText) {
      try {
        const response = await axios.post(
          "https://libretranslate.de/translate",
          {
            q: q.trim(),
            source: mappedSource,
            target: mappedTarget,
            format: "text"
          },
          {
            timeout: 5000, // Reduced timeout
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data && response.data.translatedText) {
          translatedText = response.data.translatedText;
        }
      } catch (error) {
        console.warn("LibreTranslate failed:", error.message);
        lastError = error;
      }
    }

    // If online services failed, try a more comprehensive offline translation
    if (!translatedText) {
      // Try word-by-word translation for better coverage
      const words = q.toLowerCase().split(' ');
      const key = `${source}-${target}`;
      const dictionary = medicalTranslations[key];
      
      if (dictionary) {
        const translatedWords = words.map(word => {
          // Check for exact matches first
          if (dictionary[word]) return dictionary[word];
          
          // Check for partial matches
          for (const [original, translation] of Object.entries(dictionary)) {
            if (word.includes(original.toLowerCase()) || original.toLowerCase().includes(word)) {
              return translation;
            }
          }
          
          return word; // Keep original if no translation found
        });
        
        translatedText = translatedWords.join(' ');
      }
    }

    // Final fallback - return original text
    if (!translatedText || translatedText === q) {
      console.error("All translation methods failed:", lastError?.message);
      return res.json({ 
        translatedText: q, 
        warning: "Translation unavailable, returning original text",
        method: "fallback"
      });
    }

    // Clean up the translated text
    const cleanedText = translatedText
      .replace(/\s+/g, ' ')
      .trim();

    res.json({ 
      translatedText: cleanedText,
      method: translatedText === offlineTranslation ? "offline" : "online"
    });

  } catch (error) {
    console.error("Translation error:", error.message);
    res.status(500).json({ 
      error: "Translation failed",
      translatedText: req.body.q, // Return original text as fallback
      method: "error_fallback"
    });
  }
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    service: "Translation API",
    supportedLanguages: Object.keys(languageMapping)
  });
});

export default router;
