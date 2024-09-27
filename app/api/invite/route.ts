import { auth } from "@/auth";
import loops from "@/loops";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, role, workspaceId } = await request.json();

    if (!email || !role || !workspaceId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create a new user if they don't exist
      user = await prisma.user.create({
        data: {
          email,
        },
      });
    }

    // Check if the user is already a collaborator in this workspace
    const existingCollaborator = await prisma.collaborator.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId,
        },
      },
      select: { id: true },
    });

    if (existingCollaborator) {
      return NextResponse.json(
        { message: "User is already a collaborator in this workspace" },
        { status: 400 }
      );
    }

    // Create a new collaborator
    const collaborator = await prisma.collaborator.create({
      data: {
        userId: user.id,
        workspaceId,
        role,
      },
    });

    //WIP

    await loops.sendEvent({
      email,
      eventName: "Welcome",
    });

    return NextResponse.json(
      { message: "Invitation sent successfully", collaborator },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user and collaborator:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
