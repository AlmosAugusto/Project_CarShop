import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { ErrorTypes } from '../errors/catalogs';
import { IMotorcycle, MotoZodZchema } from '../interfaces/IMotorcycle';

class MotoService implements IService<IMotorcycle> {
  private _moto: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._moto = model;
  }
  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotoZodZchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._moto.create(obj);
  }

  public async read(): Promise<IMotorcycle[]> {
    const car = await this._moto.read();
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async readOne(_id:string):Promise<IMotorcycle> {
    const car = await this._moto.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id:string, obj:IMotorcycle):Promise<IMotorcycle | null> {
    const parsed = MotoZodZchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._moto.update(_id, obj);
  }

  public async delete(_id:string):Promise<IMotorcycle | null> {
    const car = await this._moto.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return this._moto.delete(_id);
  }
}

export default MotoService;