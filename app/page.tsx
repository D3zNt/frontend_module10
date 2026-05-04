"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.payload?.token);

      setMessage("Login successful!");
      setIsError(false);

      setTimeout(() => {
        router.push("/shop");
      }, 1000);

    } catch (err: any) {
      setMessage(err.message || "Login failed");
      setIsError(true);
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
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition"
          >
            Sign In
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 text-sm text-center rounded-lg py-2 border ${
              isError
                ? "text-red-400 bg-red-500/10 border-red-500/20"
                : "text-green-400 bg-green-500/10 border-green-500/20"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}