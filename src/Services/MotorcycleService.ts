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
}

export default MotorcycleService;