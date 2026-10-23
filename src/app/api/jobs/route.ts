import { JobController } from "@/backend/controllers/job.controller";

export async function GET(request: Request) {
  return JobController.handleGet(request);
}

export async function POST(request: Request) {
  return JobController.handlePost(request);
}
