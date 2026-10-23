"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useJobNex } from "@/context/JobNexContext";
import { Region, ExperienceLevel, JobPosting } from "@/domain/types";
import { formatCurrency } from "@/lib/utils";
import {
  Search,
  MapPin,
  Briefcase,
  Bookmark,
  CheckCircle2,
  X,
  FileText,
  SlidersHorizontal,
} from "lucide-react";

function JobsViewContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialRegion = (searchParams.get("region") as Region) || null;
  const initialExp = (searchParams.get("exp") as ExperienceLevel) || null;

  const { jobs, savedJobIds, toggleBookmark, applyToJob, uploadedResumeName } = useJobNex();

  // Search & Filter State
  const [keyword, setKeyword] = useState(initialQuery);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>(initialRegion ? [initialRegion] : []);
  const [selectedExpLevels, setSelectedExpLevels] = useState<ExperienceLevel[]>(initialExp ? [initialExp] : []);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "salary">("relevance");

  // Apply Modal state
  const [applyingJob, setApplyingJob] = useState<JobPosting | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [applySuccessMessage, setApplySuccessMessage] = useState<string | null>(null);

  const handleToggleRegion = (r: Region) => {
    setSelectedRegions((prev) =>
      prev.includes(r) ? prev.filter((item) => item !== r) : [...prev, r]
    );
  };

  const handleToggleExp = (exp: ExperienceLevel) => {
    setSelectedExpLevels((prev) =>
      prev.includes(exp) ? prev.filter((item) => item !== exp) : [...prev, exp]
    );
  };

  const handleToggleCert = (cert: string) => {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearAllFilters = () => {
    setKeyword("");
    setSelectedRegions([]);
    setSelectedExpLevels([]);
    setSelectedCerts([]);
    setSelectedSkills([]);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesSkill = job.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesSkill) {
          return false;
        }
      }

      if (selectedRegions.length > 0 && !selectedRegions.includes(job.region)) {
        return false;
      }

      if (selectedExpLevels.length > 0 && !selectedExpLevels.includes(job.experienceLevel)) {
        return false;
      }

      if (selectedCerts.length > 0) {
        const hasCert = job.certifications.some((c) => selectedCerts.includes(c));
        if (!hasCert) return false;
      }

      if (selectedSkills.length > 0) {
        const hasSkill = job.skills.some((s) => selectedSkills.includes(s));
        if (!hasSkill) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "salary") return b.salaryMax - a.salaryMax;
      if (sortBy === "date") return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      return (b.matchScore || 0) - (a.matchScore || 0);
    });
  }, [jobs, keyword, selectedRegions, selectedExpLevels, selectedCerts, selectedSkills, sortBy]);

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    const res = applyToJob(applyingJob.id, coverLetter, uploadedResumeName);
    setApplySuccessMessage(res.message);
    setTimeout(() => {
      setApplyingJob(null);
      setCoverLetter("");
      setApplySuccessMessage(null);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="glass p-4 rounded-2xl shadow-xs border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex-1 w-full flex items-center gap-3 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus-within:border-brand-500 shadow-2xs">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search jobs, skills, company..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full text-xs sm:text-sm text-slate-900 outline-none bg-transparent font-medium"
          />
          {keyword && (
            <button onClick={() => setKeyword("")} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="relevance">Match Relevance</option>
              <option value="salary">Highest Salary</option>
              <option value="date">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">Filters</h3>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-brand-600 hover:text-brand-700 hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Region Filter */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-2.5 uppercase tracking-wider">Region</h4>
              <div className="space-y-2">
                {[
                  { id: "US", label: "US" },
                  { id: "GLOBAL", label: "Global" },
                  { id: "INDIA", label: "India" },
                  { id: "BANGLADESH", label: "Bangladesh" },
                ].map((r) => (
                  <label key={r.id} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-brand-600">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(r.id as Region)}
                      onChange={() => handleToggleRegion(r.id as Region)}
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Filter */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 mb-2.5 uppercase tracking-wider">Experience</h4>
              <div className="space-y-2">
                {(["Fresher", "1-2 yrs", "3-5 yrs", "5+ yrs"] as ExperienceLevel[]).map((exp) => (
                  <label key={exp} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-brand-600">
                    <input
                      type="checkbox"
                      checked={selectedExpLevels.includes(exp)}
                      onChange={() => handleToggleExp(exp)}
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
                    />
                    <span>{exp}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Certifications Filter */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 mb-2.5 uppercase tracking-wider">Certifications</h4>
              <div className="space-y-2">
                {["AWS", "Google Cloud", "PMP", "Others"].map((cert) => (
                  <label key={cert} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-brand-600">
                    <input
                      type="checkbox"
                      checked={selectedCerts.includes(cert)}
                      onChange={() => handleToggleCert(cert)}
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
                    />
                    <span>{cert}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skills Multi-Select Filter */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 mb-2.5 uppercase tracking-wider">Skills</h4>
              <div className="space-y-2">
                {["React", "Python", "Java", "Docker", "Machine Learning", "Others"].map((skill) => (
                  <label key={skill} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-brand-600">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleToggleSkill(skill)}
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Job Results */}
        <main className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">
              Job Results <span className="text-brand-600 font-bold">({filteredJobs.length})</span>
            </h2>
            <span className="text-xs text-slate-700">
              Showing active listings with live apply integration
            </span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No matching jobs found</h3>
              <p className="text-xs text-slate-700 max-w-sm mx-auto">
                Try loosening your filters or resetting your search keyword to view more opportunities.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-2 text-xs font-bold text-brand-600 bg-brand-50 px-4 py-2 rounded-xl hover:bg-brand-100 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const isBookmarked = savedJobIds.includes(job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 p-5 shadow-xs hover:shadow-lg transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img
                            src={job.companyLogo}
                            alt={job.company}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                              {job.title}
                            </h3>
                            {job.matchScore && (
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                {job.matchScore}% Match
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-slate-700">{job.company}</p>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                              {job.experienceLevel}
                            </span>
                            <span className="font-semibold text-emerald-600">
                              {formatCurrency(job.salaryMin, job.currency)} - {formatCurrency(job.salaryMax, job.currency)}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {job.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 shrink-0">
                        <button
                          onClick={() => toggleBookmark(job.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                          title={isBookmarked ? "Remove from bookmarks" : "Bookmark job"}
                        >
                          <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-rose-500 text-rose-500" : ""}`} />
                        </button>

                        <button
                          onClick={() => setApplyingJob(job)}
                          className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Instant Apply Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-brand-600 uppercase tracking-wider block">
                  1-Click Application
                </span>
                <h3 className="text-xl font-black text-slate-900">{applyingJob.title}</h3>
                <p className="text-xs font-semibold text-slate-700">{applyingJob.company} • {applyingJob.location}</p>
              </div>
              <button
                onClick={() => setApplyingJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySuccessMessage ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-sm">Success!</p>
                  <p className="text-xs">{applySuccessMessage}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmApply} className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{uploadedResumeName}</p>
                      <p className="text-[10px] text-slate-700">Attached from your JobNex profile</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>

                <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-brand-900">Skill Match Score</p>
                    <p className="text-[10px] text-brand-700">Calculated by JobNex AI Vector Engine</p>
                  </div>
                  <span className="text-lg font-black text-brand-600">
                    {applyingJob.matchScore || 85}%
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Short Note / Pitch to Recruiter (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Briefly highlight why you're a great fit for this role..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-brand-500 focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyingJob(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function JobsView() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-700 text-sm">
          <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          Loading Jobs Catalog...
        </div>
      }
    >
      <JobsViewContent />
    </Suspense>
  );
}
