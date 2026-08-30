import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

import {
  FaFileUpload,
  FaRobot,
  FaBriefcase,
  FaChartLine,
  FaUserCheck,
  FaTasks,
  FaRocket,
  FaUser,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  // Profile data
  const [profile, setProfile] = useState({
    name: "",
    career_goal: "",
    education: "",
    skills: "",
  });

  // Dashboard data
  const [dashboardData, setDashboardData] = useState({
    progress: 0,
    resume_uploaded: false,
    career_analysis_completed: false,
    job_match_completed: false,
    ats_completed: false,

    // Career Roadmap
    roadmap_completed: 0,
    roadmap_total: 0,
    roadmap_progress: 0,
  });

  // Fetch profile and dashboard when page loads
  useEffect(() => {
    fetchProfile();
    fetchDashboard();
  }, []);

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");

      setProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  // Fetch dashboard information
  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      console.log("DASHBOARD RESPONSE:", response.data);

      setDashboardData(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard", error);
    }
  };

  // Download AI report
  const downloadReport = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/download-report",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "AI_Career_Report.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download report", error);
    }
  };

  return (
    <div className="dashboard-page min-h-screen p-8">

      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HERO SECTION
        ====================================================== */}

        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-white">
            👋 Welcome, {profile?.name || "User"}
          </h1>

          <p className="text-cyan-100 mt-2 text-lg">
            {profile?.career_goal ||
              "Complete your profile to get started."}
          </p>

          {/* Education and Skills */}

          <div className="mt-6 text-white">

            <p>
              <strong>🎓 Education:</strong>{" "}
              {profile?.education || "Not Added"}
            </p>

            <p className="mt-2">
              <strong>🛠 Skills:</strong>{" "}
              {profile?.skills || "Not Added"}
            </p>

          </div>

          <p className="text-cyan-100 mt-3 text-lg max-w-2xl">
            Analyze your resume, discover career opportunities,
            compare job descriptions, and improve your ATS score
            using AI.
          </p>

          {/* Hero Buttons */}

          <div className="mt-6 flex flex-wrap gap-4">

            {/* Upload Resume */}

            <button
              onClick={() => navigate("/upload")}
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Upload Resume
            </button>

            {/* Download Report */}

            <button
              onClick={downloadReport}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              ⬇ Download Report
            </button>

          </div>

        </div>


        {/* =====================================================
            CAREER PROGRESS
        ====================================================== */}

        <div className="bg-slate-800 rounded-2xl p-6 mt-8 shadow-lg">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold text-white">
              📈 Career Progress
            </h2>

            <span className="text-cyan-400 font-semibold">
              {dashboardData.progress}% Complete
            </span>

          </div>

          {/* Main Progress Bar */}

          <div className="w-full bg-slate-700 rounded-full h-3 mt-5">

            <div
              className="bg-cyan-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  dashboardData.progress,
                  100
                )}%`,
              }}
            ></div>

          </div>


          {/* Four Main Progress Cards */}

          <div className="grid md:grid-cols-4 gap-4 mt-6">

            {/* Resume */}

            <div className="bg-slate-900 rounded-xl p-4">

              <h3 className="text-white font-semibold">
                Resume
              </h3>

              <p
                className={`mt-2 ${
                  dashboardData.resume_uploaded
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {dashboardData.resume_uploaded
                  ? "✔ Completed"
                  : "⏳ Pending"}
              </p>

            </div>


            {/* Career Analysis */}

            <div className="bg-slate-900 rounded-xl p-4">

              <h3 className="text-white font-semibold">
                Career Analysis
              </h3>

              <p
                className={`mt-2 ${
                  dashboardData.career_analysis_completed
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {dashboardData.career_analysis_completed
                  ? "✔ Completed"
                  : "⏳ Pending"}
              </p>

            </div>


            {/* Job Match */}

            <div className="bg-slate-900 rounded-xl p-4">

              <h3 className="text-white font-semibold">
                Job Match
              </h3>

              <p
                className={`mt-2 ${
                  dashboardData.job_match_completed
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {dashboardData.job_match_completed
                  ? "✔ Completed"
                  : "⏳ Pending"}
              </p>

            </div>


            {/* ATS Score */}

            <div className="bg-slate-900 rounded-xl p-4">

              <h3 className="text-white font-semibold">
                ATS Score
              </h3>

              <p
                className={`mt-2 ${
                  dashboardData.ats_completed
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {dashboardData.ats_completed
                  ? "✔ Completed"
                  : "⏳ Pending"}
              </p>

            </div>


            {/* =================================================
                CAREER ROADMAP PROGRESS
            ================================================== */}

            <div className="bg-slate-900 rounded-xl p-5 md:col-span-4">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-white font-semibold text-lg">
                    🚀 Career Roadmap
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {dashboardData.roadmap_completed} /{" "}
                    {dashboardData.roadmap_total} steps completed
                  </p>

                </div>

                <span className="text-cyan-400 font-bold text-xl">
                  {dashboardData.roadmap_progress}%
                </span>

              </div>


              {/* Roadmap Progress Bar */}

              <div className="w-full bg-slate-700 rounded-full h-3 mt-4">

                <div
                  className="bg-cyan-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      dashboardData.roadmap_progress,
                      100
                    )}%`,
                  }}
                ></div>

              </div>


              {/* View Roadmap */}

              <button
                onClick={() => navigate("/career-roadmap")}
                className="mt-4 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                View Career Roadmap →
              </button>

            </div>

          </div>

        </div>


        {/* =====================================================
            QUICK STATS
        ====================================================== */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          {/* Resume */}

          <div className="bg-slate-800 rounded-xl p-6 text-center shadow">

            <FaUserCheck className="text-4xl text-green-400 mx-auto mb-3" />

            <h2 className="text-white font-semibold">
              Resume
            </h2>

            <p
              className={`mt-2 ${
                dashboardData.resume_uploaded
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              {dashboardData.resume_uploaded
                ? "Uploaded ✅"
                : "Ready to Upload"}
            </p>

          </div>


          {/* Career AI */}

          <div className="bg-slate-800 rounded-xl p-6 text-center shadow">

            <FaRobot className="text-4xl text-cyan-400 mx-auto mb-3" />

            <h2 className="text-white font-semibold">
              Career AI
            </h2>

            <p
              className={`mt-2 ${
                dashboardData.career_analysis_completed
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              {dashboardData.career_analysis_completed
                ? "Analysis Completed ✅"
                : "AI Guidance"}
            </p>

          </div>


          {/* Job Match */}

          <div className="bg-slate-800 rounded-xl p-6 text-center shadow">

            <FaBriefcase className="text-4xl text-yellow-400 mx-auto mb-3" />

            <h2 className="text-white font-semibold">
              Job Match
            </h2>

            <p
              className={`mt-2 ${
                dashboardData.job_match_completed
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              {dashboardData.job_match_completed
                ? "Completed ✅"
                : "Compare Resume"}
            </p>

          </div>


          {/* ATS */}

          <div className="bg-slate-800 rounded-xl p-6 text-center shadow">

            <FaChartLine className="text-4xl text-pink-400 mx-auto mb-3" />

            <h2 className="text-white font-semibold">
              ATS Score
            </h2>

            <p
              className={`mt-2 ${
                dashboardData.ats_completed
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              {dashboardData.ats_completed
                ? "Completed ✅"
                : "Optimize Resume"}
            </p>

          </div>

        </div>


        {/* =====================================================
            CAREER TOOLS
        ====================================================== */}

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">
          🚀 Career Tools
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <DashboardCard
            icon={<FaUser />}
            title="My Profile"
            description="View and update your profile."
            link="/profile"
          />

          <DashboardCard
            icon={<FaFileUpload />}
            title="Resume Upload"
            description="Upload and manage your resume."
            link="/upload"
          />

          <DashboardCard
            icon={<FaRobot />}
            title="Career Analysis"
            description="Generate AI-powered career insights."
            link="/career-analysis"
          />

          <DashboardCard
            icon={<FaBriefcase />}
            title="Job Match"
            description="Compare your resume with job descriptions."
            link="/job-match"
          />

          <DashboardCard
            icon={<FaChartLine />}
            title="ATS Score"
            description="Check ATS compatibility."
            link="/ats-score"
          />

          <DashboardCard
            icon={<FaRocket />}
            title="Career Roadmap"
            description="Track your AI career journey."
            link="/career-roadmap"
          />

          <DashboardCard
            icon={<FaTasks />}
            title="History"
            description="View previous analyses."
            link="/history"
          />

           <DashboardCard
    icon={<FaTasks />}
    title="Interview Prep"
    description="Practice AI-generated interview questions."
    link="/interview-prep"
  />
  <DashboardCard
  icon={<FaUserCheck />}
  title="Mock Interview"
  description="Practice interviews and get AI feedback."
  link="/mock-interview"
/>

        </div>


        {/* =====================================================
            RECENT ACTIVITY
        ====================================================== */}

        <div className="bg-slate-800 rounded-2xl mt-12 p-8 shadow">

          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaTasks />
            Recent Activity
          </h2>

          <ul className="mt-5 space-y-3 text-gray-300">

            <li>
              {dashboardData.resume_uploaded
                ? "✅ Resume uploaded successfully."
                : "📄 Upload your latest resume."}
            </li>

            <li>
              {dashboardData.career_analysis_completed
                ? "✅ AI Career Analysis completed."
                : "🤖 Generate AI Career Analysis."}
            </li>

            <li>
              {dashboardData.job_match_completed
                ? "✅ Job Match analysis completed."
                : "🎯 Match your resume with a Job Description."}
            </li>

            <li>
              {dashboardData.ats_completed
                ? "✅ ATS Score generated."
                : "📊 Check your ATS Score."}
            </li>

            <li>
              {dashboardData.roadmap_total > 0
                ? `🚀 Career Roadmap: ${dashboardData.roadmap_completed}/${dashboardData.roadmap_total} steps completed.`
                : "🚀 Generate your Career Roadmap."}
            </li>

          </ul>


          <div className="mt-8 flex items-center gap-3 text-cyan-400">

            <FaRocket />

            <span>
              Keep improving your profile to increase your job opportunities.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;