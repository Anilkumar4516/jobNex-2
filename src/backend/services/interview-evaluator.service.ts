import { TECHNICAL_QUESTIONS, HR_QUESTIONS } from "@/lib/mockData";
import { InterviewQuestionItem } from "@/domain/types";

export interface GradingRubric {
  score: number;
  accuracyScore: number;
  communicationScore: number;
  relevanceScore: number;
  actionableFeedback: string;
}

export class InterviewEvaluatorService {
  public static getQuestions(type: "Technical" | "HR"): InterviewQuestionItem[] {
    return type === "Technical" ? [...TECHNICAL_QUESTIONS] : [...HR_QUESTIONS];
  }

  public static evaluateAnswer(questionId: string, answer: string): GradingRubric {
    const trimmed = (answer || "").trim();
    const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;

    let score = 75;
    let feedback = "Good explanation of core concepts with solid practical reasoning.";

    if (wordCount < 15) {
      score = 45;
      feedback = "Answer is relatively brief. Consider elaborating with architecture details and specific production examples.";
    } else if (wordCount > 60) {
      score = 92;
      feedback = "Outstanding depth! Clear structural logic, accurate terminology, and great real-world context.";
    } else {
      score = 82;
      feedback = "Solid answer! Directly addresses the prompt with clear technical terminology.";
    }

    return {
      score,
      accuracyScore: Math.min(100, score + 4),
      communicationScore: Math.min(100, score - 2),
      relevanceScore: Math.min(100, score + 2),
      actionableFeedback: feedback,
    };
  }
}
