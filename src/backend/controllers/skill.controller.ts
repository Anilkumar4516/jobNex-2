import { NextResponse } from "next/server";
import { SkillGapService } from "../services/skill-gap.service";

export class SkillController {
  public static async handleGet() {
    return NextResponse.json({
      success: true,
      userSkills: SkillGapService.getCandidateSkills(),
      missingSkills: SkillGapService.getMissingSkills(),
      courses: SkillGapService.getRecommendedCourses(),
    });
  }
}
