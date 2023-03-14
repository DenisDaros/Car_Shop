// src/Models/CarODM.ts

import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import ICar from '../Interfaces/ICar';
  
class CarODM {
  private schema: Schema; // Atributo para o "molde"
  private model: Model<ICar>; // Atributo para criar coleção e fornecer acesso ao banco
  constructor() {
    const car = 'Car';
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models[car] || model('Car', this.schema); // Antes de criar o Schema, verificar se o schema já existe. Caso não exista, o schema será criado. 
  }
  
  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async find(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<ICar | null > {
    return this.model.findById(id);
  }
}
  
export default CarODM;