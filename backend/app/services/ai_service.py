from google import genai
from app.config import GEMINI_API_KEY
import json


client = genai.Client(api_key=GEMINI_API_KEY)


def generate_career_analysis(profile: str):
    prompt = f"""
You are an expert AI Career Mentor.

Analyze this candidate profile:

{profile}

Return ONLY valid JSON.

Use exactly this format:

{{
    "career_readiness_score": 0,
    "strengths": [],
    "missing_skills": [],
    "learning_roadmap": [],
    "recommended_job_roles": [],
    "mentor_advice": ""
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        text = response.text.strip()

        # Remove markdown if Gemini returns ```json
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Gemini Error:", e)

        return {
            "career_readiness_score": 0,
            "strengths": [],
            "missing_skills": [],
            "learning_roadmap": [],
            "recommended_job_roles": [],
            "mentor_advice": "Unable to generate career analysis."
        }
   

    
    


def generate_job_match(resume_text: str, job_description: str):
    prompt = f"""
You are an ATS Resume Reviewer and AI Career Mentor.

Compare the following resume with the job description.

Resume:
------------------------
{resume_text}
------------------------

Job Description:
------------------------
{job_description}
------------------------

Return ONLY valid JSON.

Use exactly this format:

{{
    "match_score": 0,
    "matching_skills": [],
    "missing_skills": [],
    "resume_improvements": [],
    "interview_preparation": [],
    "learning_recommendations": [],
    "final_verdict": ""
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        text = response.text.strip()

        # Remove markdown code block if Gemini adds it
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Gemini Error:", e)

        return {
            "match_score": 0,
            "matching_skills": [],
            "missing_skills": [],
            "resume_improvements": [],
            "interview_preparation": [],
            "learning_recommendations": [],
            "final_verdict": "Unable to generate job match analysis."
        }

def generate_ats_score(resume_text: str):
    prompt = f"""
You are an ATS Resume Reviewer.

Analyze the resume and return ONLY valid JSON.

Use exactly this format:

{{
    "ats_score": 0,
    "strengths": [],
    "missing_keywords": [],
    "resume_improvements": [],
    "final_verdict": ""
}}

Resume:
------------------------
{resume_text}
------------------------
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        text = response.text.strip()

        # Remove markdown if Gemini returns ```json
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Gemini Error:", e)

        return {
            "ats_score": 0,
            "strengths": [],
            "missing_keywords": [],
            "resume_improvements": [],
            "final_verdict": "Unable to generate ATS score."
        }


def generate_career_roadmap(profile: str):
    prompt = f"""
You are an expert AI Career Mentor.

Create a personalized career roadmap for this candidate.

Candidate Profile:
------------------------
{profile}
------------------------

Based on the candidate's education, experience, skills,
career goal, and resume, create a practical learning roadmap.

Return ONLY valid JSON.

Use exactly this format:

{{
    "roadmap": [
        {{
            "step": "",
            "status": "Pending"
        }}
    ]
}}

Rules:
- Create 5 to 8 roadmap steps.
- Use "Completed" only for skills the candidate already clearly knows.
- Use "In Progress" for skills where the candidate has some experience.
- Use "Pending" for skills they need to learn.
- Make the roadmap relevant to the candidate's career goal.
- Keep each step short and clear.
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        text = response.text.strip()

        # Remove markdown if Gemini returns ```json
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        data = json.loads(text)

        return data["roadmap"]

    except Exception as e:
        print("Gemini Error:", e)

        return [
            {
                "step": "Unable to generate career roadmap",
                "status": "Pending"
            }
        ]

def generate_interview_questions(profile: str, job_role: str):
    prompt = f"""
You are an expert technical interviewer.

Generate interview questions for this candidate.

Candidate Profile:
------------------------
{profile}
------------------------

Target Job Role:
{job_role}

Generate questions that match the candidate's skills,
experience, projects, and target job role.

Return ONLY valid JSON.

Use exactly this format:

{{
    "job_role": "",
    "questions": [
        {{
            "question": "",
            "category": "Technical",
            "difficulty": "Easy"
        }}
    ]
}}

Rules:
- Generate 10 questions.
- Include Python/programming questions when relevant.
- Include questions about the candidate's projects.
- Include questions about APIs, databases, and backend development when relevant.
- Include some HR/general questions.
- Use difficulty values: "Easy", "Medium", or "Hard".
- Keep questions clear and suitable for an entry-level candidate.
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        text = response.text.strip()

        # Remove markdown if Gemini returns ```json
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Gemini Error:", e)

        return {
            "job_role": job_role,
            "questions": []
        }

def generate_interview_answer(
    profile: str,
    question: str,
):
    prompt = f"""
You are an expert interview coach.

Candidate Profile:
------------------------
{profile}
------------------------

Interview Question:
------------------------
{question}
------------------------

Generate a strong interview answer for this candidate.

The answer should:
- Be suitable for an entry-level candidate.
- Be clear and easy to speak in an interview.
- Use the candidate's actual skills and projects when relevant.
- Do not invent experience that is not present in the profile.
- Give a practical example when appropriate.
- Keep the answer concise.

Return ONLY valid JSON.

Use exactly this format:

{{
    "question": "{question}",
    "answer": ""
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        text = response.text.strip()

        if text.startswith("```json"):
            text = (
                text.replace("```json", "")
                .replace("```", "")
                .strip()
            )

        return json.loads(text)

    except Exception as e:
        print("Gemini Error:", e)

        return {
            "question": question,
            "answer": "Unable to generate an answer."
        }

def evaluate_interview_answer(
    profile: str,
    question: str,
    user_answer: str,
):
    prompt = f"""
You are an expert technical interview coach.

Candidate Profile:
------------------------
{profile}
------------------------

Interview Question:
------------------------
{question}
------------------------

Candidate's Answer:
------------------------
{user_answer}
------------------------

Evaluate the candidate's answer.

Consider:
- Technical correctness
- Relevance
- Clarity
- Communication
- Completeness
- Whether the answer uses the candidate's actual experience

Return ONLY valid JSON.

Use exactly this format:

{{
    "score": 0,
    "strengths": [],
    "improvements": [],
    "feedback": "",
    "better_answer": ""
}}

Rules:
- Score from 0 to 10.
- Do not invent candidate experience.
- Keep feedback practical and suitable for an entry-level candidate.
- The better answer should be natural and easy to speak in an interview.
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        text = response.text.strip()

        if text.startswith("```json"):
            text = (
                text.replace("```json", "")
                .replace("```", "")
                .strip()
            )

        return json.loads(text)

    except Exception as e:
        print("Gemini Error:", e)

        return {
            "score": 0,
            "strengths": [],
            "improvements": [],
            "feedback": "Unable to evaluate the answer.",
            "better_answer": "",
        }