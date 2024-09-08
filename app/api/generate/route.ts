import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const { name } = await req.json();
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
        tasks: z.array(z.string()),
      }),
    }),
    prompt: name,
  });

  return NextResponse.json(
    { message: "Content generated!", object },
    {
      status: 201,
    }
  );
}
