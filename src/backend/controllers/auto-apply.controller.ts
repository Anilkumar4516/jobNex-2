import { NextResponse } from "next/server";
import { AutoApplyQueueService } from "../services/auto-apply-queue.service";

export class AutoApplyController {
  public static async handleBatchRun(request: Request) {
    try {
      const body = await request.json();
      const result = AutoApplyQueueService.runBatch({
        minMatchPercentage: body.minMatchPercentage || 70,
        candidateName: body.candidateName || "Sandeep Kumar",
        candidateEmail: body.candidateEmail || "sandeep@jobnex.ai",
        resumeFileName: body.resumeFileName || "Active_Resume.pdf",
      });

      return NextResponse.json({
        success: true,
        ...result,
      });
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err?.message || "Auto-apply queue failed" },
        { status: 500 }
      );
    }
  }
}
