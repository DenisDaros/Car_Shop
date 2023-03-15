import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcyclesController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).insert(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).getAllCars(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).getCarById(),
);

routes.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).updatedById(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).insert(),
);

export default routes;