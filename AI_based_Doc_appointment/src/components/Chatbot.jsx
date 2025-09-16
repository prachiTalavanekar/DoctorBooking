// import React, { useState } from "react";
// import axios from "axios";

// export default function Chatbot() {
//   const [input, setInput] = useState("");
//   const [chat, setChat] = useState([]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newChat = [...chat, { role: "user", content: input }];
//     setChat(newChat);

//     try {
//       const res = await axios.post("http://localhost:4000/api/chatbot/chat", {
//         userQuery: input,
//         chatHistory: chat
//       });
//       setChat([...newChat, { role: "assistant", content: res.data.response }]);
//     } catch (err) {
//       setChat([
//         ...newChat,
//         { role: "assistant", content: "⚠️ Error connecting to chatbot." }
//       ]);
//     }

//     setInput("");
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto border rounded-lg shadow-lg">
//       <div className="h-80 overflow-y-auto border-b mb-2 p-2">
//         {chat.map((msg, i) => (
//           <div
//             key={i}
//             className={`my-2 ${
//               msg.role === "user" ? "text-blue-600 text-right" : "text-green-600"
//             }`}
//           >
//             <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2">
//         <input
//           className="flex-1 border rounded px-2 py-1"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your symptoms..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-green-500 text-white px-4 py-1 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }






import React, { useState } from "react";
import axios from "axios";
import { FaMicrophone } from "react-icons/fa"; // ✅ voice icon

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    {
      role: "assistant",
      content:
        "Hello, I’m MediSync AI, your **medical advisor**. I provide info but not diagnosis. How may I assist you today?"
    }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newChat = [...chat, { role: "user", content: input }];
    setChat(newChat);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/chatbot/chat", {
        userQuery: input,
        chatHistory: chat
      });

      setChat([...newChat, { role: "assistant", content: res.data.response }]);
    } catch (err) {
      setChat([
        ...newChat,
        { role: "assistant", content: "⚠️ Error connecting to chatbot." }
      ]);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto rounded-lg shadow-xl overflow-hidden border">
      {/* Header */}
      <div className="bg-teal-700 text-white flex items-center p-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
          alt="doctor"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h1 className="font-bold text-lg">
            MediSync AI{" "}
            <span className="bg-white text-teal-700 px-1 rounded text-xs">
              AI
            </span>
          </h1>
          <p className="text-sm">Medical Advisor</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="h-[450px] overflow-y-auto p-4 bg-gray-50">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`my-2 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[70%] ${
                msg.role === "user"
                  ? "bg-teal-500 text-white self-end"
                  : "bg-green-100 text-gray-800 border border-green-300"
              }`}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                }}
              />
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex justify-start my-2">
            <div className="px-3 py-2 rounded-lg bg-green-200 text-gray-700 border border-green-300">
              <span className="animate-pulse">MediSync AI is typing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex items-center p-2 border-t bg-white">
        <input
          className="flex-1 px-3 py-2 rounded-full border focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here"
        />

        {/* Send Button */}
        <button
          onClick={sendMessage}
          className="ml-2 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full"
        >
          ▶
        </button>

        {/* Voice Button */}
        <button
          className="ml-2 bg-gray-200 hover:bg-gray-300 text-teal-700 p-3 rounded-full"
        >
          <FaMicrophone size={18} />
        </button>
      </div>
    </div>
  );
}
