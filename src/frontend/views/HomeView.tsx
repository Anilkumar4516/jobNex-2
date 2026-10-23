"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobNex } from "@/context/JobNexContext";
import { Region, ExperienceLevel } from "@/domain/types";
import { formatCurrency } from "@/lib/utils";
import {
  Search,
  MapPin,
  Briefcase,
  Bot,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Globe2,
} from "lucide-react";

export function HomeView() {
  const router = useRouter();
  const { jobs, savedJobIds, toggleBookmark, applyToJob } = useJobNex();

  // Hero Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region | "ALL">("ALL");
  const [selectedExp, setSelectedExp] = useState<ExperienceLevel | "ALL">("ALL");
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedRegion !== "ALL") params.set("region", selectedRegion);
    if (selectedExp !== "ALL") params.set("exp", selectedExp);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleApplyClick = (jobId: string, company: string) => {
    const res = applyToJob(jobId);
    setAppliedNotification(res.message);
    setTimeout(() => setAppliedNotification(null), 3500);
  };

  const featuredJobs = jobs.slice(0, 6);

  return (
    <div className="space-y-16 pb-20">
      {/* Toast Notification */}
      {appliedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-brand-500/30 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{appliedNotification}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-brand-50/60 via-white to-slate-50 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>JobNex 2.0: AI-Powered Career Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Find Your <span className="bg-gradient-to-r from-brand-600 to-accent-violet bg-clip-text text-transparent">Dream Job</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto font-normal">
            AI powered. Personalized. Faster. Match skill gaps, prepare for technical & HR interviews, and auto-dispatch applications.
          </p>

          {/* Global Hero Search Bar (Wireframe Module 1) */}
          <div className="pt-4 max-w-4xl mx-auto">
            <form
              onSubmit={handleHeroSearch}
              className="glass p-2.5 sm:p-3 rounded-2xl shadow-xl border border-slate-200/90 flex flex-col md:flex-row gap-2.5 items-stretch"
            >
              {/* Keyword input */}
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl border border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/10 transition-all">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search job title, skills (React, Python), company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium"
                />
              </div>

              {/* Region Dropdown Filter */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 focus-within:border-brand-500 transition-all">
                <Globe2 className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value as any)}
                  className="text-xs font-semibold text-slate-700 outline-none bg-transparent cursor-pointer"
                >
                  <option value="ALL">All Regions</option>
                  <option value="INDIA">India</option>
                  <option value="US">US / Remote</option>
                  <option value="GLOBAL">Global</option>
                  <option value="BANGLADESH">Bangladesh</option>
                </select>
              </div>

              {/* Experience Dropdown Filter */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 focus-within:border-brand-500 transition-all">
                <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedExp}
                  onChange={(e) => setSelectedExp(e.target.value as any)}
                  className="text-xs font-semibold text-slate-700 outline-none bg-transparent cursor-pointer"
                >
                  <option value="ALL">Any Experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-2 yrs">1–2 yrs</option>
                  <option value="3-5 yrs">3–5 yrs</option>
                  <option value="5+ yrs">5+ yrs</option>
                </select>
              </div>

              {/* Search CTA */}
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 text-sm shrink-0 hover:scale-[1.02]"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick popular tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-700">
              <span className="font-semibold text-slate-700">Popular Searches:</span>
              {["React", "Python", "Data Science", "AWS", "Google", "Fresher"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => router.push(`/jobs?q=${encodeURIComponent(tag)}`)}
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-brand-400 hover:text-brand-600 font-medium transition-all shadow-2xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-2xl font-black text-brand-600">2,450+</p>
              <p className="text-xs text-slate-700 font-medium mt-0.5">Verified Tech Roles</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-2xl font-black text-emerald-600">94.2%</p>
              <p className="text-xs text-slate-700 font-medium mt-0.5">Interview Success Rate</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-2xl font-black text-accent-violet">10x</p>
              <p className="text-xs text-slate-700 font-medium mt-0.5">Faster Auto-Apply</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-2xl font-black text-amber-600">100%</p>
              <p className="text-xs text-slate-700 font-medium mt-0.5">Privacy Masking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section (Wireframe Module 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Featured Jobs</h2>
            <p className="text-xs text-slate-700 mt-1">High-match openings curated from top global & regional tech companies</p>
          </div>
          <Link
            href="/jobs"
            className="flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Column Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => {
            const isBookmarked = savedJobIds.includes(job.id);
            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 p-5 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-700">{job.company}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBookmark(job.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                      title={isBookmarked ? "Remove bookmark" : "Save job"}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-rose-500 text-rose-500" : ""}`} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-700 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {job.experienceLevel}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="text-[11px] text-slate-700 font-medium self-center">
                        +{job.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-700 block">Package</span>
                    <span className="font-extrabold text-sm text-emerald-600">
                      {formatCurrency(job.salaryMin, job.currency)} - {formatCurrency(job.salaryMax, job.currency)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleApplyClick(job.id, job.company)}
                    className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 border border-brand-500/30 p-8 sm:p-10 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-accent-violet flex items-center justify-center text-white shadow-xl shadow-brand-500/30 shrink-0">
                <Bot className="w-8 h-8 animate-bounce-slow" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest block mb-1">
                  AI Career Copilot
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Meet JobNex AI Assistant
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
                  Your personal career guide! Ask about career roadmaps, discover skill gaps, or generate targeted interview prep questions.
                </p>
              </div>
            </div>

            <Link
              href="/ai-assistant"
              className="bg-brand-500 hover:bg-brand-400 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg shadow-brand-500/30 transition-all flex items-center gap-2 text-sm shrink-0 hover:scale-105"
            >
              <span>Chat Now</span>
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
