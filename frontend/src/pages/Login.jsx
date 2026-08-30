import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", response.data.access_token);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="auth-scene">
      <div className="auth-orbit auth-orbit--one" />
      <div className="auth-orbit auth-orbit--two" />
      <div className="auth-card">
        <div className="auth-brand"><span className="brand-mark__symbol">↗</span> AI Career<span>Twin</span></div>

          <h1 className="text-4xl font-bold text-cyan-400 text-center mb-2">
          Welcome back
        </h1>

          <p className="text-gray-400 text-center mb-8">
          Your next opportunity starts here.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

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

          <div>
            <label className="block text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
            />
            <div className="text-right mt-2">
  <Link
    to="/forgot-password"
    className="text-cyan-400 hover:text-cyan-300 text-sm"
  >
    Forgot Password?
  </Link>
</div>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;