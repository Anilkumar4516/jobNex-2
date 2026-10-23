import { NextResponse } from "next/server";
import { ApplicationService } from "../services/application.service";
import { ApplicationStatus } from "@/domain/types";

export class ApplicationController {
  public static async handleGet(request: Request) {
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get("status") as ApplicationStatus) || undefined;

    const applications = ApplicationService.getApplications(status);
    return NextResponse.json({
      success: true,
      count: applications.length,
      applications,
    });
  }

  public static async handlePost(request: Request) {
    try {
      const body = await request.json();
      const res = ApplicationService.createApplication(body);

      if (!res.success) {
        return NextResponse.json({ success: false, message: res.message }, { status: 400 });
      }

      return NextResponse.json(
        { success: true, application: res.application, message: res.message },
        { status: 201 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err?.message || "Failed to process application" },
        { status: 500 }
      );
    }
  }
}
