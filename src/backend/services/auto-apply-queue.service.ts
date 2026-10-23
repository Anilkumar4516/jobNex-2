import { JobService } from "./job.service";
import { ApplicationService } from "./application.service";
import { AutoApplyLog } from "@/domain/types";

export interface BatchRunResult {
  scannedCount: number;
  matchedCount: number;
  appliedCount: number;
  logs: AutoApplyLog[];
}

export class AutoApplyQueueService {
  public static runBatch(params: {
    minMatchPercentage: number;
    candidateName: string;
    candidateEmail: string;
    resumeFileName?: string;
  }): BatchRunResult {
    const allJobs = JobService.getJobs();
    const logs: AutoApplyLog[] = [];
    let matchedCount = 0;
    let appliedCount = 0;

    for (const job of allJobs) {
      const match = job.matchScore || Math.floor(Math.random() * 25) + 70;
      if (match >= params.minMatchPercentage) {
        matchedCount++;
        const res = ApplicationService.createApplication({
          jobId: job.id,
          candidateName: params.candidateName,
          candidateEmail: params.candidateEmail,
          resumeFileName: params.resumeFileName,
          notes: "Auto-applied via JobNex Smart Matching Queue",
        });

        if (res.success) {
          appliedCount++;
          logs.push({
            id: `log-${Date.now()}-${job.id}`,
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            matchScore: match,
            status: "APPLIED",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          });
        }
      } else {
        logs.push({
          id: `log-${Date.now()}-${job.id}`,
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          matchScore: match,
          status: "SKIPPED_LOW_SCORE",
          reason: `Match score ${match}% is below threshold ${params.minMatchPercentage}%`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      }
    }

    return {
      scannedCount: allJobs.length,
      matchedCount,
      appliedCount,
      logs,
    };
  }
}
