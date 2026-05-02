// import { useEffect, useRef, useState } from "react";
// import "./TalkWithMyBuddy.css";

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function TalkWithMyBuddy() {
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [voiceEnabled, setVoiceEnabled] = useState(true);

//   const messagesBoxRef = useRef(null);
//   const audioRef = useRef(null);

//   const [messages, setMessages] = useState(() => {
//     const saved = sessionStorage.getItem("buddyChatMessages");

//     if (saved) {
//       try {
//         return JSON.parse(saved);
//       } catch {
//         return [
//           {
//             sender: "bot",
//             text: "Hi, I am Sparsh's AI buddy. Ask me anything about his skills, projects, experience, or portfolio.",
//           },
//         ];
//       }
//     }

//     return [
//       {
//         sender: "bot",
//         text: "Hi, I am Sparsh's AI buddy. Ask me anything about his skills, projects, experience, or portfolio.",
//       },
//     ];
//   });

//   useEffect(() => {
//     sessionStorage.setItem("buddyChatMessages", JSON.stringify(messages));
//   }, [messages]);

//   useEffect(() => {
//     if (messagesBoxRef.current) {
//       messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
//     }
//   }, [messages, isTyping]);

//   const stopVoice = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.src = "";
//       audioRef.current.load();
//       audioRef.current = null;
//     }
//   };

//   const playBotVoice = async (text) => {
//     if (!voiceEnabled || !text.trim()) return;

//     try {
//       stopVoice();

//       const ttsResponse = await fetch(`${API_BASE_URL}/api/text-to-speech`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text }),
//       });

//       if (!ttsResponse.ok) {
//         throw new Error("TTS generation failed");
//       }

//       const audio = new Audio(
//         `${API_BASE_URL}/api/speech?t=${Date.now()}`
//       );

//       audioRef.current = audio;

//       audio.volume = 1;
//       audio.muted = false;
//       audio.playbackRate = 1;
//       audio.preload = "auto";

//       await audio.play();

//       console.log("Voice playing successfully");
//     } catch (error) {
//       console.error("Voice Error:", error);
//     }
//   };

//   const sendMessage = async () => {
//     const userText = input.trim();

//     if (!userText || isTyping) return;

//     stopVoice();

//     setMessages((prev) => [...prev, { sender: "user", text: userText }]);
//     setInput("");
//     setIsTyping(true);

//     setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

//     let botReply = "";

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/chat`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: userText }),
//       });

//       if (!response.ok || !response.body) {
//         throw new Error("Chat API failed");
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder("utf-8");

//       while (true) {
//         const { done, value } = await reader.read();

//         if (done) break;

//         const chunk = decoder.decode(value, { stream: true });
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

//       await playBotVoice(botReply);
//     } catch (error) {
//       console.error("Chat Error:", error);

//       botReply = "Sorry, I am unable to reply right now.";

//       setMessages((prev) => {
//         const updated = [...prev];

//         updated[updated.length - 1] = {
//           sender: "bot",
//           text: botReply,
//         };

//         return updated;
//       });

//       await playBotVoice(botReply);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const clearChat = async () => {
//     try {
//       await fetch(`${API_BASE_URL}/api/clear-chat`, {
//         method: "POST",
//       });
//     } catch {}

//     stopVoice();

//     const reset = [
//       {
//         sender: "bot",
//         text: "Chat cleared. Ask me anything about Sparsh.",
//       },
//     ];

//     setMessages(reset);
//     sessionStorage.setItem("buddyChatMessages", JSON.stringify(reset));
//   };

//   return (
//     <section className="buddy-section" id="talk-with-my-buddy">
//       <div className="buddy-container">
//         <div className="buddy-left">
//           <div className="buddy-tag">AI Portfolio Assistant</div>

//           <h2 className="buddy-title">
//             Talk with <br />
//             <span>my buddy</span>
//           </h2>

//           <p className="buddy-desc">
//             Ask about my projects, skills, experience, achievements, tech stack,
//             or portfolio details. Type your question and my AI buddy will reply
//             in text and natural female voice.
//           </p>

//         </div>

//         <div className="buddy-chat-card">
//           <div className="buddy-chat-header">
//             <div className="buddy-profile">
//               <div className="buddy-avatar">AI</div>

//               <div>
//                 <h3 className="buddy-name">Sparsh AI Buddy</h3>
//                 <p className="buddy-online">Online</p>
//               </div>
//             </div>

//             <div className="buddy-actions">
//               <button
//                 type="button"
//                 className={`buddy-icon-btn ${voiceEnabled ? "active" : ""}`}
//                 onClick={() => {
//                   setVoiceEnabled((prev) => !prev);
//                   stopVoice();
//                 }}
//                 title="Voice reply on/off"
//               >
//                 🔊
//               </button>

//               <button
//                 type="button"
//                 className="buddy-icon-btn"
//                 onClick={clearChat}
//                 title="Clear chat"
//               >
//                 Clear
//               </button>
//             </div>
//           </div>

//           <div className="buddy-messages" ref={messagesBoxRef}>
//             {messages.map((msg, index) => (
//               <div key={index} className={`buddy-row ${msg.sender}`}>
//                 <div className="buddy-bubble">{msg.text}</div>
//               </div>
//             ))}

//             {isTyping && (
//               <div className="buddy-row bot">
//                 <div className="buddy-typing">
//                   <span className="buddy-dot"></span>
//                   <span className="buddy-dot"></span>
//                   <span className="buddy-dot"></span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <form
//             className="buddy-input-area"
//             onSubmit={(e) => {
//               e.preventDefault();
//               sendMessage();
//             }}
//           >
//             <input
//               className="buddy-input"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask anything about Sparsh..."
//             />

//             <button
//               type="submit"
//               className="buddy-send-btn"
//               disabled={isTyping}
//             >
//               Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useEffect, useRef, useState } from "react";
import "./TalkWithMyBuddy.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function TalkWithMyBuddy() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const messagesBoxRef = useRef(null);
  const audioRef = useRef(null);

  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("buddyChatMessages");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [
          {
            sender: "bot",
            text: "Hi, I am Sparsh's AI buddy. Ask me anything about his skills, projects, experience, or portfolio.",
          },
        ];
      }
    }

    return [
      {
        sender: "bot",
        text: "Hi, I am Sparsh's AI buddy. Ask me anything about his skills, projects, experience, or portfolio.",
      },
    ];
  });

  useEffect(() => {
    sessionStorage.setItem("buddyChatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const stopVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current = null;
    }
  };

  const renderMessageContent = (text) => {
    if (!text) return null;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const boldRegex = /\*\*(.*?)\*\*/g;

    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        const cleanUrl = part.replace(/[.,)]$/, "");
        const trailingChar = part.slice(cleanUrl.length);

        return (
          <span key={index}>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="buddy-message-link"
            >
              {cleanUrl}
            </a>
            {trailingChar}
          </span>
        );
      }

      const boldParts = part.split(boldRegex);

      return boldParts.map((boldPart, boldIndex) => {
        const isBold = boldIndex % 2 !== 0;

        return isBold ? (
          <strong key={`${index}-${boldIndex}`}>{boldPart}</strong>
        ) : (
          <span key={`${index}-${boldIndex}`}>{boldPart}</span>
        );
      });
    });
  };

  const playBotVoice = async (text) => {
    if (!voiceEnabled || !text.trim()) return;

    try {
      stopVoice();

      const ttsResponse = await fetch(`${API_BASE_URL}/api/text-to-speech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!ttsResponse.ok) {
        throw new Error("TTS generation failed");
      }

      const audio = new Audio(
        `${API_BASE_URL}/api/speech?t=${Date.now()}`
      );

      audioRef.current = audio;

      audio.volume = 1;
      audio.muted = false;
      audio.playbackRate = 1;
      audio.preload = "auto";

      await audio.play();

      console.log("Voice playing successfully");
    } catch (error) {
      console.error("Voice Error:", error);
    }
  };

  const sendMessage = async () => {
    const userText = input.trim();

    if (!userText || isTyping) return;

    stopVoice();

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

    let botReply = "";

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat API failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

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

      await playBotVoice(botReply);
    } catch (error) {
      console.error("Chat Error:", error);

      botReply = "Sorry, I am unable to reply right now.";

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          sender: "bot",
          text: botReply,
        };

        return updated;
      });

      await playBotVoice(botReply);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/clear-chat`, {
        method: "POST",
      });
    } catch {}

    stopVoice();

    const reset = [
      {
        sender: "bot",
        text: "Chat cleared. Ask me anything about Sparsh.",
      },
    ];

    setMessages(reset);
    sessionStorage.setItem("buddyChatMessages", JSON.stringify(reset));
  };

  return (
    <section className="buddy-section" id="talk-with-my-buddy">
      <div className="buddy-container">
        <div className="buddy-left">
          <div className="buddy-tag">AI Portfolio Assistant</div>

          <h2 className="buddy-title">
            Talk with <br />
            <span>my buddy</span>
          </h2>

          <p className="buddy-desc">
            Ask about my projects, skills, experience, achievements, tech stack,
            or portfolio details. Type your question and my AI buddy will reply
            in text and natural female voice.
          </p>

        </div>

        <div className="buddy-chat-card">
          <div className="buddy-chat-header">
            <div className="buddy-profile">
              <div className="buddy-avatar">AI</div>

              <div>
                <h3 className="buddy-name">Sparsh AI Buddy</h3>
                <p className="buddy-online">Online</p>
              </div>
            </div>

            <div className="buddy-actions">
              <button
                type="button"
                className={`buddy-icon-btn ${voiceEnabled ? "active" : ""}`}
                onClick={() => {
                  setVoiceEnabled((prev) => !prev);
                  stopVoice();
                }}
                title="Voice reply on/off"
              >
                🔊
              </button>

              <button
                type="button"
                className="buddy-icon-btn"
                onClick={clearChat}
                title="Clear chat"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="buddy-messages" ref={messagesBoxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`buddy-row ${msg.sender}`}>
                <div className="buddy-bubble">
                  {renderMessageContent(msg.text)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="buddy-row bot">
                <div className="buddy-typing">
                  <span className="buddy-dot"></span>
                  <span className="buddy-dot"></span>
                  <span className="buddy-dot"></span>
                </div>
              </div>
            )}
          </div>

          <form
            className="buddy-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              className="buddy-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Sparsh..."
            />

            <button
              type="submit"
              className="buddy-send-btn"
              disabled={isTyping}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}