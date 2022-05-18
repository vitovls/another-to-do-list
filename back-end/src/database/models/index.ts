import {Model as ModelMongoose, Document} from 'mongoose';

interface IModel<T> {
  create(data: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, data: T): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}

export default abstract class Model<T> implements IModel<T> {
  constructor(protected model: ModelMongoose<T & Document>) { }

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  findAll = async (): Promise<T[]> => this.model.find();

  findById = async (id: string): Promise<T | null> => this.model.findById(id);

  update = async (id: string, data: T): Promise<T | null> => this.model.findByIdAndUpdate(id, {...data}, { new: true });

  delete = async (id: string): Promise<T | null> => this.model.findByIdAndDelete(id);
}
