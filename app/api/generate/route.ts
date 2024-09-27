import generateSchema from "@/app/schemas/generate";
import { promptSchema, promptSchemaWithAssignees } from "@/app/schemas/prompt";
import { prisma } from "@/prisma";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const result = generateSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error, { status: 403 });
  }

  const data = result.data!;

  const { name, startDate, dueDate } = data;

  let prompt = `Create tasks for a project described: "${name}".`;

  if (data.assignees.length > 0) {
    const assignees = await prisma.collaborator.findMany({
      where: {
        id: { in: data.assignees },
      },
      include: { user: true },
    });
    prompt += ` The project has the following assignees: ${assignees
      .map((assignee) => `${assignee.user.name} - ${assignee.role}`)
      .join(", ")}.`;
  }

  prompt += ` The project starts on ${startDate} and is due on ${dueDate}.`;

  prompt += ` Please create a detailed task breakdown for this project, considering the timeframe.`;

  const { object } = await generateObject({
    model: google("gemini-1.5-pro-latest"),
    schema: data.assignees?.length ? promptSchemaWithAssignees : promptSchema,
    prompt,
  });

  return NextResponse.json(
    { message: "Content generated!", object },
    {
      status: 201,
    }
  );
}
