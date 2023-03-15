import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import IMotorcycles from '../Interfaces/IMotorcycle';
    
class MotorcyclesODM {
  private schema: Schema; // Atributo para o "molde"
  private model: Model<IMotorcycles>; // Atributo para criar coleção e fornecer acesso ao banco
  constructor() {
    const motorcycle = 'Motorcycle';
    this.schema = new Schema<IMotorcycles>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    this.model = models[motorcycle] || model('Motorcycle', this.schema); // Antes de criar o Schema, verifIMotorcycles se o schema já existe. Caso não exista, o schema será criado. 
  }
    
  public async create(motorcycles: IMotorcycles): Promise<IMotorcycles> {
    return this.model.create({ ...motorcycles });
  }
  
  public async find(): Promise<IMotorcycles[]> {
    return this.model.find();
  }
  
  public async findById(id: string): Promise<IMotorcycles | null > {
    return this.model.findById(id);
  }
  
  public async update(id: string, body: IMotorcycles): Promise<IMotorcycles | null > {
    return this.model.findByIdAndUpdate(id, {
      model: body.model,
      year: body.year,
      color: body.color,
      status: body.status,
      buyValue: body.buyValue,
      category: body.category,
      engineCapacity: body.engineCapacity }, { new: true });
  }
}
    
export default MotorcyclesODM;