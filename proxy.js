const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const Tesseract = require("tesseract.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.warn("⚠️  GROQ_API_KEY is not set. Check your .env file.");
}

app.post("/api/chat", async (req, res) => {
  try {
    // App.jsx sends { messages: [{ content: [{ type: "image_url", image_url: { url: "data:..." } }, ...] }] }
    // We extract the image data URL from that structure
    const content = req.body.messages[0].content;
    const imagePart = content.find((p) => p.type === "image_url");

    if (!imagePart || !imagePart.image_url || !imagePart.image_url.url) {
      return res.status(400).json({ error: "Image missing" });
    }

    const dataUrl = imagePart.image_url.url;

    // Strip the data URL prefix to get raw base64, then convert to Buffer for Tesseract
    const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ error: "Bad image format" });
    }
    const imageBuffer = Buffer.from(match[2], "base64");

    // ── STEP 1: OCR with Tesseract ──
    console.log("Running OCR...");
    const ocrResult = await Tesseract.recognize(imageBuffer, "eng", {
      logger: () => {},
    });

    const ocrText = ocrResult?.data?.text?.trim();
    console.log("OCR done. Text length:", ocrText?.length);

    if (!ocrText) {
      return res.status(400).json({ error: "OCR failed — no text found in image" });
    }

    // ── STEP 2: Send OCR text to Groq ──
    console.log("Sending to Groq...");
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + GROQ_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        max_tokens: 1200,
        messages: [
          {
            role: "user",
            content:
              "You are a medical document analysis assistant.\n\nHere is OCR-extracted text from a medical document:\n\n" +
              ocrText +
              "\n\nExtract and return ONLY valid JSON in exactly this format, no markdown, no backticks:\n\n{\n  \"title\": \"Short descriptive title of this report\",\n  \"report_type\": \"One of: Lab Report, X-Ray, MRI, CT Scan, Doctor Prescription, Insurance Bill, Discharge Summary, Other\",\n  \"doctor_name\": \"Doctor name if present, else N/A\",\n  \"patient_name\": \"Patient name if present, else N/A\",\n  \"date\": \"Date on the document if present, else N/A\",\n  \"key_findings\": \"2 to 4 sentence summary of key findings\",\n  \"extracted_text\": \"Clean structured version of the full extracted text\"\n}",
          },
        ],
      }),
    });

    const data = await groqResponse.json();
    console.log("Groq responded successfully.");

    // Return in the same format App.jsx expects: data.choices[0].message.content
    res.json(data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Processing failed" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("✅ Proxy server running on http://localhost:" + PORT);
  console.log("✅ Groq Key loaded:", GROQ_API_KEY ? "Yes" : "No — check your .env file!");
});