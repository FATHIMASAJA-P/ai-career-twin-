# 🤖 AI Career Twin

AI Career Twin is an AI-powered career guidance platform that helps users improve their career profile, evaluate resumes, match skills to job descriptions, and track their professional growth through an intelligent dashboard.

## ✨ Features

- User registration and login
- JWT-based authentication
- Resume upload and processing
- AI-powered career analysis
- Resume vs. job description matching
- ATS resume score evaluation
- Responsive dashboard
- Password reset flow
- Mock interview support

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic

### AI

- Google Gemini API

## 📁 Project Structure

```text
AI-Career-Twin/
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── README.md
└── ...
```

## ⚙️ Installation

### Backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

**Windows:**

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
SMTP_EMAIL=your_email@example.com
SMTP_APP_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
DATABASE_URL=sqlite:///./career_twin.db
```

⚠️ Do not upload your real `.env` file or API keys to GitHub.

## 🔄 How It Works

1. Users sign up or log in securely.
2. Their resume is uploaded and processed.
3. AI evaluates the content against career goals and job requirements.
4. The system provides ATS insights, job match recommendations, and career guidance.
5. The dashboard displays progress and actionable insights.

## 🚀 Deploy

This app has two parts that must be hosted separately:

- **Backend** (FastAPI) on [Render](https://render.com)
- **Frontend** (React/Vite) on [Render](https://render.com) or [Vercel](https://vercel.com)
- **Database** (PostgreSQL) on [Neon](https://neon.tech) (free) or Render Postgres

SQLite will not persist on cloud hosts. Use PostgreSQL in production.

### 1. Push this repo to GitHub

Commit the latest changes, then push `main` to GitHub.

### 2. Create a Postgres database (Neon)

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string (`postgresql://...`)

### 3. Deploy the backend on Render

1. Open [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**
2. Connect `FATHIMASAJA-P/ai-career-twin-` and apply `render.yaml`
3. Or create a **Web Service** manually:
   - Root directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Health check: `/health`
4. Set environment variables:

```env
SECRET_KEY=a-long-random-string
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require
FRONTEND_URL=https://your-frontend-url
SMTP_EMAIL=your_email@example.com
SMTP_APP_PASSWORD=your_app_password
```

5. Deploy, then copy the API URL, for example `https://ai-career-twin-api.onrender.com`

Confirm it works: open `/health` and you should see `{"status":"ok"}`.

### 4. Deploy the frontend

**Option A — Render static site (included in `render.yaml`)**

1. Set `VITE_API_URL` to your backend URL (no trailing slash)
2. Deploy the `ai-career-twin-web` service
3. Copy the frontend URL and put it in the backend `FRONTEND_URL`, then redeploy the API

**Option B — Vercel**

1. Import the GitHub repo in Vercel
2. Set **Root Directory** to `frontend`
3. Add env var `VITE_API_URL` = your Render API URL
4. Deploy
5. Put the Vercel URL into backend `FRONTEND_URL` and redeploy the API

Vite bakes `VITE_API_URL` in at build time. If you change the API URL later, rebuild the frontend.

### 5. CORS and password reset

Backend `FRONTEND_URL` must match the live frontend origin (no trailing slash). That value is also used in password-reset emails.

## 🚀 Future Improvements

- Recruiter dashboard
- Resume builder
- Advanced AI mock interviews
- User analytics and growth tracking

## 👩‍💻 Author

**Fathima Saja P**
