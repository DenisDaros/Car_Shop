import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Testando o Service Car', function () {
  const moto = 'Honda Cb 600f Hornet';
  it('testando se é possível inserir uma moto', async function () {
    const carInput: IMotorcycle = {
      model: moto,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
      
    };
    const carOutput: Motorcycle = new Motorcycle({
      model: moto,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new MotorcycleService();
    const result = await service.insert(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });
  it('testando se é possível listar todos as motos', async function () {
    const carInput: IMotorcycle[] = [{
      id: '1',
      model: moto,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600 }, {
      id: '2',
      model: moto,
      year: 2005,
      color: 'black',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600 }];
    const carOutput: IMotorcycle[] = [{
      id: '1',
      model: moto,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600 }, {
      id: '2',
      model: moto,
      year: 2005,
      color: 'black',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600 }];
    sinon.stub(Model, 'find').resolves(carInput);

    const service = new MotorcycleService();
    const result = await service.getAllMotorcycles();

    expect(result).to.be.deep.equal(carOutput);
  });
  it('testando se é possível listar motos pelo id', async function () {
    const carOutput: IMotorcycle = {
      id: '2',
      model: moto,
      year: 2005,
      color: 'black',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600 };
    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new MotorcycleService();
    const result = await service.getMotorcyclesById('2');

    expect(result).to.be.deep.equal(carOutput);
  });

  it('testando se não tiver o id listar retorna null', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const service = new MotorcycleService();
    const result = await service.getMotorcyclesById('2');

    expect(result).to.be.deep.equal(null);
  });

  afterEach(function () {
    sinon.restore();
  });
});