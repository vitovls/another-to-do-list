import CustomRouter from ".";
import { Task } from "../../database/interfaces/Task";
import TaskController from "../controllers/Task.controller";

const taskController = new TaskController();

const taskRouter = new CustomRouter<Task>();

taskRouter.addRoute(taskController);

export default taskRouter;