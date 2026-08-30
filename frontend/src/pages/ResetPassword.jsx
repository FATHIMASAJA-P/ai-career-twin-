import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Invalid reset link.");
      return;
    }

    if (!password || !confirmPassword) {
      setMessage("Please enter your new password.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/reset-password", {
        token: token,
        new_password: password,
      });

      setMessage(response.data.message);
      setSuccess(true);

    } catch (error) {
      console.error("Reset password error:", error);

      setMessage(
        error.response?.data?.detail ||
        "Failed to reset password."
      );

      setSuccess(false);

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
          🔐 Reset Password
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Create a new password for your account.
        </p>

        {!success ? (
          <form
            onSubmit={handleResetPassword}
            className="space-y-5"
          >

            {/* New Password */}

            <div>
              <label className="block text-gray-300 mb-2">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Confirm Password */}

            <div>
              <label className="block text-gray-300 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Message */}

            {message && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm">
                  {message}
                </p>
              </div>
            )}

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
            </button>

          </form>
        ) : (
          <div className="text-center">

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-5 mb-6">

              <p className="text-green-400 font-semibold">
                ✅ {message}
              </p>

            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold"
            >
              Go to Login
            </button>

          </div>
        )}

        {!success && (
          <p className="text-gray-400 text-center mt-6">

            Remember your password?{" "}

            <Link
              to="/"
              className="text-cyan-400 hover:text-cyan-300"
            >
              Login
            </Link>

          </p>
        )}

      </div>

    </div>
  );
}

export default ResetPassword;