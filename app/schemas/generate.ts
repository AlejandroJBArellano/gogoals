import { z } from "zod";

const generateSchema = z.object({
  name: z.string(),
  assignees: z.array(z.string()).nonempty({
    message: "At least one assignee is required",
  }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Start date must be a valid ISO date",
  }),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Due date must be a valid ISO date",
  }),
});

export default generateSchema;
