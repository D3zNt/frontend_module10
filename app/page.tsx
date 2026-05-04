"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.payload?.token);
      router.push("/homepage");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl -top-10 -left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -bottom-10 -right-10"></div>

      <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
          >
            Sign In
          </button>
        </form>

        {message && (
          <div className="mt-6 text-sm text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2">
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}