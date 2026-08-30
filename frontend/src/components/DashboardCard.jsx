import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function DashboardCard({ icon, title, description, link }) {
  return (
    <Link
      to={link}
      className="
        group
        bg-slate-800
        border border-slate-700
        rounded-2xl
        p-6
        shadow-lg
        hover:shadow-cyan-500/30
        hover:border-cyan-400
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-3xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-white mt-6">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-400 mt-3 leading-relaxed">
        {description}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-cyan-400 font-medium">
          Explore
        </span>

        <FaArrowRight className="text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" />
      </div>
    </Link>
  );
}

export default DashboardCard;