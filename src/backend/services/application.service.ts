import { INITIAL_APPLICATIONS } from "@/lib/mockData";
import { Application, ApplicationStatus } from "@/domain/types";
import { JobService } from "./job.service";

export class ApplicationService {
  private static applicationsList: Application[] = [...INITIAL_APPLICATIONS];

  public static getApplications(statusFilter?: ApplicationStatus): Application[] {
    if (!statusFilter || statusFilter === "All") {
      return [...this.applicationsList];
    }
    return this.applicationsList.filter((a) => a.status === statusFilter);
  }

  public static createApplication(payload: {
    jobId: string;
    candidateName: string;
    candidateEmail: string;
    resumeFileName?: string;
    notes?: string;
  }): { success: boolean; application?: Application; message: string } {
    const job = JobService.getJobById(payload.jobId);
    if (!job) {
      return { success: false, message: "Target job listing not found." };
    }

    const existing = this.applicationsList.find((a) => a.jobId === payload.jobId);
    if (existing) {
      return { success: false, message: "You have already applied to this position." };
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: payload.jobId,
      job,
      candidateName: payload.candidateName,
      candidateEmail: payload.candidateEmail,
      status: "Applied",
      appliedDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      matchScore: job.matchScore || Math.floor(Math.random() * 20) + 75,
      resumeFileName: payload.resumeFileName || "Active_Resume.pdf",
      notes: payload.notes,
      timeline: [
        {
          id: `t-${Date.now()}`,
          stage: "Applied",
          title: "Application Submitted",
          description: `Application dispatched to ${job.company}`,
          date: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          actor: "Candidate",
        },
      ],
    };

    this.applicationsList.unshift(newApp);
    return { success: true, application: newApp, message: "Application submitted successfully." };
  }

  public static updateStatus(appId: string, newStatus: ApplicationStatus, notes?: string): Application | null {
    const app = this.applicationsList.find((a) => a.id === appId);
    if (!app) return null;

    app.status = newStatus;
    app.timeline.unshift({
      id: `t-${Date.now()}`,
      stage: newStatus,
      title: `Moved to ${newStatus}`,
      description: notes || `Application transitioned to stage: ${newStatus}`,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      actor: "Recruiter / ATS System",
    });

    return app;
  }
}
