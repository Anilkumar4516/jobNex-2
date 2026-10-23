import { ChatDeepLink } from "@/domain/types";

export interface AIChatResponse {
  reply: string;
  suggestedChips: string[];
  actionLinks?: ChatDeepLink[];
}

export class AIAgentService {
  public static async processCareerMessage(userMessage: string): Promise<AIChatResponse> {
    const query = userMessage.toLowerCase();

    let reply = "Hello! I am JobNex AI Assistant. I can help you discover matching tech jobs, benchmark your skill gaps, practice tailored interview questions, and dispatch cold referral emails.";
    let suggestedChips = [
      "Best skills for Data Science?",
      "Interview tips for Google?",
      "Top companies hiring freshers?",
      "Analyze my skill gap",
    ];
    let actionLinks: ChatDeepLink[] | undefined = undefined;

    if (query.includes("data science") || query.includes("python") || query.includes("skills")) {
      reply = "For Data Science, employers look for Python, SQL, Machine Learning pipelines (Scikit-Learn/PyTorch), and Data Visualization (Plotly/Seaborn). Closing your Data Visualization gap will raise your match score by +18%!";
      actionLinks = [
        { title: "View Skill Gap Analysis", url: "/skill-gap", type: "SKILL" },
        { title: "Browse Data Science Roles", url: "/jobs?q=Data+Scientist", type: "JOB" },
      ];
    } else if (query.includes("interview") || query.includes("tips") || query.includes("google")) {
      reply = "Top tech companies prioritize structured problem solving (STAR technique), algorithmic efficiency, and scalable system design. Would you like to practice our 5-question simulator now?";
      actionLinks = [
        { title: "Launch Interview Simulator", url: "/interview-prep", type: "INTERVIEW" },
      ];
    } else if (query.includes("auto") || query.includes("apply")) {
      reply = "JobNex Auto-Apply scans active listings daily and automatically submits your application when a job exceeds your minimum match threshold (e.g. Min 70%).";
      actionLinks = [
        { title: "Configure Auto-Apply", url: "/auto-apply", type: "JOB" },
      ];
    }

    return {
      reply,
      suggestedChips,
      actionLinks,
    };
  }
}
