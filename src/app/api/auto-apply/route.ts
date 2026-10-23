import { AutoApplyController } from "@/backend/controllers/auto-apply.controller";

export async function POST(request: Request) {
  return AutoApplyController.handleBatchRun(request);
}
