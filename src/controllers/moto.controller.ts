import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class MotoController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle>,
  ) {
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const moto = { model, year, color, buyValue, category, engineCapacity };

    const results = await this._service.create(moto);
    return res.status(201).json(results);
  }

  public async read(
    req: Request,
    res: Response<IMotorcycle[]>,
  ) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(
    req: Request,
    res: Response<IMotorcycle | null>,
  ) {
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async delete(
    req: Request,
    res: Response<IMotorcycle | null>,
  ) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result);
  }
}

export default MotoController;