"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useJobNex } from "@/context/JobNexContext";
import { UserRole } from "@/domain/types";
import {
  Sparkles,
  Briefcase,
  Bot,
  BrainCircuit,
  BarChart3,
  Send,
  Zap,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  Menu,
  X,
  FileText,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, setUserRole, isLoggedIn, logout } = useJobNex();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
    { name: "Interview Prep", href: "/interview-prep", icon: BrainCircuit },
    { name: "Skill Gap", href: "/skill-gap", icon: BarChart3 },
    { name: "Auto-Apply", href: "/auto-apply", icon: Zap },
    { name: "Referral", href: "/cold-referral", icon: Send },
    { name: "Dashboard (ATS)", href: "/dashboard", icon: UserCheck },
    { name: "Resume & Privacy", href: "/resume-privacy", icon: ShieldCheck },
  ];

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-violet flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                  Job<span className="text-brand-600">Nex</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 font-semibold uppercase tracking-wider">
                  AI Pro
                </span>
              </div>
              <p className="text-[10px] text-slate-700 font-medium hidden sm:block">
                Your Next Job, Smarter!
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? "bg-brand-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-brand-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Role Switcher & Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Interactive Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:border-brand-500 transition-all text-xs font-semibold text-slate-700 shadow-xs"
                title="Switch role in real time to test Job Seeker, Recruiter, and Admin perspectives"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Role:</span>
                <span className="text-brand-600 font-bold">
                  {currentUser.role === "JOB_SEEKER"
                    ? "Job Seeker"
                    : currentUser.role === "RECRUITER"
                    ? "Recruiter"
                    : "Admin"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-700" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-medium text-slate-700">Switch Live Perspective</p>
                  </div>
                  <button
                    onClick={() => handleRoleChange("JOB_SEEKER")}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-brand-50 ${
                      currentUser.role === "JOB_SEEKER" ? "text-brand-600 font-bold bg-brand-50/50" : "text-slate-700"
                    }`}
                  >
                    <span>Job Seeker</span>
                    {currentUser.role === "JOB_SEEKER" && <span className="text-brand-600">✓</span>}
                  </button>
                  <button
                    onClick={() => handleRoleChange("RECRUITER")}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-brand-50 ${
                      currentUser.role === "RECRUITER" ? "text-brand-600 font-bold bg-brand-50/50" : "text-slate-700"
                    }`}
                  >
                    <span>Recruiter</span>
                    {currentUser.role === "RECRUITER" && <span className="text-brand-600">✓</span>}
                  </button>
                  <button
                    onClick={() => handleRoleChange("ADMIN")}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-brand-50 ${
                      currentUser.role === "ADMIN" ? "text-brand-600 font-bold bg-brand-50/50" : "text-slate-700"
                    }`}
                  >
                    <span>Admin</span>
                    {currentUser.role === "ADMIN" && <span className="text-brand-600">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Profile Avatar & Login */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  href="/resume-privacy"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-brand-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-200 ring-2 ring-brand-500/20">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden lg:inline">{currentUser.name.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-slate-700 hover:text-rose-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-slate-700 hover:text-brand-600 px-3 py-1.5 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-semibold text-slate-600">Active Role:</span>
              <span className="text-xs font-bold text-brand-600">{currentUser.role}</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleRoleChange("JOB_SEEKER")}
                className={`px-2 py-1 text-[11px] rounded font-semibold ${
                  currentUser.role === "JOB_SEEKER" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                Seeker
              </button>
              <button
                onClick={() => handleRoleChange("RECRUITER")}
                className={`px-2 py-1 text-[11px] rounded font-semibold ${
                  currentUser.role === "RECRUITER" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                Recruiter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg ${
                    isActive ? "bg-brand-600 text-white" : "text-slate-700 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
