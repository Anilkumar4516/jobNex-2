"use client";

import React, { useState } from "react";
import { useJobNex } from "@/context/JobNexContext";
import {
  ShieldCheck,
  FileText,
  Upload,
  Eye,
  Download,
  Lock,
  Globe,
  User,
  CheckCircle2,
  EyeOff,
} from "lucide-react";

export function ResumePrivacyView() {
  const {
    uploadedResumeName,
    setUploadedResumeName,
    resumeParsedSummary,
    privacySettings,
    updatePrivacySettings,
    currentUser,
  } = useJobNex();

  const [activeTab, setActiveTab] = useState<"resume" | "privacy">("resume");
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const [showRecruiterPreview, setShowRecruiterPreview] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedResumeName(file.name);
      setSaveNotification(`Uploaded new resume: ${file.name}`);
      setTimeout(() => setSaveNotification(null), 3500);
    }
  };

  const handleSaveSettings = () => {
    setSaveNotification("Privacy settings saved successfully!");
    setTimeout(() => setSaveNotification(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {saveNotification && (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-violet flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Resume & Privacy</h1>
            <p className="text-xs text-slate-700">Manage your verified documents and recruiter masking preferences</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab("resume")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "resume" ? "bg-white text-brand-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            My Resume
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "privacy" ? "bg-white text-brand-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Privacy Controls
          </button>
        </div>
      </div>

      {activeTab === "resume" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <h2 className="text-base font-extrabold text-slate-900">Upload Resume</h2>
            <p className="text-xs text-slate-700">Supported formats: PDF, DOCX (Max 5MB)</p>

            <label className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-slate-50 hover:bg-brand-50/30 transition-all text-center">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-600 shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Click to browse or drag & drop file
                </p>
                <p className="text-[10px] text-slate-700 mt-0.5">PDF, DOCX up to 5MB</p>
              </div>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <div className="p-4 bg-brand-50/60 rounded-2xl border border-brand-100 space-y-1.5">
              <span className="text-[10px] font-bold text-brand-800 uppercase tracking-wide">
                AI Parsed Profile Summary
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-mono">
                {resumeParsedSummary}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900">Resume Preview</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Primary Resume
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-inner">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{uploadedResumeName}</h4>
                    <p className="text-[10px] text-slate-700">142 KB • PDF Document</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 font-serif">
                  <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    {privacySettings.maskContactInfo ? "[Contact Hidden by Candidate]" : currentUser.name}
                  </p>
                  <p className="text-[11px] text-slate-700">
                    {privacySettings.maskContactInfo ? "email@masked.jobnex.ai" : currentUser.email} •{" "}
                    {privacySettings.maskContactInfo ? "+XX XXXXX XXXXX" : currentUser.phone}
                  </p>
                  <p className="pt-2 text-[11px] text-slate-700 leading-relaxed">
                    <strong>Current:</strong>{" "}
                    {privacySettings.maskCurrentEmployer
                      ? "[Confidential Tech Enterprise]"
                      : currentUser.currentCompany}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSaveNotification(`Viewing ${uploadedResumeName} in high-resolution mode`)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Full</span>
              </button>
              <button
                type="button"
                onClick={() => setSaveNotification(`Downloading ${uploadedResumeName}...`)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-100">
              Granular Privacy Controls
            </h2>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Resume Access Permission
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  onClick={() => updatePrivacySettings({ visibility: "PUBLIC" })}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                    privacySettings.visibility === "PUBLIC"
                      ? "border-brand-600 bg-brand-50/70 shadow-xs ring-1 ring-brand-500"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Globe className={`w-5 h-5 shrink-0 mt-0.5 ${privacySettings.visibility === "PUBLIC" ? "text-brand-600" : "text-slate-400"}`} />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      Public (Visible to all verified recruiters)
                    </span>
                    <span className="text-[11px] text-slate-700 mt-0.5 block leading-relaxed">
                      Recommended for active job seekers. Allows recruiters to discover and contact you.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => updatePrivacySettings({ visibility: "PRIVATE" })}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                    privacySettings.visibility === "PRIVATE"
                      ? "border-brand-600 bg-brand-50/70 shadow-xs ring-1 ring-brand-500"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Lock className={`w-5 h-5 shrink-0 mt-0.5 ${privacySettings.visibility === "PRIVATE" ? "text-brand-600" : "text-slate-400"}`} />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      Private (Only when applying)
                    </span>
                    <span className="text-[11px] text-slate-700 mt-0.5 block leading-relaxed">
                      Your profile remains invisible in recruiter searches until you explicitly apply.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Recruiter Visibility & Personal Detail Masking
              </label>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">Hide Personal Contact Details</p>
                  <p className="text-[11px] text-slate-700">
                    Masks phone number and direct email until your application is accepted for an interview.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => updatePrivacySettings({ maskContactInfo: !privacySettings.maskContactInfo })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    privacySettings.maskContactInfo ? "bg-brand-600 justify-end" : "bg-slate-300 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">Hide Current Employer Name</p>
                  <p className="text-[11px] text-slate-700">
                    Replaces current employer with &quot;[Confidential Tech Enterprise]&quot; to protect active employment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => updatePrivacySettings({ maskCurrentEmployer: !privacySettings.maskCurrentEmployer })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    privacySettings.maskCurrentEmployer ? "bg-brand-600 justify-end" : "bg-slate-300 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-900">
                  Live Recruiter Perspective Simulator
                </span>
                <button
                  onClick={() => setShowRecruiterPreview(!showRecruiterPreview)}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  {showRecruiterPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showRecruiterPreview ? "Hide Simulator" : "Preview Recruiter View"}</span>
                </button>
              </div>

              {showRecruiterPreview && (
                <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-400">
                    <User className="w-4 h-4" />
                    <span>How External Recruiters See You:</span>
                  </div>
                  <div className="text-xs space-y-1 font-mono text-slate-300">
                    <p>
                      <strong>Name:</strong> {currentUser.name}
                    </p>
                    <p>
                      <strong>Contact:</strong>{" "}
                      {privacySettings.maskContactInfo ? (
                        <span className="text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                          [Hidden until interview stage]
                        </span>
                      ) : (
                        currentUser.phone
                      )}
                    </p>
                    <p>
                      <strong>Company:</strong>{" "}
                      {privacySettings.maskCurrentEmployer ? (
                        <span className="text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                          [Confidential Enterprise]
                        </span>
                      ) : (
                        currentUser.currentCompany
                      )}
                    </p>
                    <p>
                      <strong>Visibility Mode:</strong>{" "}
                      <span className="text-emerald-400">{privacySettings.visibility}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSaveSettings}
                className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs px-8 py-3 rounded-xl shadow-md transition-all active:scale-95"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
