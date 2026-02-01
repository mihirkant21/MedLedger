🏥 MedLedger — AI-Powered Medical Report Dashboard

MedLedger is a fully deployed hackathon project that allows users to upload medical documents (prescriptions, lab reports, X-rays, MRI scans) and automatically extracts, structures, and manages medical data using OCR + Large Language Models.

🌐 Live Deployment
🚀 Frontend (Vercel)

👉 https://medledger-app.vercel.app/

⚙️ Backend (Render)

👉 https://medledger-backend-z40z.onrender.com

ℹ️ Deployment Overview

Frontend deployed on Vercel

Backend (OCR + AI processing) deployed on Render

Groq API key securely stored in backend environment variables

No secrets exposed on the frontend

✨ Features

Upload Medical Documents — Prescriptions, lab reports, X-rays, MRI scans

OCR Extraction — Tesseract.js extracts raw text from images

AI Structuring — Groq’s Llama 3.3 70B converts text into structured medical data

Personal Dashboard — View all reports in a clean, card-based dashboard

Edit Extracted Text — Manually fix OCR errors if needed

Attach Additional Files — Add related MRI/X-ray/lab files to a report

Delete Reports & Files — Full control over uploaded data

🛠️ Tech Stack
Layer	Technology
Frontend	React, CSS, Lucide Icons
Backend	Node.js, Express.js
OCR	Tesseract.js
AI Model	Groq API (Llama 3.3 70B)
Deployment	Vercel (Frontend), Render (Backend)
Utilities	dotenv, cors, axios, node-fetch
📁 Project Structure
MedLedger/
│
├── public/
│   └── index.html
│
├── src/
│   ├── index.js
│   └── App.jsx
│
├── proxy.js
├── .env
├── .gitignore
├── package.json
└── README.md

⚙️ How It Works (End-to-End Flow)
User uploads medical image
        ↓
Frontend converts image to base64
        ↓
Request sent to deployed backend (Render)
        ↓
Tesseract.js performs OCR
        ↓
Extracted text sent to Groq LLM
        ↓
Structured medical JSON returned
        ↓
Dashboard displays report

🔗 Backend API

Base URL

https://medledger-backend-z40z.onrender.com


Main Endpoint

POST /api/chat


What it does

Accepts base64 image data

Runs OCR using Tesseract.js

Structures data using Groq Llama 3.3 70B

Returns clean, structured medical JSON

🔐 Environment Variables
Variable	Description
GROQ_API_KEY	Groq API secret key

API keys are stored securely in Render Environment Variables for production and in .env locally.

🚀 Local Development Setup (Optional)
1️⃣ Clone Repository
git clone https://github.com/your-username/medledger.git
cd MedLedger

2️⃣ Install Dependencies
npm install

3️⃣ Create .env File
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx

4️⃣ Run Backend
node proxy.js

5️⃣ Run Frontend
npm start


App runs at:

http://localhost:3000

❓ Common Issues

Backend cold start delay

Render free tier may take 10–20 seconds to wake up

Groq quota exceeded

Free tier limits apply

Regenerate or upgrade API key if needed

OCR inaccuracies

Image quality affects OCR accuracy

Manual edit option is available in the UI