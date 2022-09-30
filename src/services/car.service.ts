import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { ErrorTypes } from '../errors/catalogs';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }
  public async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }

  public async read(): Promise<ICar[]> {
    const car = await this._car.read();
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }
}

export default CarService;