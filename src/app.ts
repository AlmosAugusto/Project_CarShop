import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carRouter from './routes/car.route';
import motoRouter from './routes/moto.route';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motoRouter);

app.use(errorHandler);

export default app;
