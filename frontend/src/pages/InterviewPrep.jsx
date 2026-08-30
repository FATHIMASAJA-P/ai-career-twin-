import { useState } from "react";
import api from "../services/api";

function InterviewPrep() {
  const [jobRole, setJobRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Store answers for each question
  const [answers, setAnswers] = useState({});

  // Track which question is currently generating an answer
  const [answerLoading, setAnswerLoading] = useState(null);

  // Generate interview questions
  const generateQuestions = async () => {
    if (!jobRole.trim()) {
      alert("Please enter a job role.");
      return;
    }

    try {
      setLoading(true);

      // Clear previous answers
      setAnswers({});

      const response = await api.post("/interview-prep", {
        job_role: jobRole,
      });

      console.log("INTERVIEW RESPONSE:", response.data);

      setQuestions(response.data.questions || []);

    } catch (error) {
      console.error(
        "Failed to generate interview questions",
        error
      );

      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  // Generate answer for one question
  const generateAnswer = async (question, index) => {
    try {
      setAnswerLoading(index);

      const response = await api.post("/interview-answer", {
        question: question,
      });

      console.log("INTERVIEW ANSWER:", response.data);

      setAnswers((previousAnswers) => ({
        ...previousAnswers,
        [index]: response.data.answer,
      }));

    } catch (error) {
      console.error(
        "Failed to generate interview answer",
        error
      );

      alert("Failed to generate answer.");
    } finally {
      setAnswerLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-cyan-400 mb-2">
          🎤 AI Interview Preparation
        </h1>

        <p className="text-gray-400">
          Practice interview questions personalized to your
          resume, skills, and target job role.
        </p>

      </div>


      {/* Job Role Input */}

      <div className="bg-slate-800 rounded-2xl p-6 shadow-lg mb-8">

        <label className="block text-white font-semibold mb-3">
          Target Job Role
        </label>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="Example: Python Developer"
            className="flex-1 bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
          />

          <button
            onClick={generateQuestions}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            {loading
              ? "Generating..."
              : "Generate Questions"}
          </button>

        </div>

      </div>


      {/* Loading */}

      {loading && (
        <div className="bg-slate-800 rounded-xl p-6 text-center">

          <p className="text-cyan-400">
            🤖 AI is preparing your interview questions...
          </p>

        </div>
      )}


      {/* Questions */}

      {!loading && questions.length > 0 && (

        <div className="space-y-5">

          <h2 className="text-2xl font-bold text-white mb-4">
            Interview Questions
          </h2>

          {questions.map((item, index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 shadow-lg"
            >

              {/* Question Header */}

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

                <span className="text-gray-400 text-sm">
                  Question {index + 1}
                </span>

                <div className="flex gap-2">

                  {/* Category */}

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.category === "Technical"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : item.category === "HR"
                        ? "bg-pink-500/20 text-pink-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {item.category}
                  </span>

                  {/* Difficulty */}

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-400"
                        : item.difficulty === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.difficulty}
                  </span>

                </div>

              </div>


              {/* Question */}

              <h3 className="text-white text-lg font-semibold leading-relaxed">
                {item.question}
              </h3>


              {/* Show Answer Button */}

              <button
                onClick={() =>
                  generateAnswer(item.question, index)
                }
                disabled={answerLoading === index}
                className="mt-5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                {answerLoading === index
                  ? "🤖 Generating Answer..."
                  : answers[index]
                  ? "🔄 Regenerate Answer"
                  : "💡 Show Answer"}
              </button>


              {/* AI Answer */}

              {answers[index] && (

                <div className="mt-5 bg-slate-900 border border-cyan-500/20 rounded-xl p-5">

                  <h4 className="text-cyan-400 font-semibold mb-3">
                    💡 Suggested Answer
                  </h4>

                  <p className="text-gray-300 leading-7 whitespace-pre-line">
                    {answers[index]}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      )}


      {/* Empty State */}

      {!loading && questions.length === 0 && (

        <div className="bg-slate-800 rounded-2xl p-10 text-center">

          <div className="text-5xl mb-4">
            🎤
          </div>

          <h2 className="text-xl font-bold text-white">
            Ready for your interview?
          </h2>

          <p className="text-gray-400 mt-2">
            Enter a job role above and let AI generate
            personalized interview questions.
          </p>

        </div>

      )}

    </div>
  );
}

export default InterviewPrep;