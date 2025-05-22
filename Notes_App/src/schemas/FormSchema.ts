import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tags: z.array(
    z.object({
      label: z.string(),
      id: z.string(),
    })
  ).optional(),
});
