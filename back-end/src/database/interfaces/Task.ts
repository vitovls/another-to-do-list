import { z } from 'zod';

const TaskSchema = z.object({
  name: z.string(),
  status: z.string(),
  createdAt: z.date(),
});

type Task = z.infer<typeof TaskSchema>;

export default TaskSchema;
export type { Task };
