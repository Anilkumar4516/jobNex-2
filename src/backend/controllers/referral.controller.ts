import { NextResponse } from "next/server";
import { ReferralMailerService } from "../services/referral-mailer.service";

export class ReferralController {
  public static async handleDispatch(request: Request) {
    try {
      const body = await request.json();
      const result = await ReferralMailerService.dispatchReferralEmail(body);

      return NextResponse.json({
        success: true,
        referralId: result.trackingId,
        status: result.status,
        deliveryMessage: `Outreach email queued and dispatched to ${body.recipientEmail} with ${body.resumeFileName || "resume.pdf"} attached.`,
      });
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err?.message || "Outreach dispatch failed" },
        { status: 500 }
      );
    }
  }

  public static async handleDraft(request: Request) {
    try {
      const body = await request.json();
      const pitch = ReferralMailerService.generatePitchDraft(body);

      return NextResponse.json({
        success: true,
        draft: pitch,
      });
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err?.message || "Draft generation failed" },
        { status: 500 }
      );
    }
  }
}
