import { useState } from "react";
import {
  FaChartPie,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdOutlineInsights } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../services/api";

function ATSScore() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateATS = async () => {
    try {
      setLoading(true);

      const response = await api.post("/ats-score");

      setAnalysis(response.data.analysis);

      toast.success("ATS analysis generated successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to generate ATS score."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 shadow-lg">

          <div className="flex items-center gap-4">

            <FaChartPie className="text-5xl text-white" />

            <div>
              <h1 className="text-4xl font-bold text-white">
                ATS Resume Score
              </h1>

              <p className="text-green-100 mt-2">
                Analyze how ATS-friendly your resume is and receive
                AI-powered suggestions to improve it.
              </p>
            </div>

          </div>

          <button
            onClick={generateATS}
            disabled={loading}
            className="mt-8 bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 disabled:bg-gray-300 transition"
          >
            {loading ? "Analyzing..." : "Generate ATS Score"}
          </button>

        </div>


        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-800 rounded-xl p-6">

            <FaFileAlt className="text-4xl text-cyan-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              Resume Review
            </h2>

            <p className="text-gray-400 mt-2">
              AI scans your resume for formatting, content,
              keywords, and ATS compatibility.
            </p>

          </div>


          <div className="bg-slate-800 rounded-xl p-6">

            <MdOutlineInsights className="text-4xl text-yellow-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              ATS Insights
            </h2>

            <p className="text-gray-400 mt-2">
              Discover missing keywords and optimization
              opportunities.
            </p>

          </div>


          <div className="bg-slate-800 rounded-xl p-6">

            <FaCheckCircle className="text-4xl text-green-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              Improvement Tips
            </h2>

            <p className="text-gray-400 mt-2">
              Get practical suggestions to increase your ATS score.
            </p>

          </div>

        </div>


        {/* AI Result */}
        {analysis && (
          <div className="mt-10">

            {/* Score Card */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <h2 className="text-3xl font-bold text-green-400 mb-8">
                📊 Your ATS Score
              </h2>


              <div className="flex flex-col md:flex-row items-center gap-10">

                {/* Score */}
                <div className="w-48 h-48 rounded-full border-8 border-green-500 flex flex-col items-center justify-center">

                  <span className="text-5xl font-bold text-white">
                    {analysis.ats_score}
                  </span>

                  <span className="text-gray-400">
                    / 100
                  </span>

                </div>


                {/* Score Information */}
                <div className="flex-1 w-full">

                  <h3 className="text-2xl font-bold text-white">
                    ATS Compatibility
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Your resume received an ATS score of{" "}
                    <span className="text-green-400 font-bold">
                      {analysis.ats_score}/100
                    </span>
                    .
                  </p>


                  {/* Progress */}
                  <div className="w-full bg-slate-700 rounded-full h-4 mt-6">

                    <div
                      className="bg-green-500 h-4 rounded-full transition-all duration-700"
                      style={{
                        width: `${analysis.ats_score}%`,
                      }}
                    ></div>

                  </div>


                  <div className="flex justify-between px-1 text-sm text-gray-500 mt-2">

                    <span>0</span>
                    <span>50</span>
                    <span>100</span>

                  </div>

                </div>

              </div>

            </div>


            {/* Strengths */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mt-6">

              <div className="flex items-center gap-3">

                <FaCheckCircle className="text-3xl text-green-400" />

                <h2 className="text-2xl font-bold text-white">
                  💪 Resume Strengths
                </h2>

              </div>


              <ul className="mt-5 space-y-3">

                {analysis.strengths?.map((item, index) => (

                  <li
                    key={index}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-gray-300"
                  >
                    <span className="text-green-400 mr-2">
                      ✓
                    </span>

                    {item}

                  </li>

                ))}

              </ul>

            </div>


            {/* Missing Keywords */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mt-6">

              <div className="flex items-center gap-3">

                <FaExclamationTriangle className="text-3xl text-yellow-400" />

                <h2 className="text-2xl font-bold text-white">
                  🔑 Missing Keywords
                </h2>

              </div>


              <div className="flex flex-wrap gap-3 mt-5">

                {analysis.missing_keywords?.map(
                  (item, index) => (

                    <span
                      key={index}
                      className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-4 py-2 rounded-full"
                    >
                      {item}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* Improvements */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mt-6">

              <div className="flex items-center gap-3">

                <MdOutlineInsights className="text-3xl text-cyan-400" />

                <h2 className="text-2xl font-bold text-white">
                  📈 Resume Improvements
                </h2>

              </div>


              <ul className="mt-5 space-y-3">

                {analysis.resume_improvements?.map(
                  (item, index) => (

                    <li
                      key={index}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-gray-300"
                    >
                      <span className="text-cyan-400 mr-2">
                        →
                      </span>

                      {item}

                    </li>

                  )
                )}

              </ul>

            </div>


            {/* Final Verdict */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl shadow-lg p-8 mt-6">

              <h2 className="text-2xl font-bold text-white">
                🎯 Final Verdict
              </h2>

              <p className="text-cyan-100 mt-4 leading-7">
                {analysis.final_verdict}
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ATSScore;