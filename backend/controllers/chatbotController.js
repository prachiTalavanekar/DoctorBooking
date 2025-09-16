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

export const getChatbotResponse = async (req, res) => {
  try {
    const { userQuery, chatHistory } = req.body;

    // 🚨 Emergency detection
    const lowerQuery = userQuery.toLowerCase();
    if (EMERGENCY_KEYWORDS.some(word => lowerQuery.includes(word))) {
      return res.json({
        response:
          "🚨 This could be a medical emergency. Please call your local emergency number or go to the hospital immediately."
      });
    }

    // Prepare messages
    const messages = [
      {
        role: "system",
        content:
          "You are an expert medical assistant. Only answer medical-related questions. " +
          "When the user provides symptoms, first ask the most relevant follow-up question. " +
          "After clarifying, suggest possible conditions in a friendly, human-readable way. " +
          "Always recommend consulting a doctor if symptoms are serious. " +
          "Do NOT use bullet points, answer like a real doctor speaking. " +
          "If the question is not medical, reply: 'I am a medical assistant and can only answer medical-related questions.'"
      },
      ...(chatHistory || []),
      { role: "user", content: userQuery }
    ];

    // ✅ API call with required headers
    const response = await axios.post(
      BASE_URL,
      {
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 300
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173", // your frontend URL
          "X-Title": "MediSync AI"
        }
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ response: answer });
  } catch (error) {
    console.error("Chatbot error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
    console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);
  }
};
