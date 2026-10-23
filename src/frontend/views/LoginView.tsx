"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobNex } from "@/context/JobNexContext";
import { UserRole } from "@/domain/types";
import { Sparkles, Eye, EyeOff, Lock, Mail, CheckCircle2 } from "lucide-react";

export function LoginView() {
  const router = useRouter();
  const { login } = useJobNex();

  const [email, setEmail] = useState("sandeep@jobnex.ai");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>("JOB_SEEKER");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    setNotification(`Logged in successfully as ${selectedRole === "JOB_SEEKER" ? "Job Seeker" : selectedRole === "RECRUITER" ? "Recruiter" : "Admin"}!`);
    setTimeout(() => {
      router.push("/jobs");
    }, 800);
  };

  const handleQuickDemo = (role: UserRole, demoEmail: string) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    setPassword("demoPass2025!");
    login(demoEmail, role);
    setNotification(`Switched to demo ${role} account!`);
    setTimeout(() => {
      router.push(role === "RECRUITER" ? "/dashboard" : "/jobs");
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-violet items-center justify-center text-white shadow-md shadow-brand-500/20 mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-xs text-slate-700">Login to continue your smart career journey</p>
        </div>

        {notification && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{notification}</span>
          </div>
        )}

        {/* 1-Click Fast Demo Switcher */}
        <div className="p-3 bg-brand-50/70 rounded-2xl border border-brand-100 space-y-2">
          <p className="text-[11px] font-bold text-brand-900 uppercase tracking-wide">
            Instant 1-Click Role Logins:
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo("JOB_SEEKER", "candidate@jobnex.ai")}
              className="px-2 py-1.5 rounded-lg bg-white border border-brand-200 text-brand-700 text-[11px] font-bold hover:bg-brand-600 hover:text-white transition-all shadow-2xs"
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("RECRUITER", "recruiter@jobnex.ai")}
              className="px-2 py-1.5 rounded-lg bg-white border border-brand-200 text-brand-700 text-[11px] font-bold hover:bg-brand-600 hover:text-white transition-all shadow-2xs"
            >
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("ADMIN", "admin@jobnex.ai")}
              className="px-2 py-1.5 rounded-lg bg-white border border-brand-200 text-brand-700 text-[11px] font-bold hover:bg-brand-600 hover:text-white transition-all shadow-2xs"
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email or Phone</label>
            <div className="flex items-center px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-brand-500 focus-within:bg-white transition-all">
              <Mail className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full text-xs text-slate-900 outline-none bg-transparent font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="flex items-center px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-brand-500 focus-within:bg-white transition-all">
              <Lock className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs text-slate-900 outline-none bg-transparent font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="font-semibold text-brand-600 hover:text-brand-700">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3 rounded-xl shadow-md shadow-brand-500/20 text-xs transition-all active:scale-[0.99]"
          >
            Login
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] font-bold text-slate-700 uppercase absolute">
            or
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleQuickDemo("JOB_SEEKER", "google.user@jobnex.ai")}
          className="w-full border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 py-2.5 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-2xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-xs text-slate-700">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold text-brand-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
