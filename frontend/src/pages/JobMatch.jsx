import { useState } from "react";
import {
  FaBriefcase,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
} from "react-icons/fa";
import { MdOutlineDescription, MdSchool } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../services/api";

function JobMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/job-match", {
        job_description: jobDescription,
      });

      setResult(response.data.analysis);

      toast.success("Job matching completed!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail || "Job matching failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl p-8 shadow-lg">

          <div className="flex items-center gap-4">

            <FaBriefcase className="text-5xl text-white" />

            <div>
              <h1 className="text-4xl font-bold text-white">
                AI Resume Job Match
              </h1>

              <p className="text-cyan-100 mt-2">
                Compare your resume with a job description and receive
                AI-powered matching insights.
              </p>
            </div>

          </div>

        </div>


        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-800 rounded-xl p-6">

            <MdOutlineDescription className="text-4xl text-cyan-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              Paste Job Description
            </h2>

            <p className="text-gray-400 mt-2">
              Copy and paste any job description from LinkedIn,
              Indeed, or other job portals.
            </p>

          </div>


          <div className="bg-slate-800 rounded-xl p-6">

            <FaSearch className="text-4xl text-yellow-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              AI Comparison
            </h2>

            <p className="text-gray-400 mt-2">
              Gemini AI compares your resume with the job
              requirements and finds gaps.
            </p>

          </div>


          <div className="bg-slate-800 rounded-xl p-6">

            <FaCheckCircle className="text-4xl text-green-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              Smart Suggestions
            </h2>

            <p className="text-gray-400 mt-2">
              Receive recommendations to improve your chances
              of getting shortlisted.
            </p>

          </div>

        </div>


        {/* Job Description Input */}
        <div className="mt-10 bg-slate-800 rounded-2xl p-8 shadow-lg">

          <h2 className="text-2xl text-cyan-400 font-bold mb-5">
            Job Description
          </h2>

          <textarea
            rows="12"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full bg-slate-900 text-white border border-slate-700 rounded-xl p-5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            onClick={handleMatch}
            disabled={loading}
            className="mt-6 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            {loading ? "Matching..." : "Match Resume"}
          </button>

        </div>


        {/* Result */}
        {result && (
          <div className="mt-10 space-y-6">

            {/* Match Score */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <h2 className="text-3xl font-bold text-cyan-400 mb-8">
                🎯 Job Match Score
              </h2>

              <div className="flex flex-col md:flex-row items-center gap-10">

                <div className="w-48 h-48 rounded-full border-8 border-cyan-500 flex flex-col items-center justify-center">

                  <span className="text-5xl font-bold text-white">
                    {result.match_score}
                  </span>

                  <span className="text-gray-400">
                    / 100
                  </span>

                </div>


                <div className="flex-1 w-full">

                  <h3 className="text-2xl font-bold text-white">
                    Resume Compatibility
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Your resume matches this job by{" "}
                    <span className="text-cyan-400 font-bold">
                      {result.match_score}%
                    </span>
                    .
                  </p>

                  <div className="w-full bg-slate-700 rounded-full h-4 mt-6">

                    <div
                      className="bg-cyan-500 h-4 rounded-full transition-all duration-700"
                      style={{
                        width: `${result.match_score}%`,
                      }}
                    ></div>

                  </div>

                  

                </div>

              </div>

            </div>


            {/* Matching Skills */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <FaCheckCircle className="text-3xl text-green-400" />

                <h2 className="text-2xl font-bold text-white">
                  Matching Skills
                </h2>

              </div>

              <div className="flex flex-wrap gap-3 mt-5">

                {result.matching_skills?.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-2 rounded-full"
                  >
                    ✓ {skill}
                  </span>

                ))}

              </div>

            </div>


            {/* Missing Skills */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <FaTimesCircle className="text-3xl text-red-400" />

                <h2 className="text-2xl font-bold text-white">
                  Missing Skills
                </h2>

              </div>

              <div className="flex flex-wrap gap-3 mt-5">

                {result.missing_skills?.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-full"
                  >
                    ✕ {skill}
                  </span>

                ))}

              </div>

            </div>


            {/* Resume Improvements */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <FaLightbulb className="text-3xl text-yellow-400" />

                <h2 className="text-2xl font-bold text-white">
                  Resume Improvements
                </h2>

              </div>

              <ul className="mt-5 space-y-3">

                {result.resume_improvements?.map(
                  (item, index) => (

                    <li
                      key={index}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-gray-300"
                    >
                      <span className="text-yellow-400 mr-2">
                        →
                      </span>

                      {item}

                    </li>

                  )
                )}

              </ul>

            </div>


            {/* Interview Preparation */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <FaBriefcase className="text-3xl text-purple-400" />

                <h2 className="text-2xl font-bold text-white">
                  Interview Preparation
                </h2>

              </div>

              <ul className="mt-5 space-y-3">

                {result.interview_preparation?.map(
                  (item, index) => (

                    <li
                      key={index}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-gray-300"
                    >
                      <span className="text-purple-400 mr-2">
                        🎤
                      </span>

                      {item}

                    </li>

                  )
                )}

              </ul>

            </div>


            {/* Learning Recommendations */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <MdSchool className="text-3xl text-cyan-400" />

                <h2 className="text-2xl font-bold text-white">
                  Learning Recommendations
                </h2>

              </div>

              <ul className="mt-5 space-y-3">

                {result.learning_recommendations?.map(
                  (item, index) => (

                    <li
                      key={index}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-gray-300"
                    >
                      <span className="text-cyan-400 mr-2">
                        📚
                      </span>

                      {item}

                    </li>

                  )
                )}

              </ul>

            </div>


            {/* Final Verdict */}
            <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold text-white">
                🎯 Final Verdict
              </h2>

              <p className="text-cyan-100 mt-4 leading-7">
                {result.final_verdict}
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default JobMatch;