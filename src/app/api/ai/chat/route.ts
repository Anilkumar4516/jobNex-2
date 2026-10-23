import { AIController } from "@/backend/controllers/ai.controller";

export async function POST(request: Request) {
  return AIController.handleChat(request);
}
