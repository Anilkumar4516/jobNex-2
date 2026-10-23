import { ReferralController } from "@/backend/controllers/referral.controller";

export async function POST(request: Request) {
  return ReferralController.handleDispatch(request);
}
