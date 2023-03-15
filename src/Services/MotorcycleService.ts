import Motorcycle from '../Domains/Motorcycle';
import IMotorcycles from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycles | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async insert(motorcycle: IMotorcycles) {
    const motorcyclesODM = new MotorcyclesODM();
    const newMotorcycles = await motorcyclesODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycles);
  }

  public async getAllMotorcycles() {
    const motorcyclesODM = new MotorcyclesODM();
    const motorcycle = await motorcyclesODM.find();

    const allMotorcycle = motorcycle.map((motorcycles) => ({ id: motorcycles.id,
      model: motorcycles.model,
      year: motorcycles.year,
      color: motorcycles.color,
      status: motorcycles.status,
      buyValue: motorcycles.buyValue,
      category: motorcycles.category,
      engineCapacity: motorcycles.engineCapacity }));

    return allMotorcycle;
  } 

  public async getMotorcyclesById(id: string) {
    const motorcyclesODM = new MotorcyclesODM();
    const motorcycle = await motorcyclesODM.findById(id);
    if (motorcycle) {
      return {
        id: motorcycle.id,
        model: motorcycle.model,
        year: motorcycle.year,
        color: motorcycle.color,
        status: motorcycle.status,
        buyValue: motorcycle.buyValue,
        category: motorcycle.category,
        engineCapacity: motorcycle.engineCapacity };
    }
    return null;
  }
}

export default MotorcycleService;