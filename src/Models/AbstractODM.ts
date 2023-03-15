import { Model, UpdateQuery } from 'mongoose';
import IAbstractODM from '../Interfaces/IObstractODM';

abstract class AbstractODM<T> implements IAbstractODM<T> {
  protected _model: Model<T>;
  constructor(model: Model<T>) { this._model = model; }

  public async create(object: T): Promise<T> {
    return this._model.create({ ...object });
  }

  public async getAll(): Promise<T[]> {
    return this._model.find();
  }

  public async getById(_id: string): Promise<T | null> {
    return this._model.findOne({ _id });
  }

  public async update(_id: string, object: T): Promise<T> {
    const updated = await this
      ._model.findByIdAndUpdate(_id, { ...object as UpdateQuery<T>, _id }, { new: true }) as T;
    return updated;
  }
}

export default AbstractODM;