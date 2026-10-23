"use client";

import React, { useState } from "react";
import { useJobNex } from "@/context/JobNexContext";
import {
  BarChart3,
  Star,
  Clock,
  ExternalLink,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export function SkillGapView() {
  const { userSkills, updateSkillMastery, missingSkills, courses } = useJobNex();
  const [selectedTargetRole, setSelectedTargetRole] = useState("Data Scientist / ML Engineer");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-violet flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Skill Gap Analysis</h1>
            <p className="text-xs text-slate-700">Benchmark your technical competencies against target job requirements</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Target Role:</span>
          <select
            value={selectedTargetRole}
            onChange={(e) => setSelectedTargetRole(e.target.value)}
            className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 outline-none cursor-pointer focus:border-brand-500"
          >
            <option value="Data Scientist / ML Engineer">Data Scientist / ML Engineer</option>
            <option value="Senior Frontend Engineer">Senior Frontend Engineer</option>
            <option value="DevOps & Cloud Architect">DevOps & Cloud Architect</option>
            <option value="Full-Stack Web Developer">Full-Stack Web Developer</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your Skills Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Your Skills</h2>
              <p className="text-xs text-slate-700">Adjust percentages to recalculate matching scores</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700">
              {userSkills.length} Verified
            </span>
          </div>

          <div className="space-y-5">
            {userSkills.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">{skill.name}</span>
                  <span className="text-brand-600">{skill.masteryPercentage}%</span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-accent-violet rounded-full transition-all duration-500"
                    style={{ width: `${skill.masteryPercentage}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.masteryPercentage}
                    onChange={(e) => updateSkillMastery(skill.id, parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                  <span className="text-[10px] text-slate-700 shrink-0 font-medium">Drag to tune</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Missing Skills</h2>
                <p className="text-xs text-slate-700">Identified based on current market job postings for {selectedTargetRole}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700">
                Action Required
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {missingSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold shadow-2xs hover:bg-rose-100 transition-colors"
                >
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-brand-50/60 rounded-2xl border border-brand-100 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-brand-900 block mb-0.5">AI Career Tip:</span>
                Acquiring <strong className="text-brand-900">Data Visualization</strong> and <strong className="text-brand-900">Cloud Computing</strong> will elevate your ATS resume match from 74% to <strong className="text-emerald-700">92%</strong> for top enterprise recruiters.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
            <span>Powered by JobNex Vector Differential Diagnostics</span>
            <span className="font-bold text-brand-600">Updated Daily</span>
          </div>
        </div>
      </div>

      {/* Recommended Courses Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recommended Courses</h2>
          <p className="text-xs text-slate-700 mt-1">Curated learning modules directly mapped to your missing skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 p-5 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {course.provider}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <div className="flex items-center gap-1 text-xs text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Duration: {course.duration}</span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {course.skillsTargeted.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <a
                  href={course.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                >
                  <span>Start Learning</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
