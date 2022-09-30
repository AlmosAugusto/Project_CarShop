import { Router, Request, Response } from 'express';
import MotoController from '../controllers/moto.controller';
import MotoModel from '../models/moto.model';
import MotoService from '../services/moto.service';

const route = Router();

const motoModel = new MotoModel();
const motoService = new MotoService(motoModel);
const motoController = new MotoController(motoService);
const id = '/motorcycles/:id';

route.post('/motorcycles', (req: Request, res: Response) => motoController.create(req, res));
route.get('/motorcycles', (req: Request, res: Response) => motoController.read(req, res));
route.get(id, (req: Request, res: Response) => motoController.readOne(req, res)); 
route.put(id, (req: Request, res: Response) => motoController.update(req, res));     
route.delete(id, (req: Request, res: Response) => motoController.delete(req, res));     

export default route;