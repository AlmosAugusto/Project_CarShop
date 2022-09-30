import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motoMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,

}, { versionKey: false });

class MOTO extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('MOTO', motoMongooseSchema)) {
    super(model);
  }
}

export default MOTO;