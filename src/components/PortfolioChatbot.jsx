// import { useEffect, useState } from "react";

// export default function PortfolioChatbot() {
//   const [isOpen, setIsOpen] = useState(() => {
//     return sessionStorage.getItem("chatOpen") === "true";
//   });

//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   const [messages, setMessages] = useState(() => {
//     const saved = sessionStorage.getItem("chatMessages");
//     if (saved) return JSON.parse(saved);

//     return [
//       {
//         sender: "bot",
//         text: "Hi, I am Sparsh's AI portfolio assistant. Ask me anything about him.",
//       },
//     ];
//   });

//   useEffect(() => {
//     const chatBox = document.getElementById("chat-messages-box");
//     if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
//   }, [messages, isTyping]);

//   useEffect(() => {
//     sessionStorage.setItem("chatMessages", JSON.stringify(messages));
//   }, [messages]);

//   useEffect(() => {
//     sessionStorage.setItem("chatOpen", isOpen ? "true" : "false");
//   }, [isOpen]);

//   const sendMessage = async () => {
//     if (!input.trim() || isTyping) return;

//     const userText = input.trim();

//     setMessages((prev) => [...prev, { sender: "user", text: userText }]);
//     setInput("");
//     setIsTyping(true);

//     setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

//     try {
//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: userText }),
//       });

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder("utf-8");

//       let botReply = "";

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value);
//         botReply += chunk;

//         setMessages((prev) => {
//           const updated = [...prev];
//           updated[updated.length - 1] = {
//             sender: "bot",
//             text: botReply,
//           };
//           return updated;
//         });
//       }
//     } catch {
//       setMessages((prev) => {
//         const updated = [...prev];
//         updated[updated.length - 1] = {
//           sender: "bot",
//           text: "Sorry, I am unable to reply right now.",
//         };
//         return updated;
//       });
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const clearChat = async () => {
//     try {
//       await fetch("http://localhost:5000/api/clear-chat", {
//         method: "POST",
//       });
//     } catch {}

//     const reset = [
//       {
//         sender: "bot",
//         text: "Chat cleared. Ask me anything.",
//       },
//     ];

//     setMessages(reset);
//     sessionStorage.setItem("chatMessages", JSON.stringify(reset));
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {isOpen && (
//         <div className="w-[350px] h-[520px] bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
//           {/* Header */}
//           <div className="px-5 py-4 bg-white/10 border-b border-white/10 flex justify-between">
//             <div>
//               <h3 className="text-white text-sm font-semibold">
//                 Sparsh AI Assistant
//               </h3>
//               <p className="text-green-400 text-xs">Online</p>
//             </div>

//             <div className="flex gap-3">
//               <button type="button" onClick={clearChat}>
//                 Clear
//               </button>
//               <button type="button" onClick={() => setIsOpen(false)}>
//                 ×
//               </button>
//             </div>
//           </div>

//           {/* Messages */}
//           <div
//             id="chat-messages-box"
//             className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
//           >
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`flex ${
//                   msg.sender === "user"
//                     ? "justify-end"
//                     : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`px-4 py-3 rounded-2xl text-sm ${
//                     msg.sender === "user"
//                       ? "bg-white text-black"
//                       : "bg-white/10 text-white"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}

//             {isTyping && (
//               <div className="text-white text-sm">Typing...</div>
//             )}
//           </div>

//           {/* Input (MAIN FIX HERE) */}
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();   // ❗ stops reload
//               e.stopPropagation();  // ❗ stops bubbling
//               sendMessage();
//             }}
//             className="p-4 border-t border-white/10 flex gap-2"
//           >
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask something..."
//               className="flex-1 bg-white/10 text-white px-4 py-3 rounded-2xl outline-none"
//             />

//             <button
//               type="submit"
//               disabled={isTyping}
//               className="bg-white text-black px-4 py-3 rounded-2xl"
//             >
//               Send
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Toggle */}
//       <button
//         type="button"
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="w-16 h-16 bg-white text-black rounded-full shadow-xl"
//       >
//         AI
//       </button>
//     </div>
//   );
// }


import { useEffect, useState } from "react";

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(() => {
    return sessionStorage.getItem("chatOpen") === "true";
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("chatMessages");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [
          {
            sender: "bot",
            text: "Hi, I am Sparsh's AI portfolio assistant. Ask me anything about him.",
          },
        ];
      }
    }

    return [
      {
        sender: "bot",
        text: "Hi, I am Sparsh's AI portfolio assistant. Ask me anything about him.",
      },
    ];
  });

  useEffect(() => {
    const chatBox = document.getElementById("chat-messages-box");

    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    sessionStorage.setItem("chatOpen", isOpen ? "true" : "false");
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat response failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let botReply = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botReply += chunk;

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            sender: "bot",
            text: botReply,
          };

          return updated;
        });
      }

      if (!botReply.trim()) {
        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            sender: "bot",
            text: "Sorry, I did not receive a proper response.",
          };

          return updated;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          sender: "bot",
          text: "Sorry, I am unable to reply right now.",
        };

        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = async () => {
    try {
      await fetch("/api/clear-chat", {
        method: "POST",
      });
    } catch (error) {
      console.error("Clear chat error:", error);
    }

    const reset = [
      {
        sender: "bot",
        text: "Chat cleared. Ask me anything.",
      },
    ];

    setMessages(reset);
    sessionStorage.setItem("chatMessages", JSON.stringify(reset));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-[350px] h-[520px] bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 bg-white/10 border-b border-white/10 flex justify-between items-center">
            <div>
              <h3 className="text-white text-sm font-semibold">
                Sparsh AI Assistant
              </h3>
              <p className="text-green-400 text-xs">Online</p>
            </div>

            <div className="flex gap-3 items-center">
              <button
                type="button"
                onClick={clearChat}
                className="text-white/70 hover:text-white text-xs"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            id="chat-messages-box"
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          >
            {messages.map((msg, i) => (
              <div
                key={`${msg.sender}-${i}`}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] whitespace-pre-wrap break-words ${
                    msg.sender === "user"
                      ? "bg-white text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="text-white/70 text-sm">Typing...</div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              sendMessage();
            }}
            className="p-4 border-t border-white/10 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              disabled={isTyping}
              className="flex-1 bg-white/10 text-white px-4 py-3 rounded-2xl outline-none placeholder:text-white/40 disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-white text-black px-4 py-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-16 h-16 bg-white text-black rounded-full shadow-xl font-semibold hover:scale-105 transition-transform"
      >
        AI
      </button>
    </div>
  );
}
