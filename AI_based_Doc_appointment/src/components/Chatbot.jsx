import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaMicrophone, FaStop, FaVolumeUp, FaLanguage } from "react-icons/fa";
import { quickTranslate, getWelcomeMessage } from "../utils/offlineTranslation.js";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("en");
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // Language configurations
  const languages = {
    en: { 
      name: "English", 
      flag: "🇬🇧", 
      speechLang: "en-US",
      welcomeMsg: "Hello! I'm MediSync AI, your medical advisor. I provide information but not diagnosis. How may I assist you today?"
    },
    hi: { 
      name: "हिंदी", 
      flag: "🇮🇳", 
      speechLang: "hi-IN",
      welcomeMsg: "नमस्ते! मैं MediSync AI हूं, आपका चिकित्सा सलाहकार। मैं जानकारी प्रदान करता हूं लेकिन निदान नहीं। आज मैं आपकी कैसे सहायता कर सकता हूं?"
    },
    mr: { 
      name: "मराठी", 
      flag: "🇮🇳", 
      speechLang: "mr-IN",
      welcomeMsg: "नमस्कार! मी MediSync AI आहे, तुमचा वैद्यकीय सल्लागार. मी माहिती देतो पण निदान करत नाही. आज मी तुम्हाला कशी मदत करू शकतो?"
    },
    es: { 
      name: "Español", 
      flag: "🇪🇸", 
      speechLang: "es-ES",
      welcomeMsg: "¡Hola! Soy MediSync AI, tu asesor médico. Proporciono información pero no diagnóstico. ¿Cómo puedo ayudarte hoy?"
    },
    fr: { 
      name: "Français", 
      flag: "🇫🇷", 
      speechLang: "fr-FR",
      welcomeMsg: "Bonjour! Je suis MediSync AI, votre conseiller médical. Je fournis des informations mais pas de diagnostic. Comment puis-je vous aider aujourd'hui?"
    }
  };

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMessage = {
      role: "assistant",
      content: getWelcomeMessage(language)
    };
    setChat([welcomeMessage]);
  }, [language]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Translation functions with timeout and offline fallback
  const translateToEnglish = async (text, sourceLang) => {
    if (sourceLang === "en") return text;
    
    try {
      const res = await axios.post("http://localhost:4000/api/translate", {
        q: text,
        source: sourceLang,
        target: "en"
      }, {
        timeout: 8000 // 8 second timeout
      });
      return res.data.translatedText;
    } catch (error) {
      console.warn("Translation to English failed, using original text:", error.message);
      return text; // Return original text if translation fails
    }
  };

  const translateFromEnglish = async (text, targetLang) => {
    if (targetLang === "en") return text;
    
    try {
      const res = await axios.post("http://localhost:4000/api/translate", {
        q: text,
        source: "en",
        target: targetLang
      }, {
        timeout: 8000 // 8 second timeout
      });
      return res.data.translatedText;
    } catch (error) {
      console.warn("Translation from English failed, using original text:", error.message);
      return text; // Return original text if translation fails
    }
  };

  // Voice recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = languages[language].speechLang;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  // Text to speech
  const speak = (text, langCode) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    // Stop any ongoing speech
    synth.cancel();
    
    setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ''));
    utterance.lang = languages[langCode].speechLang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newChat = [...chat, userMessage];
    setChat(newChat);
    setLoading(true);

    try {
      // Translate user input to English for processing
      const translatedInput = await translateToEnglish(input, language);

      // Send to chatbot API
      const res = await axios.post("http://localhost:4000/api/chatbot/chat", {
        userQuery: translatedInput,
        chatHistory: newChat.slice(0, -1), // Exclude current message
        language: language
      });

      let botReply = res.data.response;
      
      // If response is in English and user language is different, translate it
      if (language !== "en") {
        try {
          const translatedReply = await translateFromEnglish(botReply, language);
          // If online translation failed, try offline translation
          if (translatedReply === botReply) {
            const offlineTranslation = quickTranslate(botReply, "en", language);
            botReply = offlineTranslation;
          } else {
            botReply = translatedReply;
          }
        } catch (translationError) {
          console.warn("Translation failed, trying offline translation:", translationError);
          // Try offline translation as fallback
          botReply = quickTranslate(botReply, "en", language);
        }
      }

      const assistantMessage = { role: "assistant", content: botReply };
      const updatedChat = [...newChat, assistantMessage];
      
      setChat(updatedChat);
      
      // Speak the response
      speak(botReply, language);
      
    } catch (err) {
      console.error("Chatbot error:", err);
      
      // More specific error messages
      let errorMsg;
      if (err.response?.status === 402 || err.response?.data?.error?.includes('credits')) {
        errorMsg = language === "en" 
          ? "🔋 I'm currently running on limited resources, but I can still help with basic medical questions. Please try asking about specific symptoms."
          : language === "hi"
          ? "🔋 मैं वर्तमान में सीमित संसाधनों पर चल रहा हूं, लेकिन फिर भी बुनियादी चिकित्सा प्रश्नों में मदद कर सकता हूं।"
          : "🔋 मी सध्या मर्यादित संसाधनांवर चालत आहे, परंतु तरीही मूलभूत वैद्यकीय प्रश्नांमध्ये मदत करू शकतो।";
      } else {
        errorMsg = language === "en" 
          ? "⚠️ I'm experiencing technical difficulties. Please try again in a moment."
          : language === "hi"
          ? "⚠️ मुझे तकनीकी कठिनाइयों का सामना कर रहा हूं। कृपया एक क्षण में पुनः प्रयास करें।"
          : "⚠️ मला तांत्रिक अडचणी येत आहेत. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.";
      }
      
      setChat([...newChat, { role: "assistant", content: errorMsg }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear chat
  const clearChat = () => {
    const welcomeMessage = {
      role: "assistant",
      content: languages[language].welcomeMsg
    };
    setChat([welcomeMessage]);
  };

  // Quick suggestions based on language
  const quickSuggestions = {
    en: ["I have a headache", "I'm feeling dizzy", "I have a fever", "My stomach hurts"],
    hi: ["मुझे सिरदर्द है", "मुझे चक्कर आ रहे हैं", "मुझे बुखार है", "मेरे पेट में दर्द है"],
    mr: ["मला डोकेदुखी आहे", "मला चक्कर येत आहे", "मला ताप आहे", "माझ्या पोटात दुखत आहे"],
    es: ["Tengo dolor de cabeza", "Me siento mareado", "Tengo fiebre", "Me duele el estómago"],
    fr: ["J'ai mal à la tête", "Je me sens étourdi", "J'ai de la fièvre", "J'ai mal au ventre"]
  };

  return (
    <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl">🏥</span>
          </div>
          <div>
            <h1 className="font-bold text-xl">
              MediSync AI
              <span className="bg-white text-teal-700 px-2 py-1 rounded-full text-xs ml-2">
                AI
              </span>
            </h1>
            <p className="text-teal-100 text-sm">Multilingual Medical Assistant</p>
          </div>
        </div>

        {/* Language Selector and Clear Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={clearChat}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-sm transition-colors"
            title="Clear Chat"
          >
            Clear
          </button>
          <FaLanguage className="text-white" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white text-teal-700 border-0 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            {Object.entries(languages).map(([code, lang]) => (
              <option key={code} value={code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-[500px] overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                msg.role === "user"
                  ? "bg-teal-500 text-white rounded-br-sm"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
              }`}
            >
              <div
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                }}
              />
              {msg.role === "assistant" && (
                <button
                  onClick={() => speak(msg.content, language)}
                  className="mt-2 text-teal-600 hover:text-teal-800 transition-colors"
                  title="Read aloud"
                >
                  <FaVolumeUp size={14} />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 text-gray-600 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <span className="ml-2 text-sm">MediSync AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Quick Suggestions */}
      {chat.length === 1 && (
        <div className="px-6 pb-4 bg-white border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions[language]?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInput(suggestion)}
                className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm hover:bg-teal-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Type your symptoms in ${languages[language].name}...`}
              rows="2"
            />
          </div>

          {/* Voice Button */}
          <button
            onClick={listening ? stopListening : startListening}
            className={`p-3 rounded-xl transition-all duration-200 ${
              listening 
                ? "bg-red-500 text-white animate-pulse" 
                : "bg-gray-100 text-teal-600 hover:bg-gray-200"
            }`}
            title={listening ? "Stop Listening" : "Start Voice Input"}
          >
            {listening ? <FaStop size={18} /> : <FaMicrophone size={18} />}
          </button>

          {/* Speak Button */}
          <button
            onClick={speaking ? stopSpeaking : () => {}}
            className={`p-3 rounded-xl transition-all duration-200 ${
              speaking 
                ? "bg-blue-500 text-white animate-pulse" 
                : "bg-gray-100 text-blue-600 hover:bg-gray-200"
            }`}
            title={speaking ? "Stop Speaking" : "Text-to-Speech"}
          >
            <FaVolumeUp size={18} />
          </button>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white p-3 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
            title="Send Message"
          >
            <span className="text-lg">→</span>
          </button>
        </div>
        
        {listening && (
          <div className="mt-2 text-center">
            <span className="text-sm text-red-600 animate-pulse">
              🎤 Listening in {languages[language].name}...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}