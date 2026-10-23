import { NextResponse } from "next/server";
import { JobService } from "../services/job.service";
import { Region, ExperienceLevel } from "@/domain/types";

export class JobController {
  public static async handleGet(request: Request) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("q") || undefined;
    const region = (searchParams.get("region") as Region) || undefined;
    const experience = (searchParams.get("exp") as ExperienceLevel) || undefined;

    const jobs = JobService.getJobs({ keyword, region, experience });
    return NextResponse.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  }

  public static async handlePost(request: Request) {
    try {
      const body = await request.json();
      const newJob = JobService.createJob(body);
      return NextResponse.json({ success: true, job: newJob }, { status: 201 });
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err?.message || "Invalid payload" },
        { status: 400 }
      );
    }
  }
}
