import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async insert() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const insertCar = await this.service.insert(car);
      return this.res.status(201).json(insertCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAllCars() {
    try {
      const allCars = await this.service.getAllCars();
      return this.res.status(200).json(allCars);
    } catch (error) {
      this.next(error);
    }
  }
  
  public async getCarById() {
    const { id } = this.req.params;
    try {
      const Regex = /^[a-f\d]{24}$/i;
      if (!Regex.test(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });
      const car = await this.service.getCarById(id);
      if (!car) return this.res.status(404).json({ message: 'Car not found' });
      
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }
  public async updatedById() {
    const carBody: ICar = {
      ...this.req.body,
    };
    const { id } = this.req.params;
    try {
      const Regex = /^[a-f\d]{24}$/i;
      if (!Regex.test(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });

      const car = await this.service.updatedById(id, carBody);
      
      if (!car) return this.res.status(404).json({ message: 'Car not found' });
      
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }
}
  
export default CarController;
