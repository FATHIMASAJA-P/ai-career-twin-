import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-8">
        AI Career Twin
      </h2>

      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-cyan-400">
          📊 Dashboard
        </Link>

        <Link to="/upload" className="block hover:text-cyan-400">
          📄 Upload Resume
        </Link>

        <Link to="/career-analysis" className="block hover:text-cyan-400">
          🤖 Career Analysis
        </Link>

        <Link to="/job-match" className="block hover:text-cyan-400">
          🎯 Job Match
        </Link>

        <Link to="/profile" className="block hover:text-cyan-400">
          👤 Profile
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;