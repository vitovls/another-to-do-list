import { Request, Response } from "express"; 
import Service from "../services";
import { ErrorMessage } from "../utils/ErrorMessage";
import { StatusCode } from "../utils/StatusCode";

export type ResponseError = {
  error: unknown;
}

export interface RequestWithBody<T> extends Request {
  body: T;
}

export interface RequestWithQuery extends Request {
  query: {
    [key: string]: string;
  };
}
export default abstract class Controller<T> {
  abstract route: string;

  protected errors = ErrorMessage;

  constructor(protected service: Service<T>) {}

  abstract create(
    req: RequestWithBody<T>, res: Response<T | ResponseError>
  ): Promise<typeof res>;

  findAll = async (req: Request, res: Response<T[] | ResponseError>): Promise<typeof res> => {
    try {
      const data = await this.service.findAll();
      return res.status(StatusCode.OK).json(data);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  abstract findById(
    req: Request, res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: RequestWithBody<T>, res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract delete(
    req: Request, res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract findByQuery(
    req: RequestWithQuery, res: Response<T[] | ResponseError>
  ): Promise<typeof res>;

  abstract deleteAll(
    req: RequestWithQuery, res: Response<String | ResponseError>
  ): Promise<typeof res>;

}