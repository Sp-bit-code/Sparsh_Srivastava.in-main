// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import fs from "fs";
// import path from "path";
// import { spawn } from "child_process";
// import { fileURLToPath } from "url";
// import Groq from "groq-sdk";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const groq = new Groq({
//   apiKey: process.env.GroqAPIKey,
// });

// // Fix for ES module __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Paths
// const DATA_DIR = path.join(__dirname, "Data");
// const DETAILS_PATH = path.join(DATA_DIR, "details.txt");
// const CHATLOG_PATH = path.join(DATA_DIR, "ChatLog.json");
// const SPEECH_PATH = path.join(DATA_DIR, "speech.mp3");
// const TTS_SCRIPT_PATH = path.join(__dirname, "TextToSpeech.py");

// // Ensure folders/files exist
// if (!fs.existsSync(DATA_DIR)) {
//   fs.mkdirSync(DATA_DIR);
// }

// if (!fs.existsSync(CHATLOG_PATH)) {
//   fs.writeFileSync(CHATLOG_PATH, JSON.stringify([], null, 2));
// }

// if (!fs.existsSync(DETAILS_PATH)) {
//   fs.writeFileSync(DETAILS_PATH, "No portfolio details found.");
// }

// // Helpers
// function readDetails() {
//   try {
//     return fs.readFileSync(DETAILS_PATH, "utf-8");
//   } catch {
//     return "No portfolio details found.";
//   }
// }

// function readChatLog() {
//   try {
//     return JSON.parse(fs.readFileSync(CHATLOG_PATH, "utf-8"));
//   } catch {
//     return [];
//   }
// }

// function saveChatLog(messages) {
//   fs.writeFileSync(CHATLOG_PATH, JSON.stringify(messages, null, 2));
// }

// function cleanTextForVoice(text) {
//   return String(text || "")
//     .replace(/[*#`_~]/g, "")
//     .replace(/\[(.*?)\]\(.*?\)/g, "$1")
//     .replace(/\s+/g, " ")
//     .trim();
// }

// // ✅ FIXED FUNCTION (IMPORTANT)
// function generateSpeech(text) {
//   return new Promise((resolve, reject) => {
//     const cleanedText = cleanTextForVoice(text);

//     if (!cleanedText) {
//       return reject(new Error("Text is empty."));
//     }

//     const pythonCommand = process.env.PYTHON_COMMAND || "python";

//     const child = spawn(pythonCommand, [TTS_SCRIPT_PATH, cleanedText], {
//       cwd: __dirname,
//       shell: false, // 🔥 FIX for space in path
//       windowsHide: true,
//     });

//     let errorOutput = "";

//     child.stderr.on("data", (data) => {
//       errorOutput += data.toString();
//     });

//     child.on("close", (code) => {
//       if (code === 0 && fs.existsSync(SPEECH_PATH)) {
//         resolve(true);
//       } else {
//         reject(
//           new Error(errorOutput || `TextToSpeech.py exited with code ${code}`)
//         );
//       }
//     });
//   });
// }

// // Routes
// app.get("/", (req, res) => {
//   res.send("AI chatbot server running");
// });

// // Serve voice
// app.get("/api/speech", (req, res) => {
//   if (!fs.existsSync(SPEECH_PATH)) {
//     return res.status(404).send("Speech file not found.");
//   }

//   res.setHeader("Content-Type", "audio/mpeg");
//   res.setHeader("Cache-Control", "no-store");

//   res.sendFile(SPEECH_PATH);
// });

// // Generate speech
// app.post("/api/text-to-speech", async (req, res) => {
//   try {
//     const { text } = req.body;

//     if (!text || !text.trim()) {
//       return res.status(400).json({ error: "Text is required." });
//     }

//     await generateSpeech(text);

//     res.json({
//       success: true,
//       audioUrl: "/api/speech",
//     });
//   } catch (error) {
//     console.error("TTS Error:", error);

//     res.status(500).json({
//       success: false,
//       error: "Voice generation failed",
//     });
//   }
// });

// // Chat
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message || !message.trim()) {
//       return res.status(400).send("Message is required.");
//     }

//     const details = readDetails();
//     const oldMessages = readChatLog();

//     const systemPrompt = `
// You are a portfolio AI chatbot.

// Rules:
// - Answer only using the portfolio details given below.
// - If information is not available, say: "I do not have that information in my portfolio details."
// - Reply in simple English.
// - Keep answers short and clear.
// - Do not answer unrelated questions.

// Portfolio Details:
// ${details}
// `;

//     const messages = [
//       { role: "system", content: systemPrompt },
//       ...oldMessages.slice(-20),
//       { role: "user", content: message },
//     ];

//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages,
//       temperature: 0.7,
//       max_completion_tokens: 1024,
//       top_p: 1,
//       stream: true,
//     });

//     res.setHeader("Content-Type", "text/plain; charset=utf-8");
//     res.setHeader("Cache-Control", "no-cache");

//     let fullAnswer = "";

//     for await (const chunk of completion) {
//       const text = chunk.choices[0]?.delta?.content || "";
//       fullAnswer += text;
//       res.write(text);
//     }

//     const updatedMessages = [
//       ...oldMessages,
//       { role: "user", content: message },
//       { role: "assistant", content: fullAnswer },
//     ];

//     saveChatLog(updatedMessages.slice(-50));

//     res.end();
//   } catch (error) {
//     console.error("Chatbot Error:", error);
//     res.status(500).send("Sorry, chatbot is not working right now.");
//   }
// });

// // Clear chat
// app.post("/api/clear-chat", (req, res) => {
//   saveChatLog([]);
//   res.json({ success: true });
// });

// // Start server
// app.listen(5000, () => {
//   console.log("AI chatbot server running on http://localhost:5000");
// });




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ES module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Groq setup
const groq = new Groq({
  apiKey: process.env.GroqAPIKey,
});

// Paths
const DATA_DIR = path.join(__dirname, "Data");
const DETAILS_PATH = path.join(DATA_DIR, "details.txt");
const CHATLOG_PATH = path.join(DATA_DIR, "ChatLog.json");
const SPEECH_PATH = path.join(DATA_DIR, "speech.mp3");
const TTS_SCRIPT_PATH = path.join(__dirname, "TextToSpeech.py");
const DIST_DIR = path.join(__dirname, "dist");

// Ensure folders/files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(CHATLOG_PATH)) {
  fs.writeFileSync(CHATLOG_PATH, JSON.stringify([], null, 2));
}

if (!fs.existsSync(DETAILS_PATH)) {
  fs.writeFileSync(DETAILS_PATH, "No portfolio details found.");
}

// Helpers
function readDetails() {
  try {
    return fs.readFileSync(DETAILS_PATH, "utf-8");
  } catch {
    return "No portfolio details found.";
  }
}

function readChatLog() {
  try {
    return JSON.parse(fs.readFileSync(CHATLOG_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function saveChatLog(messages) {
  fs.writeFileSync(CHATLOG_PATH, JSON.stringify(messages, null, 2));
}

function cleanTextForVoice(text) {
  return String(text || "")
    .replace(/[*#`_~]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function generateSpeech(text) {
  return new Promise((resolve, reject) => {
    const cleanedText = cleanTextForVoice(text);

    if (!cleanedText) {
      return reject(new Error("Text is empty."));
    }

    const pythonCommand = process.env.PYTHON_COMMAND || "python3";

    const child = spawn(pythonCommand, [TTS_SCRIPT_PATH, cleanedText], {
      cwd: __dirname,
      shell: false,
      windowsHide: true,
    });

    let errorOutput = "";

    child.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    child.on("close", (code) => {
      if (code === 0 && fs.existsSync(SPEECH_PATH)) {
        resolve(true);
      } else {
        reject(
          new Error(errorOutput || `TextToSpeech.py exited with code ${code}`)
        );
      }
    });
  });
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI chatbot server running",
  });
});

// Serve voice
app.get("/api/speech", (req, res) => {
  if (!fs.existsSync(SPEECH_PATH)) {
    return res.status(404).send("Speech file not found.");
  }

  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Cache-Control", "no-store");

  res.sendFile(SPEECH_PATH);
});

// Generate speech
app.post("/api/text-to-speech", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required." });
    }

    await generateSpeech(text);

    res.json({
      success: true,
      audioUrl: "/api/speech",
    });
  } catch (error) {
    console.error("TTS Error:", error);

    res.status(500).json({
      success: false,
      error: "Voice generation failed",
    });
  }
});

// Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).send("Message is required.");
    }

    if (!process.env.GroqAPIKey) {
      return res.status(500).send("Groq API key is missing.");
    }

    const details = readDetails();
    const oldMessages = readChatLog();

    const systemPrompt = `
You are a portfolio AI chatbot.

Rules:
- Answer only using the portfolio details given below.
- If information is not available, say: "I do not have that information in my portfolio details."
- Reply in simple English.
- Keep answers short and clear.
- Do not answer unrelated questions.

Portfolio Details:
${details}
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...oldMessages.slice(-20),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.7,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true,
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");

    let fullAnswer = "";

    for await (const chunk of completion) {
      const text = chunk.choices[0]?.delta?.content || "";
      fullAnswer += text;
      res.write(text);
    }

    const updatedMessages = [
      ...oldMessages,
      { role: "user", content: message },
      { role: "assistant", content: fullAnswer },
    ];

    saveChatLog(updatedMessages.slice(-50));

    res.end();
  } catch (error) {
    console.error("Chatbot Error:", error);

    if (!res.headersSent) {
      res.status(500).send("Sorry, chatbot is not working right now.");
    } else {
      res.end();
    }
  }
});

// Clear chat
app.post("/api/clear-chat", (req, res) => {
  saveChatLog([]);
  res.json({ success: true });
});

// Serve React frontend after Vite build
app.use(express.static(DIST_DIR));

// React route fallback for Express 5
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`AI chatbot server running on port ${PORT}`);
});
