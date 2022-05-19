import { Model as ModelMongoose, Document } from 'mongoose';

interface IModel<T> {
  create(data: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, data: T): Promise<T | null>;
  delete(id: string): Promise<T | null>;
  deleteAll(id: string): Promise<string>;
  findByCreatedAt(): Promise<T[]>;
  findByName(): Promise<T[]>;
  findByStatus(): Promise<T[]>;
}

export default abstract class Model<T> implements IModel<T> {
  constructor(protected model: ModelMongoose<T & Document>) { }

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  findAll = async (): Promise<T[]> => this.model.find();

  findById = async (id: string): Promise<T | null> => this.model.findById(id);

  update = async (id: string, data: T): Promise<T | null> => this.model.findByIdAndUpdate(id, { ...data }, { new: true });

  delete = async (id: string): Promise<T | null> => this.model.findByIdAndDelete(id);

  deleteAll = async (): Promise<string> => {
    await this.model.deleteMany({});
    return 'All tasks deleted';
  };

  findByCreatedAt = async (): Promise<T[]> => this.model.find().sort({ createdAt: 1 });

  findByName = async (): Promise<T[]> => this.model.find().sort({ name: -1 });

  findByStatus = async (): Promise<T[]> => this.model.find().sort({ status: 1 });
}
