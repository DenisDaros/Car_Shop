import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  public id: string | undefined;
  protected model: string;
  public year: number;
  public color: string;
  public buyValue: number;
  public status: boolean | undefined;

  constructor(vehicle: IVehicle) {
    this.id = vehicle.id;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.buyValue = vehicle.buyValue;
    this.status = vehicle.status;
  }

  public getId() {
    return this.id;
  }

  public getModel() {
    return this.model;
  }

  public getColor() {
    return this.color;
  }

  public getYear() {
    return this.year;
  }

  public getStatus() {
    return this.status;
  }

  public getBuyValue() {
    return this.buyValue;
  }
}

export default Vehicle;