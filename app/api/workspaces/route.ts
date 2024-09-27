import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, description, collaborators } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Validate collaborators
    if (collaborators && !Array.isArray(collaborators)) {
      return NextResponse.json(
        { error: "Collaborators must be an array" },
        { status: 400 }
      );
    }

    // Validate email format for each collaborator
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = collaborators.filter(
      (email: string) => !emailRegex.test(email)
    );
    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { error: "Invalid email format for collaborators", invalidEmails },
        { status: 400 }
      );
    }

    // Create workspace
    const workspace = await prisma.workspace.create({
      data: {
        name,
        description,
        ownerId: session.user.id,
        collaborators: {
          create: collaborators.map((email: string) => ({
            user: {
              connectOrCreate: {
                where: { email },
                //create: { email },
              },
            },
          })),
        },
      },
      include: {
        collaborators: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(workspace, { status: 201 });
  } catch (error) {
    console.error("Error creating workspace:", error);
    return NextResponse.json(
      { error: "Failed to create workspace" },
      { status: 500 }
    );
  }
}
