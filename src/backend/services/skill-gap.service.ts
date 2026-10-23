import { INITIAL_USER_SKILLS, INITIAL_MISSING_SKILLS, INITIAL_COURSES } from "@/lib/mockData";
import { UserSkill, CourseRecommendation } from "@/domain/types";

export class SkillGapService {
  public static getCandidateSkills(): UserSkill[] {
    return [...INITIAL_USER_SKILLS];
  }

  public static getMissingSkills(role?: string): string[] {
    return [...INITIAL_MISSING_SKILLS];
  }

  public static getRecommendedCourses(missingSkills?: string[]): CourseRecommendation[] {
    return [...INITIAL_COURSES];
  }
}
