import { Model, UpdateQuery, isValidObjectId } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalogs';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    const result = this._model.find();
    return result;
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) { throw new Error(ErrorTypes.InvalidMongoId); }
    
    return this._model.findOne({ _id });
  }
  
  public async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) { throw new Error(ErrorTypes.InvalidMongoId); }
    
    const result = this._model.findOneAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
    return result;
  }
  
  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) { throw new Error(ErrorTypes.InvalidMongoId); }

    const result = this._model.findOneAndDelete({ _id });
    return result;
  }
}

export default MongoModel;