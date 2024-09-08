import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from 'zod';
// generate a nextjs 14 route
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const { name } = body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    const { object } = await generateObject({
        model: openai("gpt-4-turbo"),
        schema: z.object({
          project: z.object({
            name: z.string(),
            tasks: z.array(z.string()),
          }),
        }),
        prompt: name,
      });

    return res.status(200).json({ message: `Hello ${name}`, object });
    }