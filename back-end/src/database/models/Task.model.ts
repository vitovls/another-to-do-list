import { Schema, model as createModel, Document } from "mongoose";
import Model from ".";
import { Task } from "../interfaces/Task";

interface TaskDocument extends Task, Document {}

const taskSchema = new Schema({
  name: String,
  status: String,
  createdAt: Date,
}, {
  timestamps: true,
  versionKey: false,
});

class TaskModel extends Model<Task> {
  constructor(model = createModel("task_list", taskSchema)) {
    super(model);
  }
}

export default TaskModel;