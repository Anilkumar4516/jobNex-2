import { ApplicationController } from "@/backend/controllers/application.controller";

export async function GET(request: Request) {
  return ApplicationController.handleGet(request);
}

export async function POST(request: Request) {
  return ApplicationController.handlePost(request);
}
