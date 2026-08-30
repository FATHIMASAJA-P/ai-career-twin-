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

## 🚀 Future Improvements

- Recruiter dashboard
- Resume builder
- Advanced AI mock interviews
- Cloud deployment
- User analytics and growth tracking

## 👩‍💻 Author

**Fathima Saja P**
