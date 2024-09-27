import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { workspaceId, name, description, generatedTasks } = body;

    // Create the project
    const project = await prisma.project.create({
      data: {
        name,
        description,
        workspace: { connect: { id: workspaceId } },
      },
    });

    // Create tasks based on the generated content
    if (generatedTasks && generatedTasks.length > 0) {
      await prisma.task.createMany({
        data: generatedTasks.map((task: any) => ({
          name: task.name,
          description: task.description,
          startDate: new Date(task.startDate),
          endDate: new Date(task.endDate),
          priority: task.priority,
          projectId: project.id,
          // Note: Assignees are not handled here as they might require additional logic
        })),
      });
    }

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
