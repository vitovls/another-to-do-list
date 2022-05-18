import { Request, Response } from "express";
import Controller, { RequestWithBody, ResponseError } from ".";
import { Task } from "../../database/interfaces/Task";
import TaskService from "../services/Task.services";
import { StatusCode } from "../utils/StatusCode";


export default class TaskController extends Controller<Task> {
  private _route: string = "/tasks";

  constructor(service = new TaskService()) {
    super(service);
  }

  get route(): string {
    return this._route;
  }

  create = async (req: RequestWithBody<Task>, res: Response<Task | ResponseError>): Promise<typeof res> => {
    const {body} = req;

    try {
      const data = await this.service.create(body);
      if(!data) {
        return res.status(StatusCode.BAD_REQUEST).json({error: "Task not created"});
      }
      if('error' in data) {
        return res.status(StatusCode.BAD_REQUEST).json(data);
      }
      return res.status(StatusCode.CREATED).json(data);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  findById = async (req: Request, res: Response<Task | ResponseError>): Promise<typeof res> => {
    const {params: {id}} = req;

    try {
      const data = await this.service.findById(id);
      if(!data) {
        return res.status(StatusCode.NOT_FOUND).json({error: "Task not found"});
      }
      if('error' in data) {
        return res.status(StatusCode.BAD_REQUEST).json(data);
      }
      return res.status(StatusCode.OK).json(data);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  update = async (req: RequestWithBody<Task>, res: Response<Task | ResponseError>): Promise<typeof res> => {
    const {params: {id}, body} = req;

    try {
      const data = await this.service.update(id, body);
      if(!data) {
        return res.status(StatusCode.NOT_FOUND).json({error: "Task not found"});
      }
      if('error' in data) {
        return res.status(StatusCode.BAD_REQUEST).json(data);
      }
      return res.status(StatusCode.OK).json(data);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  delete = async (req: Request, res: Response<Task | ResponseError>): Promise<typeof res> => {
    const {params: {id}} = req;

    try {
      const data = await this.service.delete(id);
      if(!data) {
        return res.status(StatusCode.NOT_FOUND).json({error: "Task not found"});
      }
      if('error' in data) {
        return res.status(StatusCode.BAD_REQUEST).json(data);
      }
      return res.status(StatusCode.OK).json(data);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
