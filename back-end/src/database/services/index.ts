import { ZodError } from "zod";
import Model from "../models";

export interface ServicesError {
  error: ZodError;
}

export default abstract class Service<T> {
  constructor (protected model: Model<T>) {}

  public async create (data: T): Promise<T | null | ServicesError> {
    return this.model.create(data);
  }

  public async findAll (): Promise<T[] | ServicesError> {
    return this.model.findAll();
  }

  public async findById (id: string): Promise<T | null | ServicesError> {
    return this.model.findById(id);
  }

  public async update (id: string, data: T): Promise<T | null | ServicesError> {
    return this.model.update(id, data);
  }

  public async delete (id: string): Promise<T | null | ServicesError> {
    return this.model.delete(id);
  }

}