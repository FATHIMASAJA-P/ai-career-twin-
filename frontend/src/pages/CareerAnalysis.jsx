import { useState } from "react";
import {
  FaRobot,
  FaLightbulb,
  FaCheckCircle,
  FaBriefcase,
  FaRoad,
} from "react-icons/fa";
import { MdOutlinePsychology } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import toast from "react-hot-toast";
import api from "../services/api";

function CareerAnalysis() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateAnalysis = async () => {
    try {
      setLoading(true);

      const response = await api.post("/career-analysis");

      setAnalysis(response.data.analysis);

      toast.success("Career analysis generated successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to generate career analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    try {
      const response = await api.get("/download-report", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "AI_Career_Report.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download report.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-8 shadow-lg">

          <div className="flex items-center gap-4">

            <FaRobot className="text-5xl text-white" />

            <div>

              <h1 className="text-4xl font-bold text-white">
                AI Career Analysis
              </h1>

              <p className="text-cyan-100 mt-2">
                Discover career opportunities and improve your
                professional skills with AI.
              </p>

            </div>

          </div>


          <button
            onClick={generateAnalysis}
            disabled={loading}
            className="mt-8 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 disabled:bg-gray-300 transition"
          >
            {loading
              ? "Generating..."
              : "Generate Analysis"}
          </button>

        </div>


        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-800 rounded-xl p-6">

            <MdOutlinePsychology className="text-4xl text-cyan-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              AI Insights
            </h2>

            <p className="text-gray-400 mt-2">
              Gemini AI analyzes your resume and profile
              to provide personalized career guidance.
            </p>

          </div>


          <div className="bg-slate-800 rounded-xl p-6">

            <FaLightbulb className="text-4xl text-yellow-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              Recommendations
            </h2>

            <p className="text-gray-400 mt-2">
              Discover which skills you should improve
              for better career opportunities.
            </p>

          </div>


          <div className="bg-slate-800 rounded-xl p-6">

            <BsStars className="text-4xl text-pink-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              Career Growth
            </h2>

            <p className="text-gray-400 mt-2">
              Get a personalized roadmap for your
              career development.
            </p>

          </div>

        </div>


        {/* AI Result */}
        {analysis && (
          <div className="mt-10 space-y-6">

            {/* Career Readiness Score */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <h2 className="text-3xl font-bold text-cyan-400 mb-8">
                🤖 Career Readiness
              </h2>


              <div className="flex flex-col md:flex-row items-center gap-10">

                {/* Score */}
                <div className="w-48 h-48 rounded-full border-8 border-cyan-500 flex flex-col items-center justify-center">

                  <span className="text-5xl font-bold text-white">
  {Number(analysis.career_readiness_score) > 10
    ? (Number(analysis.career_readiness_score) / 10).toFixed(1)
    : Number(analysis.career_readiness_score).toFixed(1)}
</span>

<span className="text-gray-400">
  / 10
</span>

                </div>


                {/* Score Details */}
                <div className="flex-1 w-full">

                  <h3 className="text-2xl font-bold text-white">
                    Career Readiness Score
                  </h3>

                  <p className="text-gray-400 mt-2">
  Your current career readiness is{" "}
  <span className="text-cyan-400 font-bold">
    {Number(analysis.career_readiness_score) > 10
      ? (Number(analysis.career_readiness_score) / 10).toFixed(1)
      : Number(analysis.career_readiness_score).toFixed(1)}
    /10
  </span>
  .
</p>


                  <div className="w-full bg-slate-700 rounded-full h-4 mt-6 overflow-hidden">
  <div
    className="bg-cyan-500 h-4 rounded-full transition-all duration-700"
    style={{
      width: `${
        Number(analysis.career_readiness_score) > 10
          ? Number(analysis.career_readiness_score)
          : Number(analysis.career_readiness_score) * 10
      }%`,
    }}
  ></div>
</div>


                  <div className="flex justify-between px-1 text-sm text-gray-500 mt-2">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                  </div>

                </div>

              </div>

            </div>


            {/* Strengths */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <FaCheckCircle className="text-3xl text-green-400" />

                <h2 className="text-2xl font-bold text-white">
                  💪 Strengths
                </h2>

              </div>


              <ul className="mt-5 space-y-3">

                {analysis.strengths?.map(
                  (item, index) => (

                    <li
                      key={index}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-gray-300"
                    >

                      <span className="text-green-400 mr-2">
                        ✓
                      </span>

                      {item}

                    </li>

                  )
                )}

              </ul>

            </div>


            {/* Missing Skills */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <FaLightbulb className="text-3xl text-yellow-400" />

                <h2 className="text-2xl font-bold text-white">
                  🔑 Missing Skills
                </h2>

              </div>


              <div className="flex flex-wrap gap-3 mt-5">

                {analysis.missing_skills?.map(
                  (skill, index) => (

                    <span
                      key={index}
                      className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* Learning Roadmap */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <FaRoad className="text-3xl text-cyan-400" />

                <h2 className="text-2xl font-bold text-white">
                  🗺️ Learning Roadmap
                </h2>

              </div>


              <div className="mt-5 space-y-4">

                {analysis.learning_roadmap?.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-5"
                    >

                      <div className="flex items-start gap-4">

                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                          {index + 1}
                        </div>

                        <p className="text-gray-300 flex-1">
                          {item}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* Recommended Job Roles */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <FaBriefcase className="text-3xl text-purple-400" />

                <h2 className="text-2xl font-bold text-white">
                  💼 Recommended Job Roles
                </h2>

              </div>


              <div className="grid md:grid-cols-2 gap-4 mt-5">

                {analysis.recommended_job_roles?.map(
                  (role, index) => (

                    <div
                      key={index}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-5"
                    >

                      <div className="flex items-center gap-3">

                        <FaBriefcase className="text-purple-400" />

                        <span className="text-white font-semibold">
                          {role}
                        </span>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* Mentor Advice */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold text-white">
                💡 Mentor's Advice
              </h2>

              <p className="text-cyan-100 mt-4 leading-7">
                {analysis.mentor_advice}
              </p>

            </div>


            {/* Download Report */}
            <div className="flex justify-end">

              <button
                onClick={downloadReport}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                ⬇ Download PDF Report
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default CareerAnalysis;