import { z } from "zod";

export const promptSchemaWithAssignees = z.object({
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
});

export const promptSchema = z.object({
  project: z.object({
    name: z.string(),
    tasks: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        priority: z.string(),
      })
    ),
  }),
});
