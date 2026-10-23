import { SkillController } from "@/backend/controllers/skill.controller";

export async function GET() {
  return SkillController.handleGet();
}
