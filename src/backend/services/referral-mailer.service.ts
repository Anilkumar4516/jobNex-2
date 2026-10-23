export interface ReferralPayload {
  company: string;
  recipientEmail: string;
  targetRole: string;
  candidateName: string;
  candidateEmail: string;
  phone?: string;
  resumeFileName?: string;
}

export class ReferralMailerService {
  public static generatePitchDraft(payload: ReferralPayload): string {
    const greeting = payload.recipientEmail ? payload.recipientEmail.split("@")[0] : "Hiring Team";
    return `Hi ${greeting},

I hope this note finds you well!

I came across the ${payload.targetRole} position at ${payload.company} and was immediately impressed by your team's engineering momentum. With my hands-on background in full-stack architecture, React, Node.js, and high-performance databases, I would love to be considered for an internal referral.

Attached is my verified resume (${payload.resumeFileName || "Candidate_Resume.pdf"}) for your consideration. I would be immensely grateful if you could forward this to the hiring team.

Thank you very much for your time and support!

Warm regards,
${payload.candidateName}
${payload.candidateEmail} | ${payload.phone || "+91 98765 43210"}`;
  }

  public static async dispatchReferralEmail(payload: ReferralPayload & { subject: string; message: string }): Promise<{
    success: boolean;
    trackingId: string;
    status: string;
  }> {
    // In production with BullMQ: queues.emailQueue.add('send-referral', payload);
    return {
      success: true,
      trackingId: `ref-${Date.now()}`,
      status: "SENT",
    };
  }
}
