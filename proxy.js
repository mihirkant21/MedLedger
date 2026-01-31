const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        maxContentLength: 50 * 1024 * 1024,
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("OpenAI Error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json(
      err.response?.data || { error: "Something went wrong" }
    );
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
  console.log(`✅ OpenAI Key loaded: ${OPENAI_API_KEY ? "Yes" : "No — check your .env file!"}`);
});
