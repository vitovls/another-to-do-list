import Service, { ServicesError } from ".";
import TaskSchema, { Task } from "../../database/interfaces/Task";
import TaskModel from "../../database/models/Task.model";

export default class TaskService extends Service<Task> {
  constructor(model = new TaskModel()) {
    super(model);
  }

  create = async (data: Task): Promise<Task | null | ServicesError > => {
    const parsed = TaskSchema.safeParse(data);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(data)
  }

  findAll = async (): Promise<Task[] | ServicesError> => {
    return this.model.findAll();
  }

  findById = async (id: string): Promise<Task | null | ServicesError> => {
    return this.model.findById(id);
  }

  update = async (id: string, data: Task): Promise<Task | null | ServicesError> => {
    const parsed = TaskSchema.safeParse(data);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, data);
  }

  delete = async (id: string): Promise<Task | null | ServicesError> => {
    return this.model.delete(id);
  }
    
}