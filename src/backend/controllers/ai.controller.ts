import { NextResponse } from "next/server";
import { AIAgentService } from "../services/ai-agent.service";

export class AIController {
  public static async handleChat(request: Request) {
    try {
      let message = "";
      try {
        const rawText = await request.text();
        if (rawText) {
          try {
            const body = JSON.parse(rawText);
            message = body?.message || rawText;
          } catch {
            message = rawText;
          }
        }
      } catch {
        message = "";
      }

      const response = await AIAgentService.processCareerMessage(message);
      return NextResponse.json({
        success: true,
        ...response,
      });
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err?.message || "Failed to process chat" },
        { status: 500 }
      );
    }
  }
}
