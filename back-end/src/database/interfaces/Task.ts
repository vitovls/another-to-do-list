import { z } from 'zod';

const TaskSchema = z.object({
  name: z.string(),
  status: z.string(),
});

type Task = z.infer<typeof TaskSchema>;

export default TaskSchema;
export type { Task };
