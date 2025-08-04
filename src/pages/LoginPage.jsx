import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/User/login", { email });
      const user = response.data;

      localStorage.setItem("userId", user.UserId);
      localStorage.setItem("email", user.Email);
      localStorage.setItem("role", user.Role);
      localStorage.setItem("id", user.UserId);
      if (user.Role === "Admin") navigate("/dashboard");
      else if (user.Role === "User") navigate("/view-employee");
      else setError("Unknown user role");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your email.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-800 via-gray-900 to-black flex items-center justify-center px-4">
        <div className="flex bg-gray-900 text-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden">
            <div className="flex-[2] px-12 py-16 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">Welcome Back</h1>
                <p className="text-gray-400 text-sm mb-8 text-center">Login to continue</p>
                <form onSubmit={handleSubmit} className="w-full">
                    <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200 text-white font-semibold py-3 rounded-xl"
                    >
                    Login
                    </button>
                    {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                </form>
                <p className="mt-6 text-sm text-gray-500 text-center">
                    Not a member? <span className="text-purple-400 hover:underline cursor-pointer">Sign up</span>
                </p>
            </div>
            <div className="flex-[3] relative hidden md:block overflow-hidden">
                <img
                    src="/lynk.webp" 
                    alt="Login illustration"
                    className="absolute top-0 left-0 h-full w-full object-cover object-[75%_top]"
                    />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent to-gray-900"></div>
            </div>
            
        </div>
    </div>
  );
}

export default LoginPage;