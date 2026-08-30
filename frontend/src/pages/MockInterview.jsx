import { useState } from "react";
import api from "../services/api";

function MockInterview() {
  const [question, setQuestion] = useState(
    "Tell me about yourself."
  );

  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const evaluateAnswer = async () => {
    if (!answer.trim()) {
      alert("Please enter your answer.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await api.post(
        "/mock-interview/evaluate",
        {
          question: question,
          user_answer: answer,
        }
      );

      console.log("INTERVIEW FEEDBACK:", response.data);

      setResult(response.data);
    } catch (error) {
      console.error(
        "Failed to evaluate answer",
        error
      );

      alert("Failed to evaluate your answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-cyan-400 mb-2">
          🎤 AI Mock Interview
        </h1>

        <p className="text-gray-400">
          Practice answering interview questions and get
          AI-powered feedback.
        </p>

      </div>


      {/* Question */}

      <div className="bg-slate-800 rounded-2xl p-6 shadow-lg mb-6">

        <p className="text-gray-400 text-sm mb-2">
          Interview Question
        </p>

        <h2 className="text-white text-xl font-semibold leading-relaxed">
          {question}
        </h2>

      </div>


      {/* Answer */}

      <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

        <label className="block text-white font-semibold mb-3">
          Your Answer
        </label>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your interview answer here..."
          rows={7}
          className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-4 focus:outline-none focus:border-cyan-400 resize-none"
        />

        <button
          onClick={evaluateAnswer}
          disabled={loading}
          className="mt-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          {loading
            ? "🤖 Evaluating..."
            : "Submit Answer"}
        </button>

      </div>


      {/* AI Feedback */}

      {result && (

        <div className="mt-8 space-y-6">

          {/* Score */}

          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg text-center">

            <p className="text-gray-400">
              Interview Score
            </p>

            <p className="text-6xl font-bold text-cyan-400 mt-2">
              {result.score}
              <span className="text-2xl text-gray-500">
                /10
              </span>
            </p>

          </div>


          {/* Strengths */}

          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-green-400 mb-4">
              ✅ What You Did Well
            </h2>

            <ul className="space-y-2">

              {(result.strengths || []).map(
                (item, index) => (
                  <li
                    key={index}
                    className="text-gray-300"
                  >
                    ✓ {item}
                  </li>
                )
              )}

            </ul>

          </div>


          {/* Improvements */}

          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              💡 Areas to Improve
            </h2>

            <ul className="space-y-2">

              {(result.improvements || []).map(
                (item, index) => (
                  <li
                    key={index}
                    className="text-gray-300"
                  >
                    → {item}
                  </li>
                )
              )}

            </ul>

          </div>


          {/* Feedback */}

          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-cyan-400 mb-3">
              🤖 AI Feedback
            </h2>

            <p className="text-gray-300 leading-7">
              {result.feedback}
            </p>

          </div>


          {/* Better Answer */}

          {result.better_answer && (

            <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

              <h2 className="text-xl font-bold text-pink-400 mb-3">
                🎯 Suggested Better Answer
              </h2>

              <p className="text-gray-300 leading-7 whitespace-pre-line">
                {result.better_answer}
              </p>

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default MockInterview;