import { INITIAL_JOBS } from "@/lib/mockData";
import { JobPosting, Region, ExperienceLevel } from "@/domain/types";

export class JobService {
  private static jobsList: JobPosting[] = [...INITIAL_JOBS];

  public static getJobs(params?: {
    keyword?: string;
    region?: Region | "ALL";
    experience?: ExperienceLevel | "ALL";
    skills?: string[];
  }): JobPosting[] {
    let result = [...this.jobsList];

    if (params?.keyword) {
      const q = params.keyword.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (params?.region && params.region !== "ALL") {
      result = result.filter((j) => j.region === params.region);
    }

    if (params?.experience && params.experience !== "ALL") {
      result = result.filter((j) => j.experienceLevel === params.experience);
    }

    if (params?.skills && params.skills.length > 0) {
      result = result.filter((j) =>
        params.skills!.some((s) => j.skills.includes(s))
      );
    }

    return result;
  }

  public static getJobById(id: string): JobPosting | undefined {
    return this.jobsList.find((j) => j.id === id);
  }

  public static createJob(jobData: Partial<JobPosting>): JobPosting {
    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: jobData.title || "Software Engineer",
      company: jobData.company || "Enterprise Corp",
      companyLogo: jobData.companyLogo || "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&auto=format&fit=crop&q=80",
      location: jobData.location || "Remote",
      region: jobData.region || "GLOBAL",
      workplaceType: jobData.workplaceType || "Remote",
      experienceLevel: jobData.experienceLevel || "1-2 yrs",
      salaryMin: jobData.salaryMin || 600000,
      salaryMax: jobData.salaryMax || 1200000,
      currency: jobData.currency || "INR",
      description: jobData.description || "Exciting tech role.",
      requirements: jobData.requirements || ["Proficiency in modern technologies"],
      skills: jobData.skills || ["React", "TypeScript"],
      certifications: jobData.certifications || ["Others"],
      isFeatured: jobData.isFeatured || false,
      postedAt: new Date().toISOString(),
      matchScore: 85,
    };

    this.jobsList.unshift(newJob);
    return newJob;
  }
}
