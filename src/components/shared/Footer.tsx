import React from "react";
import Link from "next/link";
import { Sparkles, Linkedin, Twitter, Instagram, Github, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-accent-violet flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Job<span className="text-brand-400">Nex</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your Next Job, Smarter! AI-driven career acceleration, automated applications, and intelligent interview preparation.
            </p>
            <div className="flex items-center space-x-3 text-slate-400">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-brand-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Discovery */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Discovery</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/jobs" className="hover:text-white transition-colors">Featured Job Listings</Link></li>
              <li><Link href="/jobs?region=INDIA" className="hover:text-white transition-colors">India Tech Jobs</Link></li>
              <li><Link href="/jobs?region=US" className="hover:text-white transition-colors">US Remote Positions</Link></li>
              <li><Link href="/jobs?region=BANGLADESH" className="hover:text-white transition-colors">Bangladesh Opportunities</Link></li>
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">AI Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/ai-assistant" className="hover:text-white transition-colors">AI Career Assistant</Link></li>
              <li><Link href="/interview-prep" className="hover:text-white transition-colors">Technical & HR Simulator</Link></li>
              <li><Link href="/skill-gap" className="hover:text-white transition-colors">Skill Gap Diagnostics</Link></li>
              <li><Link href="/auto-apply" className="hover:text-white transition-colors">Automated Job Dispatcher</Link></li>
              <li><Link href="/cold-referral" className="hover:text-white transition-colors">Cold Referral Tool</Link></li>
            </ul>
          </div>

          {/* Privacy & Recruiter Access */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Trust & Transparency</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/resume-privacy" className="hover:text-white transition-colors">Resume Privacy Controls</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Centralized ATS Tracker</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Recruiter Verification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} JobNex Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern AI precision for high-performing tech careers
          </p>
        </div>
      </div>
    </footer>
  );
};
