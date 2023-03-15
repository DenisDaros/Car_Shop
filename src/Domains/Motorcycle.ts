import IMotorcycle from '../Interfaces/IMotorcycle';

class Motorcycle {
  public id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;
  private category: string;
  private engineCapacity: number;
  
  // constructor não permite mais de 8 parametros por isso a criação de um paramentro de objeto com o tipo de interface Icar
  constructor(motorcycles: IMotorcycle) {
    this.id = motorcycles.id;
    this.model = motorcycles.model;
    this.year = motorcycles.year;
    this.color = motorcycles.color;
    this.status = motorcycles.status;
    this.buyValue = motorcycles.buyValue;
    this.category = motorcycles.category;
    this.engineCapacity = motorcycles.engineCapacity;
  }

  public getId(): string | undefined {
    return this.id;
  }
  public setId(value: string | undefined) {
    this.id = value;
  }

  public getModel(): string {
    return this.model;
  }
  public setModel(value: string) {
    this.model = value;
  }

  public getYear(): number {
    return this.year;
  }
  public setYear(value: number) {
    this.year = value;
  }

  public getColor(): string {
    return this.color;
  }
  public setColor(value: string) {
    this.color = value;
  }

  public getStatus(): boolean | undefined {
    return this.status;
  }
  public setStatus(value: boolean | undefined) {
    this.status = value;
  }

  public getBuyValue(): number {
    return this.buyValue;
  }
  public setBuyValue(value: number) {
    this.buyValue = value;
  }

  public getDoorsQty(): string {
    return this.category;
  }
  public setDoorsQty(value: string) {
    this.category = value;
  }

  public getengineCapacity(): number {
    return this.engineCapacity;
  }
  public setengineCapacity(value: number) {
    this.engineCapacity = value;
  }
}

export default Motorcycle;