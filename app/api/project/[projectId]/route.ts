import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    // Delete the project and all associated tasks
    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
