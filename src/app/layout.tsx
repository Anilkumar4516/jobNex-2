import type { Metadata } from "next";
import "./globals.css";
import { JobNexProvider } from "@/context/JobNexContext";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "JobNex - Your Next Job, Smarter! | AI Career Platform",
  description: "Accelerate your career with AI Job Search, Automated Applications, Real-time Interview Simulator, Skill Gap Diagnostics, and Cold Referrals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        <JobNexProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </JobNexProvider>
      </body>
    </html>
  );
}
