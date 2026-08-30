import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
 

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
     

      const response = await api.post("/forgot-password", {
        email,
      });

      setMessage(response.data.message);

      // Development only
      
    } catch (error) {
      console.error("Forgot password error:", error);

      setMessage(
        error.response?.data?.detail ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-scene">
      <div className="auth-orbit auth-orbit--one" />
      <div className="auth-orbit auth-orbit--two" />

      <div className="auth-card">
        <div className="auth-brand"><span className="brand-mark__symbol">↗</span> AI Career<span>Twin</span></div>

        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-2">
          🔐 Forgot Password?
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Enter your email to reset your password.
        </p>

        <form
          onSubmit={handleForgotPassword}
          className="space-y-5"
        >

          <div>
            <label className="block text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Generating..."
              : "Send Reset Request"}
          </button>

        </form>

        {message && (
          <div className="mt-5 bg-slate-900 rounded-lg p-4">
            <p className="text-gray-300 text-sm">
              {message}
            </p>
          </div>
        )}

        {/* Development token */}
        
            

        <p className="text-gray-400 text-center mt-6">
          Remember your password?{" "}

          <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;