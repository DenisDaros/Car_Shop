import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async insert() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const insertMotorcycle = await this.service.insert(motorcycle);
      return this.res.status(201).json(insertMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAllMotorcycles() {
    try {
      const allMotorcycle = await this.service.getAllMotorcycles();
      return this.res.status(200).json(allMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
  
  public async getMotorcyclesById() {
    const { id } = this.req.params;
    try {
      const Regex = /^[a-f\d]{24}$/i;
      if (!Regex.test(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });
      const motorcycle = await this.service.getMotorcyclesById(id);
      if (!motorcycle) return this.res.status(404).json({ message: 'Motorcycle not found' });
      
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async updatedById() {
    const motorcycleBody: IMotorcycle = {
      ...this.req.body,
    };
    const { id } = this.req.params;
    try {
      const Regex = /^[a-f\d]{24}$/i;
      if (!Regex.test(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });

      const motorcycle = await this.service.updatedById(id, motorcycleBody);
      
      if (!motorcycle) return this.res.status(404).json({ message: 'Motorcycle not found' });
      
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}
  
export default MotorcycleController;
