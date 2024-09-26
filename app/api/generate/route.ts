import generateSchema from "@/app/schemas/generate";
import { prisma } from "@/prisma";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();
  const result = generateSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error, { status: 403 });
  }

  const data = result.data!;

  const { name, startDate, dueDate } = data;

  const assignees = await prisma.collaborator.findMany({
    where: {
      id: { in: data.assignees },
    },
    include: { user: true },
  });

  let prompt = `Create tasks for a project described: "${name}".`;

  if (assignees.length > 0) {
    prompt += ` The project has the following assignees: ${assignees
      .map((assignee) => `${assignee.user.name} - ${assignee.role}`)
      .join(", ")}.`;
  }

  prompt += ` The project starts on ${startDate} and is due on ${dueDate}.`;

  prompt += ` Please create a detailed task breakdown for this project, considering the timeframe and available assignees.`;

  const { object } = await generateObject({
    model: google("gemini-1.5-pro-latest"),
    schema: z.object({
      project: z.object({
        name: z.string(),
        tasks: z.array(
          z.object({
            name: z.string(),
            description: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            priority: z.string(),
            assignees: z.array(z.string()),
          })
        ),
      }),
    }),
    prompt,
  });

  console.log({ object });

  return NextResponse.json(
    { message: "Content generated!", object },
    {
      status: 201,
    }
  );
}
