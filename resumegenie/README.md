# ResumeGenie

A free, privacy-first resume builder and ATS (Applicant Tracking System) optimizer built with React + Vite + Material-UI. Everything runs in the browser — no backend, no data sent to any server.

## Features

- 📝 **Resume Builder** — 6-step guided wizard (Personal Info, Experience, Education, Skills, Projects, Certifications)
- 📊 **ATS Scorer** — paste any job description to get a keyword-match score and section-level breakdown
- 📄 **PDF Export** — export a clean, A4-formatted resume as a PDF
- 📤 **PDF Import** — drag and drop an existing PDF resume to extract its text for editing
- 🌙 **Dark / Light Mode** — toggleable theme that persists across sessions
- 💾 **Auto-save** — all resume data is saved to `localStorage` automatically

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + React Router 7 |
| Build Tool | Vite 7 |
| UI Library | Material-UI 7 |
| Styling | Emotion |
| PDF Parsing | pdfjs-dist |
| PDF Export | jsPDF + html2canvas |
| Icons | @mui/icons-material |
| Linting | ESLint 9 |

## Getting Started

```bash
# 1. Navigate into the project directory
cd resumegenie

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Scripts

```bash
npm run build    # Build for production
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Usage

1. **Build your resume** — Go to the **Builder** page and fill in each section step-by-step. Your data is auto-saved as you type.
2. **Import an existing resume** — On the first Builder step, drag-and-drop a PDF to extract its text into the summary field.
3. **Preview & export** — Go to the **Preview** page to see your formatted resume and download it as a PDF.
4. **Check ATS compatibility** — Go to the **ATS Scorer** page, paste a job description, and click **Analyze My Resume** to get:
   - An overall ATS compatibility score (0–100)
   - Per-section scores for Summary, Experience, Skills, and Education
   - Matched and missing keywords from the job description
   - Contextual improvement suggestions

## ATS Scoring

The ATS scorer compares your resume against the pasted job description using a local keyword-matching algorithm:

- Keywords are extracted from both the job description and each resume section
- Common stopwords and short noise words are filtered out
- Tech abbreviations are normalized (e.g. `react.js` → `react`, `nodejs` → `node`)
- **Section scores** are computed independently — each section is scored against how many job-description keywords it covers
- **Overall score** is a weighted average: Experience (35%) + Skills (35%) + Summary (20%) + Education (10%)
- **No data leaves your browser** — all analysis is done client-side

## Project Structure

```
resumegenie/
├── public/
├── src/
│   ├── App.jsx                   # Routes
│   ├── main.jsx                  # Entry point
│   ├── theme.js                  # MUI theme (dark/light)
│   ├── index.css                 # Global styles
│   ├── components/
│   │   ├── Layout/               # Navbar, Layout wrapper, background
│   │   ├── Builder/              # BuilderStepper + 6 step forms
│   │   ├── Parser/               # PDF drag-and-drop uploader
│   │   └── Preview/              # Classic A4 resume template
│   ├── context/
│   │   ├── ResumeContext.jsx     # Resume state (useReducer + localStorage)
│   │   └── ThemeContext.jsx      # Dark/light mode context
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── BuilderPage.jsx
│   │   ├── PreviewPage.jsx
│   │   └── ATSScorerPage.jsx
│   └── utils/
│       ├── pdfParser.js          # PDF text extraction (pdfjs-dist)
│       └── pdfExport.js          # PDF generation (html2canvas + jsPDF)
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Privacy

All resume data is stored only in your browser's `localStorage`. No data is sent to any external server. Clearing browser storage will erase your saved resume.
