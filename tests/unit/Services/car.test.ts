import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';

describe('Testando o Service Car', function () {
  it('testando se é possível inserir um carro', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car({
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5 });
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.insert(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });
  it('testando se é possível listar todos os carros', async function () {
    const carInput: ICar[] = [{
      id: '1',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5 }, {
      id: '2',
      model: 'Gol',
      year: 1900,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5 }];
    const carOutput: ICar[] = [{
      id: '1',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5 }, {
      id: '2',
      model: 'Gol',
      year: 1900,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5 }];
    sinon.stub(Model, 'find').resolves(carInput);

    const service = new CarService();
    const result = await service.getAllCars();

    expect(result).to.be.deep.equal(carOutput);
  });
  it('testando se é possível listar carros pelo id', async function () {
    const carOutput: ICar = {
      id: '1',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5 };
    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService();
    const result = await service.getCarById('1');

    expect(result).to.be.deep.equal(carOutput);
  });

  it('testando se não tiver id retorna null', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const service = new CarService();
    const result = await service.getCarById('1');

    expect(result).to.be.deep.equal(null);
  });
  afterEach(function () {
    sinon.restore();
  });
});