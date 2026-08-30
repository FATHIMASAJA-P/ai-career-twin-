import { useEffect, useState } from "react";
import api from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/history");

      console.log("HISTORY RESPONSE:", response.data);

      setHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setLoading(false);
    }
  };

  // Parse stored JSON safely
  const parseResult = (result) => {
    try {
      return typeof result === "string"
        ? JSON.parse(result)
        : result;
    } catch (error) {
      return {};
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Page Header */}

        <h1 className="text-4xl font-bold text-cyan-400 mb-2">
          📜 Analysis History
        </h1>

        <p className="text-gray-400 mb-8">
          View your previous AI career analyses and recommendations.
        </p>


        {/* Loading */}

        {loading && (
          <div className="bg-slate-800 rounded-xl p-6">
            <p className="text-cyan-400">
              Loading your history...
            </p>
          </div>
        )}


        {/* Empty History */}

        {!loading && history.length === 0 && (
          <div className="bg-slate-800 rounded-xl p-8 text-center">

            <p className="text-gray-400 text-lg">
              No analysis history available yet.
            </p>

            <p className="text-gray-500 mt-2">
              Generate a Career Analysis, ATS Score, or Job Match
              to see it here.
            </p>

          </div>
        )}


        {/* History Cards */}

        {!loading && history.length > 0 && (

          <div className="space-y-6">

            {history.map((item) => {

              const result = parseResult(item.result);

              return (

                <div
                  key={item.id}
                  className="bg-slate-800 rounded-2xl p-6 shadow-lg"
                >

                  {/* Header */}

                  <div className="flex items-center justify-between mb-6">

                    <div>

                      <h2 className="text-xl font-bold text-white">
                        {item.analysis_type === "career_analysis"
                          ? "🤖 Career Analysis"
                          : item.analysis_type === "job_match"
                          ? "🎯 Job Match"
                          : item.analysis_type === "ats_score"
                          ? "📊 ATS Score"
                          : `📋 ${item.analysis_type}`}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        Analysis ID: {item.id}
                      </p>

                    </div>

                  </div>


                  {/* ==============================
                      CAREER ANALYSIS
                  ============================== */}

                  {item.analysis_type === "career_analysis" && (

                    <div>

                      {/* Readiness Score */}

                      <div className="bg-slate-900 rounded-xl p-5 mb-5">

                        <p className="text-gray-400">
                          Career Readiness Score
                        </p>

                        <p className="text-4xl font-bold text-cyan-400 mt-2">
                          {result.career_readiness_score ?? "N/A"}
                          <span className="text-lg text-gray-500">
                            {" "}/ 100
                          </span>
                        </p>

                      </div>


                      {/* Strengths */}

                      <div className="mb-5">

                        <h3 className="text-lg font-semibold text-green-400 mb-3">
                          💪 Strengths
                        </h3>

                        <ul className="space-y-2">

                          {(result.strengths || []).map(
                            (skill, index) => (
                              <li
                                key={index}
                                className="text-gray-300"
                              >
                                ✓ {skill}
                              </li>
                            )
                          )}

                        </ul>

                      </div>


                      {/* Missing Skills */}

                      <div className="mb-5">

                        <h3 className="text-lg font-semibold text-red-400 mb-3">
                          📚 Missing Skills
                        </h3>

                        <ul className="space-y-2">

                          {(result.missing_skills || []).map(
                            (skill, index) => (
                              <li
                                key={index}
                                className="text-gray-300"
                              >
                                • {skill}
                              </li>
                            )
                          )}

                        </ul>

                      </div>


                      {/* Learning Roadmap */}

                      <div className="mb-5">

                        <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                          🗺 Learning Roadmap
                        </h3>

                        <ol className="space-y-2">

                          {(result.learning_roadmap || []).map(
                            (step, index) => (
                              <li
                                key={index}
                                className="text-gray-300"
                              >
                                {index + 1}. {step}
                              </li>
                            )
                          )}

                        </ol>

                      </div>


                      {/* Recommended Roles */}

                      <div className="mb-5">

                        <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                          💼 Recommended Job Roles
                        </h3>

                        <div className="flex flex-wrap gap-2">

                          {(result.recommended_job_roles || []).map(
                            (role, index) => (
                              <span
                                key={index}
                                className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm"
                              >
                                {role}
                              </span>
                            )
                          )}

                        </div>

                      </div>


                      {/* Mentor Advice */}

                      {result.mentor_advice && (

                        <div className="bg-slate-900 rounded-xl p-5">

                          <h3 className="text-lg font-semibold text-pink-400 mb-2">
                            🧠 Mentor Advice
                          </h3>

                          <p className="text-gray-300 leading-7">
                            {result.mentor_advice}
                          </p>

                        </div>

                      )}

                    </div>

                  )}


                  {/* ==============================
                      ATS SCORE
                  ============================== */}

                  {item.analysis_type === "ats_score" && (

                    <div>

                      <div className="bg-slate-900 rounded-xl p-5 mb-5">

                        <p className="text-gray-400">
                          ATS Score
                        </p>

                        <p className="text-4xl font-bold text-cyan-400 mt-2">
                          {result.ats_score ?? "N/A"}
                          <span className="text-lg text-gray-500">
                            {" "}/ 100
                          </span>
                        </p>

                      </div>


                      <h3 className="text-lg font-semibold text-green-400 mb-3">
                        💪 Strengths
                      </h3>

                      <ul className="space-y-2 mb-5">

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


                      <h3 className="text-lg font-semibold text-red-400 mb-3">
                        🔍 Missing Keywords
                      </h3>

                      <ul className="space-y-2 mb-5">

                        {(result.missing_keywords || []).map(
                          (item, index) => (
                            <li
                              key={index}
                              className="text-gray-300"
                            >
                              • {item}
                            </li>
                          )
                        )}

                      </ul>


                      <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                        ✨ Resume Improvements
                      </h3>

                      <ul className="space-y-2">

                        {(result.resume_improvements || []).map(
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

                  )}


                  {/* ==============================
                      JOB MATCH
                  ============================== */}

                  {item.analysis_type === "job_match" && (

                    <div>

                      <div className="bg-slate-900 rounded-xl p-5 mb-5">

                        <p className="text-gray-400">
                          Job Match Score
                        </p>

                        <p className="text-4xl font-bold text-cyan-400 mt-2">
                          {result.match_score ?? "N/A"}
                          <span className="text-lg text-gray-500">
                            {" "}/ 100
                          </span>
                        </p>

                      </div>


                      <h3 className="text-lg font-semibold text-green-400 mb-3">
                        ✓ Matching Skills
                      </h3>

                      <ul className="space-y-2 mb-5">

                        {(result.matching_skills || []).map(
                          (skill, index) => (
                            <li
                              key={index}
                              className="text-gray-300"
                            >
                              ✓ {skill}
                            </li>
                          )
                        )}

                      </ul>


                      <h3 className="text-lg font-semibold text-red-400 mb-3">
                        ✕ Missing Skills
                      </h3>

                      <ul className="space-y-2 mb-5">

                        {(result.missing_skills || []).map(
                          (skill, index) => (
                            <li
                              key={index}
                              className="text-gray-300"
                            >
                              • {skill}
                            </li>
                          )
                        )}

                      </ul>


                      <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                        ✨ Resume Improvements
                      </h3>

                      <ul className="space-y-2 mb-5">

                        {(result.resume_improvements || []).map(
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


                      <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                        🎤 Interview Preparation
                      </h3>

                      <ul className="space-y-2">

                        {(result.interview_preparation || []).map(
                          (item, index) => (
                            <li
                              key={index}
                              className="text-gray-300"
                            >
                              • {item}
                            </li>
                          )
                        )}

                      </ul>

                    </div>

                  )}

                </div>

              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}

export default History;