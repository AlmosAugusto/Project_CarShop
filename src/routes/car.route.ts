import { Router, Request, Response } from 'express';
import CarController from '../controllers/car.controller';
import CarModel from '../models/car.model';
import CarService from '../services/car.service';

const route = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

route.post('/cars', (req: Request, res: Response) =>
  carController.create(req, res));
route.get('/cars', (req: Request, res: Response) =>
  carController.read(req, res));  

export default route;