import { InterviewController } from "@/backend/controllers/interview.controller";

export async function GET(request: Request) {
  return InterviewController.handleGet(request);
}

export async function POST(request: Request) {
  return InterviewController.handleGrade(request);
}
