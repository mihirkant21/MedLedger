# 🏥 MedLedger — AI-Powered Medical Report Dashboard

A hackathon project that lets users upload medical documents (prescriptions, lab reports, X-rays, MRI scans) and uses **Tesseract OCR + Groq AI** to automatically extract, structure, and store all the data in a personal health dashboard.

---

## ✨ Features

- **Upload & Scan** — Upload any photo or image of a medical document (prescription, lab report, X-ray, MRI, etc.)
- **OCR Extraction** — Tesseract.js extracts all text from the uploaded image automatically
- **AI Analysis** — Groq's Llama AI structures the extracted text into title, report type, doctor name, patient name, key findings, and more
- **Personal Dashboard** — All your reports are stored and displayed in a clean dashboard with stats
- **Edit Extracted Text** — If OCR misses something, you can manually edit the extracted text
- **Attach More Files** — Add related files (X-rays, MRI scans, lab reports) to any existing report
- **Delete Reports & Files** — Remove any report or individual file anytime

---

## 🛠️ Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React, Lucide Icons, CSS                |
| Backend    | Express.js                              |
| OCR        | Tesseract.js                            |
| AI Model   | Groq API (Llama 3.3 70B)               |
| Others     | dotenv, cors, node-fetch, axios         |

---

## 📋 Prerequisites

Make sure you have these installed before starting:

- **Node.js** (v18 or above) — Download from [https://nodejs.org](https://nodejs.org)
- **npm** — Comes with Node.js automatically
- **Groq API Key** — Sign up free at [https://console.groq.com](https://console.groq.com) and create an API key

---

## 📁 Project Structure

```
MedLedger/
│
├── public/
│   └── index.html          ← Base HTML file (has <div id="root">)
│
├── src/
│   ├── index.js            ← React entry point
│   └── App.jsx             ← Main app (UI, upload logic, dashboard)
│
├── proxy.js                ← Express backend (OCR + Groq API)
├── .env                    ← Your secret API key (never share this)
├── .gitignore              ← Tells git to ignore node_modules, .env, build
├── package.json            ← Project dependencies and scripts
└── README.md               ← This file
```

---

## 🚀 Setup Guide (Step by Step)

### Step 1 — Clone or Download the Project

If you have the project as a zip, extract it. If it is on GitHub:

```bash
git clone https://github.com/your-username/medledger.git
cd MedLedger
```

### Step 2 — Install All Dependencies

```bash
npm install
```

This installs everything listed in package.json (React, Express, Tesseract, etc.). Takes about 1-3 minutes.

### Step 3 — Get Your Groq API Key

1. Go to [https://console.groq.com/keys](https://console.groq.com/keys)
2. Sign up for free
3. Click **Create API Key**
4. Copy the key — it looks like: `gsk_xxxxxxxxxxxxxxxxxxxxx`

### Step 4 — Create the .env File

Create a file called `.env` in the root of your project (same level as `src/`) and add:

```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
```

Replace the placeholder with your actual key. No quotes, no spaces around the `=`.

> ⚠️ **Never share this file or push it to GitHub.** It contains your secret API key.

### Step 5 — Run the Backend (Proxy Server)

Open a terminal and run:

```bash
node proxy.js
```

You should see:

```
✅ Proxy server running on http://localhost:3001
✅ Groq Key loaded: Yes
```

Keep this terminal open. Do not close it.

### Step 6 — Run the Frontend (React App)

Open a **second terminal** and run:

```bash
npm start
```

You should see:

```
Compiled successfully!
You can now view medscan in the browser.
  Local: http://localhost:3000
```

### Step 7 — Open the App

Go to your browser and open:

```
http://localhost:3000
```

You should see the **MedLedger** landing page. Click **Get Started** and upload a medical document to test it!

---

## ⚙️ How It Works (Under the Hood)

```
User uploads image
       ↓
App.jsx reads image as base64
       ↓
Sends to proxy.js at localhost:3001/api/chat
       ↓
Tesseract.js runs OCR → extracts raw text from image
       ↓
Extracted text is sent to Groq API (Llama 3.3 70B)
       ↓
Groq returns structured JSON (title, doctor, findings, etc.)
       ↓
App.jsx receives JSON and displays it as a report card
       ↓
User can view, edit, attach more files, or delete
```

---

## 🔧 Environment Variables

| Variable       | Description                          | Where to Get It                                        |
|----------------|--------------------------------------|--------------------------------------------------------|
| GROQ_API_KEY   | Your Groq API secret key             | [https://console.groq.com/keys](https://console.groq.com/keys) |

---

## 📦 Dependencies

| Package          | What it does                                      |
|------------------|---------------------------------------------------|
| react            | Frontend UI library                               |
| react-dom        | Renders React to the browser                      |
| react-scripts    | Runs and builds the React app                     |
| lucide-react     | Icons used in the UI                              |
| express          | Backend server framework                          |
| cors             | Allows frontend to talk to backend                |
| node-fetch       | Makes HTTP requests from the backend              |
| tesseract.js     | OCR — reads text from images                      |
| axios            | HTTP client (backup)                              |
| dotenv           | Reads .env file for secret keys                   |

---

## ❓ Common Issues & Fixes

**Blank page on localhost:3000**
- Make sure `public/index.html` has `<div id="root"></div>` inside the body tag
- Check browser console (F12 → Console tab) for error messages

**"Image missing" error**
- Make sure the proxy is running (run `node proxy.js` in another terminal)
- Check that your .env file has the correct GROQ_API_KEY

**"Groq Key loaded: No"**
- Your .env file is missing or the key name is wrong
- Make sure it says exactly `GROQ_API_KEY=your_key` with no quotes and no spaces

**"Processing failed" error**
- Check Terminal 1 (proxy) — it will print the exact error message
- Make sure your Groq API key is valid and not expired

---

## 🎯 Future Ideas

- Add Firebase or Supabase to save reports permanently (currently stored in memory)
- Add user authentication (login / signup)
- Support PDF uploads with PDF-to-image conversion
- Add a search bar to find reports by keyword
- Export reports as PDF downloads

---

## 👥 Built By

MedLedger Team — Hackathon 2026

---

> 💡 **Tip:** If you want to share this app with someone on the same network, they can access it at the network URL shown when you run `npm start` (something like `http://10.x.x.x:3000`). The proxy also needs to be running on the same machine.