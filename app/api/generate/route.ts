import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const {
    name,
    assignees = [
      {
        email: "alejandro@weareproficient.com",
        name: "Alejandro",
      },
    ],
  } = await req.json();
  if (!name) {
    return NextResponse.json(
      { message: "Name is required" },
      {
        status: 400,
      }
    );
  }
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
    prompt: `Create tasks for a project described: "${name}".
    And with the following assignees: ${assignees
      .map((assignee: { email: string; name: string }) => assignee.name)
      .join(", ")}`,
  });

  console.log({ object });

  return NextResponse.json(
    { message: "Content generated!", object },
    {
      status: 201,
    }
  );
}
