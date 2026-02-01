import { useState, useRef } from "react";
import { Upload, FileText, Edit3, Trash2, Plus, ArrowLeft, Eye, X, CheckCircle, Image, Activity, Calendar } from "lucide-react";

// ─── STYLES ─────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #0a0e1a;
    --bg-card: #111828;
    --bg-card-hover: #171f35;
    --accent: #4f8cff;
    --accent-glow: rgba(79,140,255,0.25);
    --accent2: #34d4a0;
    --accent2-glow: rgba(52,212,160,0.2);
    --text: #e2e8f0;
    --text-muted: #7a8599;
    --border: rgba(255,255,255,0.07);
    --danger: #f06b6b;
    --warning: #f5a623;
    --radius: 14px;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .ambient {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 80% 50% at 20% 20%, rgba(79,140,255,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 75% 70%, rgba(52,212,160,0.05) 0%, transparent 60%);
  }

  .app-shell { position: relative; z-index: 1; min-height: 100vh; }

  /* ── LANDING ── */
  .landing {
    min-height: 100vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 40px 20px;
    text-align: center;
  }
  .landing-logo {
    display: flex; align-items: center; gap: 12px; margin-bottom: 48px;
  }
  .logo-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 28px var(--accent-glow);
  }
  .landing h1 {
    font-family: 'Playfair Display', serif;
    font-size: 56px; font-weight: 700;
    background: linear-gradient(135deg, #fff 30%, var(--accent));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    line-height: 1.15;
  }
  .landing-sub {
    color: var(--text-muted); font-size: 17px; max-width: 520px;
    line-height: 1.7; margin-bottom: 40px;
  }
  .btn-start {
    background: linear-gradient(135deg, var(--accent), #3b7de8);
    color: #fff; border: none; padding: 16px 42px;
    border-radius: 50px; font-size: 16px; font-weight: 600;
    cursor: pointer; letter-spacing: 0.3px;
    box-shadow: 0 4px 24px var(--accent-glow);
    transition: transform .2s, box-shadow .2s;
  }
  .btn-start:hover { transform: translateY(-2px); box-shadow: 0 6px 32px var(--accent-glow); }

  .feature-row {
    display: flex; gap: 24px; margin-top: 64px; flex-wrap: wrap; justify-content: center;
  }
  .feature-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 28px 24px; width: 200px;
    text-align: center;
  }
  .feature-card .f-icon { font-size: 28px; margin-bottom: 12px; }
  .feature-card h4 { font-size: 14px; color: var(--text); margin-bottom: 6px; }
  .feature-card p { font-size: 12px; color: var(--text-muted); line-height: 1.5; }

  /* ── DASHBOARD LAYOUT ── */
  .dashboard { display: flex; min-height: 100vh; }

  .sidebar {
    width: 240px; background: var(--bg-card); border-right: 1px solid var(--border);
    padding: 24px 16px; display: flex; flex-direction: column; gap: 8px;
    position: sticky; top: 0; height: 100vh; overflow-y: auto;
  }
  .sidebar-logo { display: flex; align-items: center; gap: 10px; padding: 12px 10px; margin-bottom: 16px; }
  .sidebar-logo .logo-icon { width: 36px; height: 36px; border-radius: 10px; }
  .sidebar-logo span { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; }

  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border-radius: 10px; cursor: pointer;
    color: var(--text-muted); font-size: 14px; font-weight: 500;
    transition: all .2s; border: 1px solid transparent;
  }
  .nav-item:hover { background: var(--bg-card-hover); color: var(--text); }
  .nav-item.active { background: rgba(79,140,255,0.1); color: var(--accent); border-color: rgba(79,140,255,0.2); }

  .main { flex: 1; padding: 32px; overflow-y: auto; }
  .main-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
  .main-header h2 { font-family: 'Playfair Display', serif; font-size: 26px; }
  .main-header p { color: var(--text-muted); font-size: 13px; margin-top: 4px; }

  /* ── UPLOAD AREA ── */
  .upload-zone {
    border: 2px dashed var(--border); border-radius: var(--radius);
    padding: 48px 32px; text-align: center; cursor: pointer;
    background: var(--bg-card); transition: all .25s;
    margin-bottom: 32px;
  }
  .upload-zone:hover, .upload-zone.drag-over {
    border-color: var(--accent); background: rgba(79,140,255,0.04);
    box-shadow: 0 0 32px var(--accent-glow);
  }
  .upload-zone .uz-icon { color: var(--accent); margin-bottom: 14px; }
  .upload-zone h4 { font-size: 16px; margin-bottom: 6px; }
  .upload-zone p { color: var(--text-muted); font-size: 13px; }
  .upload-zone .uz-types { margin-top: 10px; }
  .uz-tag {
    display: inline-block; background: rgba(79,140,255,0.1); color: var(--accent);
    font-size: 11px; padding: 4px 10px; border-radius: 20px; margin: 3px;
  }

  /* ── REPORT CARDS ── */
  .reports-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px; }
  .report-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 22px; transition: all .2s;
    position: relative; overflow: hidden;
  }
  .report-card:hover { border-color: var(--accent); box-shadow: 0 4px 24px var(--accent-glow); transform: translateY(-2px); }
  .report-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
  }
  .rc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
  .rc-type {
    display: flex; align-items: center; gap: 8px;
    background: rgba(79,140,255,0.1); padding: 5px 12px;
    border-radius: 20px; font-size: 12px; color: var(--accent); font-weight: 500;
  }
  .rc-date { color: var(--text-muted); font-size: 11px; display: flex; align-items: center; gap: 4px; }
  .rc-title { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
  .rc-summary { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px; }
  .rc-actions { display: flex; gap: 8px; }
  .rc-btn {
    flex: 1; background: transparent; border: 1px solid var(--border);
    color: var(--text-muted); border-radius: 8px; padding: 8px 12px;
    font-size: 12px; cursor: pointer; display: flex; align-items: center;
    justify-content: center; gap: 6px; transition: all .2s; font-family: inherit;
  }
  .rc-btn:hover { border-color: var(--accent); color: var(--accent); background: rgba(79,140,255,0.06); }
  .rc-btn.danger:hover { border-color: var(--danger); color: var(--danger); background: rgba(240,107,107,0.06); }

  .rc-files { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); }
  .rc-file-item {
    display: flex; align-items: center; gap: 8px; padding: 6px 0;
    font-size: 12px; color: var(--text-muted);
  }
  .rc-file-item .fi-icon { color: var(--accent2); }

  /* ── DETAIL VIEW ── */
  .detail-view { max-width: 780px; margin: 0 auto; }
  .detail-back {
    display: flex; align-items: center; gap: 8px; color: var(--text-muted);
    background: none; border: none; cursor: pointer; font-size: 14px;
    font-family: inherit; margin-bottom: 24px; transition: color .2s;
  }
  .detail-back:hover { color: var(--accent); }

  .detail-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 32px; margin-bottom: 20px;
  }
  .detail-card h3 { font-size: 20px; margin-bottom: 6px; }
  .detail-meta { display: flex; gap: 20px; margin-bottom: 24px; flex-wrap: wrap; }
  .dm-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted); }

  .extracted-section h4 {
    font-size: 13px; color: var(--text-muted); text-transform: uppercase;
    letter-spacing: 1px; margin-bottom: 14px;
  }
  .extracted-content {
    background: rgba(0,0,0,0.3); border: 1px solid var(--border);
    border-radius: 10px; padding: 20px; font-size: 14px; line-height: 1.8;
    color: var(--text); white-space: pre-wrap; position: relative;
  }
  .edit-btn-inline {
    position: absolute; top: 12px; right: 12px;
    background: rgba(79,140,255,0.15); border: 1px solid rgba(79,140,255,0.3);
    color: var(--accent); border-radius: 6px; padding: 5px 10px;
    font-size: 11px; cursor: pointer; display: flex; align-items: center; gap: 4px;
    font-family: inherit; transition: background .2s;
  }
  .edit-btn-inline:hover { background: rgba(79,140,255,0.25); }

  .edit-textarea {
    width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--accent);
    border-radius: 10px; padding: 20px; font-size: 14px; line-height: 1.8;
    color: var(--text); font-family: inherit; resize: vertical; min-height: 140px;
    outline: none; box-shadow: 0 0 16px var(--accent-glow);
  }
  .edit-actions { display: flex; gap: 8px; margin-top: 10px; justify-content: flex-end; }
  .btn-save {
    background: var(--accent2); color: #0a0e1a; border: none;
    padding: 8px 20px; border-radius: 8px; font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: opacity .2s;
  }
  .btn-save:hover { opacity: 0.85; }
  .btn-cancel {
    background: transparent; color: var(--text-muted); border: 1px solid var(--border);
    padding: 8px 20px; border-radius: 8px; font-size: 13px; cursor: pointer;
    font-family: inherit; transition: all .2s;
  }
  .btn-cancel:hover { border-color: var(--text-muted); color: var(--text); }

  .upload-more {
    border: 2px dashed var(--border); border-radius: 10px;
    padding: 20px; text-align: center; cursor: pointer;
    transition: all .2s; margin-top: 16px;
  }
  .upload-more:hover { border-color: var(--accent2); background: rgba(52,212,160,0.04); }
  .upload-more p { font-size: 13px; color: var(--text-muted); }

  .file-list-item {
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(0,0,0,0.2); border-radius: 8px; padding: 10px 14px;
    margin-top: 8px;
  }
  .fli-left { display: flex; align-items: center; gap: 10px; }
  .fli-icon {
    width: 34px; height: 34px; background: rgba(52,212,160,0.1);
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
    color: var(--accent2);
  }
  .fli-name { font-size: 13px; font-weight: 500; }
  .fli-size { font-size: 11px; color: var(--text-muted); }
  .fli-remove {
    background: none; border: none; color: var(--text-muted);
    cursor: pointer; transition: color .2s; padding: 4px;
  }
  .fli-remove:hover { color: var(--danger); }

  .spinner {
    width: 40px; height: 40px; border: 3px solid var(--border);
    border-top-color: var(--accent); border-radius: 50%;
    animation: spin .6s linear infinite; margin: 40px auto;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { text-align: center; color: var(--text-muted); font-size: 14px; margin-top: -24px; }

  .toast {
    position: fixed; bottom: 28px; right: 28px; z-index: 999;
    background: var(--bg-card); border: 1px solid var(--accent2);
    color: var(--text); padding: 14px 22px; border-radius: 10px;
    display: flex; align-items: center; gap: 10px; font-size: 14px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: slideIn .3s ease;
  }
  @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }
  .empty-state .es-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
  .empty-state p { font-size: 14px; }

  .stats-row { display: flex; gap: 16px; margin-bottom: 28px; flex-wrap: wrap; }
  .stat-card {
    flex: 1; min-width: 140px; background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px;
  }
  .stat-card .sc-val { font-size: 28px; font-weight: 700; font-family: 'Playfair Display', serif; }
  .stat-card .sc-label { font-size: 12px; color: var(--text-muted); margin-top: 4px; }
`;

// ─── APP COMPONENT ─────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);
  const moreFilesRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  // ── FILE PROCESSING ──
  const processFile = async (file) => {
    if (!file) return;
    setIsProcessing(true);

    // Read file as base64 — strip the "data:..." prefix, keep only the raw base64
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

    // Rebuild the full data URL with the correct mime type
    const dataUrl = "data:" + file.type + ";base64," + base64;

    try {
      const response = await fetch("https://medledger-backend-z40z.onrender.com/api/chat",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o",
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: dataUrl,
                  },
                },
                {
                  type: "text",
                  text: `You are a medical document OCR and analysis assistant. Analyze this medical document or image carefully.

Extract and structure the following information. Return ONLY a valid JSON object — no markdown, no backticks, no preamble. Exactly this format:

{
  "title": "Short descriptive title of this report",
  "report_type": "One of: Lab Report, X-Ray, MRI, CT Scan, Doctor Prescription, Insurance Bill, Discharge Summary, Other",
  "doctor_name": "Doctor's name if present, else N/A",
  "patient_name": "Patient's name if present, else N/A",
  "date": "Date on the document if present, else N/A",
  "key_findings": "A concise summary of key findings or observations in 2 to 4 sentences",
  "extracted_text": "Full structured text extracted from the document"
}`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const rawText = data.choices[0].message.content;
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      const newReport = {
        id: Date.now(),
        ...parsed,
        files: [
          {
            name: file.name,
            size: file.size,
            type: file.type,
            addedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
      };

      setReports((prev) => [newReport, ...prev]);
      showToast("Report processed successfully!");
    } catch (err) {
      console.error(err);
      showToast("Error processing file. Please try again.");
    }
    setIsProcessing(false);
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // ── DETAIL ACTIONS ──
  const addMoreFile = (e) => {
    const file = e.target.files?.[0];
    if (file && selectedReport) {
      const newFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        addedAt: new Date().toISOString(),
      };
      const updatedFiles = [...selectedReport.files, newFile];
      setReports((prev) =>
        prev.map((r) => (r.id === selectedReport.id ? { ...r, files: updatedFiles } : r))
      );
      setSelectedReport((prev) => ({ ...prev, files: updatedFiles }));
      showToast("File added successfully!");
    }
    e.target.value = "";
  };

  const deleteReport = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    if (selectedReport?.id === id) {
      setSelectedReport(null);
      setPage("dashboard");
    }
    showToast("Report deleted.");
  };

  const removeFileFromReport = (fileIndex) => {
    if (!selectedReport) return;
    const updatedFiles = selectedReport.files.filter((_, i) => i !== fileIndex);
    setReports((prev) =>
      prev.map((r) => (r.id === selectedReport.id ? { ...r, files: updatedFiles } : r))
    );
    setSelectedReport((prev) => ({ ...prev, files: updatedFiles }));
    showToast("File removed.");
  };

  const updateExtractedText = (newText) => {
    setReports((prev) =>
      prev.map((r) => (r.id === selectedReport.id ? { ...r, extracted_text: newText } : r))
    );
    setSelectedReport((prev) => ({ ...prev, extracted_text: newText }));
    showToast("Text updated!");
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  // ─── RENDER ──────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>
      <div className="ambient" />
      <div className="app-shell">

        {/* ── LANDING PAGE ── */}
        {page === "landing" && (
          <div className="landing">
            <div className="landing-logo">
              <div className="logo-icon">
                <Activity size={26} color="#fff" />
              </div>
              <h1>MedLedger</h1>
            </div>
            <p className="landing-sub">
              Upload your medical reports, prescriptions, or scans. Our AI extracts,
              organizes, and stores everything in your personal health dashboard — instantly.
            </p>
            <button className="btn-start" onClick={() => setPage("dashboard")}>
              Get Started →
            </button>
            <div className="feature-row">
              <div className="feature-card">
                <div className="f-icon">📷</div>
                <h4>Snap & Upload</h4>
                <p>Take a photo or upload any medical document</p>
              </div>
              <div className="feature-card">
                <div className="f-icon">🧠</div>
                <h4>AI Extraction</h4>
                <p>Gemini AI extracts and structures all data automatically</p>
              </div>
              <div className="feature-card">
                <div className="f-icon">📁</div>
                <h4>Smart Dashboard</h4>
                <p>All reports organized in one secure place</p>
              </div>
              <div className="feature-card">
                <div className="f-icon">✏️</div>
                <h4>Edit & Attach</h4>
                <p>Edit extracted text and attach related files</p>
              </div>
            </div>
          </div>
        )}

        {/* ── DASHBOARD + DETAIL ── */}
        {(page === "dashboard" || page === "detail") && (
          <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
              <div className="sidebar-logo">
                <div className="logo-icon">
                  <Activity size={18} color="#fff" />
                </div>
                <span>MedLedger</span>
              </div>
              <div
                className={`nav-item ${page === "dashboard" && !selectedReport ? "active" : ""}`}
                onClick={() => { setPage("dashboard"); setSelectedReport(null); }}
              >
                <Activity size={18} /> My Reports
              </div>
              <div className="nav-item" onClick={() => fileInputRef.current?.click()}>
                <Plus size={18} /> New Report
              </div>
              <div
                className="nav-item"
                style={{ marginTop: "auto", color: "var(--text-muted)", fontSize: 12 }}
                onClick={() => { setPage("landing"); setSelectedReport(null); }}
              >
                <ArrowLeft size={16} /> Back to Home
              </div>
            </div>

            {/* Main Content */}
            <div className="main">
              <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*,.pdf" style={{ display: "none" }} />
              <input type="file" ref={moreFilesRef} onChange={addMoreFile} accept="image/*,.pdf" style={{ display: "none" }} />

              {/* ── DETAIL VIEW ── */}
              {page === "detail" && selectedReport && (
                <div className="detail-view">
                  <button className="detail-back" onClick={() => { setPage("dashboard"); setSelectedReport(null); }}>
                    <ArrowLeft size={16} /> Back to Reports
                  </button>

                  <div className="detail-card">
                    <h3>{selectedReport.title}</h3>
                    <div className="detail-meta">
                      <div className="dm-item"><FileText size={14} /> {selectedReport.report_type}</div>
                      <div className="dm-item"><Calendar size={14} /> {selectedReport.date}</div>
                      <div className="dm-item"><Activity size={14} /> Dr. {selectedReport.doctor_name}</div>
                    </div>

                    <div className="extracted-section">
                      <h4>Key Findings</h4>
                      <div style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7, marginBottom: 24 }}>
                        {selectedReport.key_findings}
                      </div>

                      <h4>Extracted Text</h4>
                      <EditableContent
                        text={selectedReport.extracted_text}
                        onSave={updateExtractedText}
                      />
                    </div>
                  </div>

                  {/* Attached Files */}
                  <div className="detail-card">
                    <h4 style={{ fontSize: 15, marginBottom: 14 }}>Attached Files</h4>
                    {selectedReport.files.map((f, i) => (
                      <div className="file-list-item" key={i}>
                        <div className="fli-left">
                          <div className="fli-icon">
                            {f.type?.startsWith("image/") ? <Image size={16} /> : <FileText size={16} />}
                          </div>
                          <div>
                            <div className="fli-name">{f.name}</div>
                            <div className="fli-size">{formatSize(f.size)} · Added {new Date(f.addedAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <button className="fli-remove" onClick={() => removeFileFromReport(i)}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}

                    <div className="upload-more" onClick={() => moreFilesRef.current?.click()}>
                      <Plus size={18} style={{ color: "var(--accent2)", marginBottom: 6 }} />
                      <p>Upload more files (X-Ray, MRI, Lab reports…)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── DASHBOARD VIEW ── */}
              {page === "dashboard" && (
                <>
                  <div className="main-header">
                    <div>
                      <h2>My Reports</h2>
                      <p>Upload and manage all your medical documents in one place</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="stats-row">
                    <div className="stat-card">
                      <div className="sc-val" style={{ color: "var(--accent)" }}>{reports.length}</div>
                      <div className="sc-label">Total Reports</div>
                    </div>
                    <div className="stat-card">
                      <div className="sc-val" style={{ color: "var(--accent2)" }}>
                        {reports.reduce((a, r) => a + r.files.length, 0)}
                      </div>
                      <div className="sc-label">Total Files</div>
                    </div>
                    <div className="stat-card">
                      <div className="sc-val" style={{ color: "var(--warning)" }}>
                        {[...new Set(reports.map((r) => r.report_type))].length}
                      </div>
                      <div className="sc-label">Report Types</div>
                    </div>
                  </div>

                  {/* Upload Zone */}
                  <div
                    className="upload-zone"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("drag-over"); }}
                    onDragLeave={(e) => e.currentTarget.classList.remove("drag-over")}
                    onDrop={(e) => { e.currentTarget.classList.remove("drag-over"); handleDrop(e); }}
                  >
                    <div className="uz-icon"><Upload size={32} /></div>
                    <h4>Drop your medical document here or click to upload</h4>
                    <p>Our AI will automatically extract and structure all information</p>
                    <div className="uz-types">
                      <span className="uz-tag">📷 Photos</span>
                      <span className="uz-tag">📄 Prescriptions</span>
                      <span className="uz-tag">🩻 X-Rays</span>
                      <span className="uz-tag">🧪 Lab Reports</span>
                      <span className="uz-tag">📑 PDF Reports</span>
                      <span className="uz-tag">🫁 MRI Scans</span>
                    </div>
                  </div>

                  {/* Processing Spinner */}
                  {isProcessing && (
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                      <div className="spinner" />
                      <p className="loading-text">AI is analyzing your document…</p>
                    </div>
                  )}

                  {/* Empty State */}
                  {reports.length === 0 && !isProcessing && (
                    <div className="empty-state">
                      <div className="es-icon">📋</div>
                      <p>No reports yet. Upload your first medical document above!</p>
                    </div>
                  )}

                  {/* Reports Grid */}
                  <div className="reports-grid">
                    {reports.map((report) => (
                      <div className="report-card" key={report.id}>
                        <div className="rc-header">
                          <div className="rc-type"><FileText size={13} /> {report.report_type}</div>
                          <div className="rc-date"><Calendar size={11} /> {report.date}</div>
                        </div>
                        <div className="rc-title">{report.title}</div>
                        <div className="rc-summary">
                          {report.key_findings?.substring(0, 100)}…
                        </div>
                        {report.files.length > 0 && (
                          <div className="rc-files">
                            {report.files.slice(0, 2).map((f, i) => (
                              <div className="rc-file-item" key={i}>
                                <span className="fi-icon">
                                  {f.type?.startsWith("image/") ? <Image size={13} /> : <FileText size={13} />}
                                </span>
                                {f.name}
                              </div>
                            ))}
                            {report.files.length > 2 && (
                              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                                +{report.files.length - 2} more files
                              </div>
                            )}
                          </div>
                        )}
                        <div className="rc-actions">
                          <button className="rc-btn" onClick={() => { setSelectedReport(report); setPage("detail"); }}>
                            <Eye size={13} /> View
                          </button>
                          <button className="rc-btn" onClick={() => { setSelectedReport(report); setTimeout(() => moreFilesRef.current?.click(), 100); }}>
                            <Plus size={13} /> Add File
                          </button>
                          <button className="rc-btn danger" onClick={() => deleteReport(report.id)}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast && (
          <div className="toast">
            <CheckCircle size={18} color="var(--accent2)" /> {toast}
          </div>
        )}
      </div>
    </>
  );
}

// ─── EDITABLE CONTENT COMPONENT ─────────────────────────────
function EditableContent({ text, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };

  if (editing) {
    return (
      <>
        <textarea
          className="edit-textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
        />
        <div className="edit-actions">
          <button className="btn-cancel" onClick={() => { setEditing(false); setDraft(text); }}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save Changes</button>
        </div>
      </>
    );
  }

  return (
    <div className="extracted-content">
      <button className="edit-btn-inline" onClick={() => { setDraft(text); setEditing(true); }}>
        <Edit3 size={12} /> Edit
      </button>
      {text}
    </div>
  );
}