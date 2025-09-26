// import axios from "axios";

// const API_KEY = process.env.OPENROUTER_API_KEY;
// const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
// const MODEL = "gpt-4";

// // Emergency keywords
// const EMERGENCY_KEYWORDS = [
//   "chest pain",
//   "trouble breathing",
//   "difficulty breathing",
//   "shortness of breath",
//   "severe bleeding",
//   "unconscious",
//   "heart attack",
//   "stroke",
//   "seizure"
// ];

// export const getChatbotResponse = async (req, res) => {
//   try {
//     const { userQuery, chatHistory } = req.body;

//     // 🚨 Emergency detection
//     const lowerQuery = userQuery.toLowerCase();
//     if (EMERGENCY_KEYWORDS.some(word => lowerQuery.includes(word))) {
//       return res.json({
//         response:
//           "🚨 This could be a medical emergency. Please call your local emergency number or go to the hospital immediately."
//       });
//     }

//     // Prepare messages
//     const messages = [
//       {
//         role: "system",
//         content:
//           "You are an expert medical assistant. Only answer medical-related questions. " +
//           "When the user provides symptoms, first ask the most relevant follow-up question. " +
//           "After clarifying, suggest possible conditions in a friendly, human-readable way. " +
//           "Always recommend consulting a doctor if symptoms are serious. " +
//           "Do NOT use bullet points, answer like a real doctor speaking. " +
//           "If the question is not medical, reply: 'I am a medical assistant and can only answer medical-related questions.'"
//       },
//       ...(chatHistory || []),
//       { role: "user", content: userQuery }
//     ];

//     // API call
//     const response = await axios.post(
//       BASE_URL,
//       {
//         model: MODEL,
//         messages,
//         temperature: 0.7,
//         max_tokens: 300
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     const answer = response.data.choices[0].message.content;
//     res.json({ response: answer });
//   } catch (error) {
//     console.error("Chatbot error:", error.message);
//     res.status(500).json({ error: "Something went wrong" });
//     console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);

//   }
// };






import axios from "axios";
import { getOfflineResponse } from "../utils/medicalKnowledge.js";

const API_KEY = process.env.OPENROUTER_API_KEY;
const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "gpt-4";

// Emergency keywords
const EMERGENCY_KEYWORDS = [
  "chest pain",
  "trouble breathing",
  "difficulty breathing",
  "shortness of breath",
  "severe bleeding",
  "unconscious",
  "heart attack",
  "stroke",
  "seizure"
];

// Fallback responses for when API is unavailable
const getFallbackResponse = (userQuery, language) => {
  const fallbackResponses = {
    en: {
      greeting: "Hello! I'm MediSync AI. While I'm experiencing some technical issues with my advanced features, I can still provide basic medical guidance. Please describe your symptoms and I'll do my best to help.",
      symptoms: "Based on your symptoms, I recommend consulting with a healthcare professional for proper evaluation. In the meantime, ensure you stay hydrated, get adequate rest, and monitor your symptoms. If symptoms worsen or you feel this is urgent, please seek immediate medical attention.",
      general: "I'm currently experiencing technical difficulties with my AI services. For immediate medical concerns, please contact your healthcare provider or emergency services. I apologize for the inconvenience."
    },
    hi: {
      greeting: "नमस्ते! मैं MediSync AI हूं। जबकि मुझे अपनी उन्नत सुविधाओं के साथ कुछ तकनीकी समस्याएं हो रही हैं, मैं अभी भी बुनियादी चिकित्सा मार्गदर्शन प्रदान कर सकता हूं।",
      symptoms: "आपके लक्षणों के आधार पर, मैं उचित मूल्यांकन के लिए किसी स्वास्थ्य सेवा पेशेवर से सलाह लेने की सलाह देता हूं। इस बीच, सुनिश्चित करें कि आप हाइड्रेटेड रहें, पर्याप्त आराम करें।",
      general: "मुझे वर्तमान में अपनी AI सेवाओं के साथ तकनीकी कठिनाइयों का सामना कर रहा हूं। तत्काल चिकित्सा चिंताओं के लिए, कृपया अपने स्वास्थ्य सेवा प्रदाता से संपर्क करें।"
    },
    mr: {
      greeting: "नमस्कार! मी MediSync AI आहे। माझ्या प्रगत वैशिष्ट्यांमध्ये काही तांत्रिक समस्या येत असताना, मी अजूनही मूलभूत वैद्यकीय मार्गदर्शन देऊ शकतो।",
      symptoms: "तुमच्या लक्षणांच्या आधारे, मी योग्य मूल्यांकनासाठी आरोग्य सेवा व्यावसायिकाचा सल्ला घेण्याची शिफारस करतो।",
      general: "मला सध्या माझ्या AI सेवांमध्ये तांत्रिक अडचणी येत आहेत। तत्काळ वैद्यकीय चिंतेसाठी, कृपया तुमच्या आरोग्य सेवा प्रदात्याशी संपर्क साधा।"
    }
  };

  const responses = fallbackResponses[language] || fallbackResponses.en;
  
  if (userQuery.toLowerCase().includes('hello') || userQuery.toLowerCase().includes('hi') || userQuery.toLowerCase().includes('नमस्ते') || userQuery.toLowerCase().includes('नमस्कार')) {
    return responses.greeting;
  } else if (userQuery.length > 10) {
    return responses.symptoms;
  } else {
    return responses.general;
  }
};

export const getChatbotResponse = async (req, res) => {
  const { userQuery, chatHistory, language = "en" } = req.body;
  
  try {
    // 🚨 Emergency detection (multilingual)
    const emergencyKeywords = {
      en: ["chest pain", "trouble breathing", "difficulty breathing", "shortness of breath", "severe bleeding", "unconscious", "heart attack", "stroke", "seizure", "emergency"],
      hi: ["सीने में दर्द", "सांस लेने में तकलीफ", "गंभीर रक्तस्राव", "बेहोश", "दिल का दौरा", "स्ट्रोक", "आपातकाल"],
      mr: ["छातीत दुखणे", "श्वास घेण्यात अडचण", "गंभीर रक्तस्राव", "बेशुद्ध", "हृदयविकाराचा झटका", "स्ट्रोक", "आणीबाणी"],
      es: ["dolor en el pecho", "dificultad para respirar", "sangrado severo", "inconsciente", "ataque al corazón", "derrame cerebral", "emergencia"],
      fr: ["douleur thoracique", "difficulté à respirer", "saignement sévère", "inconscient", "crise cardiaque", "accident vasculaire cérébral", "urgence"]
    };

    const emergencyMessages = {
      en: "🚨 This could be a medical emergency. Please call your local emergency number or go to the hospital immediately.",
      hi: "🚨 यह एक चिकित्सा आपातकाल हो सकता है। कृपया अपने स्थानीय आपातकालीन नंबर पर कॉल करें या तुरंत अस्पताल जाएं।",
      mr: "🚨 ही वैद्यकीय आणीबाणी असू शकते. कृपया तुमच्या स्थानिक आणीबाणी क्रमांकावर कॉल करा किंवा तातडीने रुग्णालयात जा.",
      es: "🚨 Esto podría ser una emergencia médica. Llame a su número de emergencia local o vaya al hospital inmediatamente.",
      fr: "🚨 Ceci pourrait être une urgence médicale. Veuillez appeler votre numéro d'urgence local ou vous rendre immédiatement à l'hôpital."
    };

    const lowerQuery = userQuery.toLowerCase();
    const currentEmergencyKeywords = emergencyKeywords[language] || emergencyKeywords.en;
    
    if (currentEmergencyKeywords.some(word => lowerQuery.includes(word.toLowerCase()))) {
      return res.json({
        response: emergencyMessages[language] || emergencyMessages.en
      });
    }

    // Shorter system prompt to save tokens
    const systemPrompt = `You are MediSync AI, a medical assistant. Provide helpful medical information in a caring tone. Ask one follow-up question if needed. Suggest possible conditions but never diagnose. Always recommend consulting healthcare professionals. Keep responses under 120 words. Only answer medical questions. Avoid emojis and excessive punctuation.`;

    // If non-English, translate user query to English first to avoid gibberish
    let finalUserQuery = userQuery;
    let targetLang = (language || 'en').toLowerCase();
    if (targetLang !== 'en') {
      try {
        const base = process.env.BACKEND_INTERNAL_URL || `http://127.0.0.1:${process.env.PORT || 4000}`;
        const t = await axios.post(`${base}/api/translate`, {
          q: userQuery,
          source: targetLang,
          target: 'en'
        }, { timeout: 7000 });
        if (t.data?.translatedText) {
          finalUserQuery = t.data.translatedText;
        }
      } catch (e) {
        // If translation fails, continue with original to keep bot responsive
      }
    }

    // Prepare messages for AI
    const messages = [
      { role: "system", content: systemPrompt },
      ...(chatHistory || []).slice(-5), // Keep only last 5 messages to save tokens
      { role: "user", content: finalUserQuery }
    ];

    // API call to OpenRouter with reduced tokens
    const response = await axios.post(
      BASE_URL,
      {
        model: "gpt-3.5-turbo",
        messages,
        temperature: targetLang === 'en' ? 0.6 : 0.4,
        max_tokens: 180,
        top_p: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "MediSync AI - Medical Assistant"
        }
      }
    );

    let answer = response.data.choices[0].message.content || '';
    
    // Clean up the response
    let cleanAnswer = answer
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Guard against undefined-like noise
    if (!cleanAnswer || cleanAnswer === 'undefined' || /undefined/i.test(cleanAnswer)) {
      cleanAnswer = 'I am currently unable to answer. Please rephrase your medical question.';
    }

    // If target language is non-English, translate back to that language
    if (targetLang !== 'en') {
      try {
        const base = process.env.BACKEND_INTERNAL_URL || `http://127.0.0.1:${process.env.PORT || 4000}`;
        const t2 = await axios.post(`${base}/api/translate`, {
          q: cleanAnswer,
          source: 'en',
          target: targetLang
        }, { timeout: 7000 });
        if (t2.data?.translatedText) {
          cleanAnswer = t2.data.translatedText;
        }
      } catch (e) {
        // If translation back fails, fall back to English cleanAnswer
      }
    }

    res.json({ response: cleanAnswer });
    
  } catch (error) {
    console.error("Chatbot error:", error.response?.data || error.message);
    
    // Check if it's a credit/token issue
    if (error.response?.data?.error?.code === 402 || 
        error.response?.data?.error?.message?.includes('credits') ||
        error.response?.data?.error?.message?.includes('tokens')) {
      
      // Use offline medical knowledge base when out of credits
      const offlineResponse = getOfflineResponse(userQuery, language);
      return res.json({ response: offlineResponse });
    }
    
    const errorMessages = {
      en: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
      hi: "मुझे खेद है, लेकिन मुझे तकनीकी कठिनाइयों का सामना कर रहा हूं। कृपया एक क्षण में पुनः प्रयास करें।",
      mr: "मला माफ करा, पण मला तांत्रिक अडचणी येत आहेत. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.",
      es: "Me disculpo, pero estoy experimentando dificultades técnicas. Inténtalo de nuevo en un momento.",
      fr: "Je m'excuse, mais je rencontre des difficultés techniques. Veuillez réessayer dans un moment."
    };
    
    res.status(500).json({ 
      response: errorMessages[language] || errorMessages.en 
    });
  }
};
