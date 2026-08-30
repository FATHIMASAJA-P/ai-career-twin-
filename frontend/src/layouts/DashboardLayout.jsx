import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to AI Career Twin 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl text-cyan-400 font-bold">
              📄 Resume Upload
            </h2>
            <p className="text-gray-300 mt-2">
              Upload and manage your resume.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl text-cyan-400 font-bold">
              🤖 Career Analysis
            </h2>
            <p className="text-gray-300 mt-2">
              Get AI-powered career recommendations.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl text-cyan-400 font-bold">
              🎯 Job Match
            </h2>
            <p className="text-gray-300 mt-2">
              Compare your resume with a job description.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl text-cyan-400 font-bold">
              👤 Profile
            </h2>
            <p className="text-gray-300 mt-2">
              View and update your profile.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;