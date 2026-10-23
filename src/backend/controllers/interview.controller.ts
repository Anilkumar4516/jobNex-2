import { NextResponse } from "next/server";
import { InterviewEvaluatorService } from "../services/interview-evaluator.service";

export class InterviewController {
  public static async handleGet(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get("type") as "Technical" | "HR") || "Technical";

    const questions = InterviewEvaluatorService.getQuestions(type);
    return NextResponse.json({
      success: true,
      type,
      questions,
    });
  }

  public static async handleGrade(request: Request) {
    try {
      const body = await request.json();
      const rubric = InterviewEvaluatorService.evaluateAnswer(body.questionId, body.answer);

      return NextResponse.json({
        success: true,
        rubric,
      });
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err?.message || "Grading failed" },
        { status: 500 }
      );
    }
  }
}
