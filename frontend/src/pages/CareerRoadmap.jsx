import { useEffect, useState } from "react";
import api from "../services/api";

function CareerRoadmap() {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchRoadmap();
  }, []);

  // Fetch AI-generated roadmap
  const fetchRoadmap = async () => {
    try {
      setLoading(true);

      const response = await api.get("/career-roadmap");

      console.log("ROADMAP RESPONSE:", response.data);

      setRoadmap(response.data);
    } catch (error) {
      console.error("Failed to fetch roadmap", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark roadmap step as completed
  const markCompleted = async (step) => {
    try {
      setUpdating(step);

      const response = await api.put("/career-roadmap", {
        step: step,
        status: "Completed",
      });

      console.log("UPDATED ROADMAP:", response.data);

      setRoadmap(response.data.roadmap);
    } catch (error) {
      console.error("Failed to update roadmap", error);
    } finally {
      setUpdating(null);
    }
  };

  // Calculate completed steps
  const completedCount = roadmap.filter(
    (item) => item.status === "Completed"
  ).length;

  // Calculate progress percentage
  const progress =
    roadmap.length > 0
      ? Math.round((completedCount / roadmap.length) * 100)
      : 0;

  return (
    <div className="max-w-5xl mx-auto">

      {/* Page Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-cyan-400 mb-2">
          🚀 AI Career Roadmap
        </h1>

        <p className="text-gray-400">
          Personalized learning roadmap based on your profile and resume.
        </p>

      </div>

      {/* Loading */}
      {loading ? (
        <div className="bg-slate-800 rounded-2xl p-8 text-center">

          <p className="text-cyan-400 text-lg">
            🤖 Generating your personalized career roadmap...
          </p>

        </div>
      ) : (

        <>
          {/* Career Progress */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-8 shadow">

            <div className="flex items-center justify-between mb-3">

              <h2 className="text-xl font-bold text-white">
                📈 Career Progress
              </h2>

              <span className="text-cyan-400 font-semibold">
                {completedCount} / {roadmap.length} Completed
              </span>

            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 rounded-full h-3">

              <div
                className="bg-cyan-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              ></div>

            </div>

            <p className="text-gray-400 mt-3">
              {progress}% of your career roadmap completed
            </p>

          </div>

          {/* Roadmap */}
          <div className="space-y-4">

            {roadmap.length === 0 ? (

              <div className="bg-slate-800 rounded-xl p-6 text-center">
                <p className="text-gray-400">
                  No career roadmap available.
                </p>
              </div>

            ) : (

              roadmap.map((item, index) => (

                <div
                  key={index}
                  className="bg-slate-800 rounded-xl p-6 shadow hover:bg-slate-750 transition"
                >

                  <div className="flex items-center justify-between gap-4">

                    {/* Step Information */}
                    <div className="flex-1">

                      <p className="text-gray-400 text-sm">
                        Step {index + 1}
                      </p>

                      <h2 className="text-white text-lg font-semibold mt-1">
                        {item.step}
                      </h2>

                    </div>

                    {/* Status + Button */}
                    <div className="flex items-center gap-3">

                      {/* Status */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                          item.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : item.status === "In Progress"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-slate-700 text-gray-400"
                        }`}
                      >
                        {item.status}
                      </span>

                      {/* Mark Completed */}
                      {item.status !== "Completed" && (

                        <button
                          onClick={() => markCompleted(item.step)}
                          disabled={updating === item.step}
                          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition"
                        >
                          {updating === item.step
                            ? "Updating..."
                            : "Mark Completed"}
                        </button>

                      )}

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </>

      )}

    </div>
  );
}

export default CareerRoadmap;