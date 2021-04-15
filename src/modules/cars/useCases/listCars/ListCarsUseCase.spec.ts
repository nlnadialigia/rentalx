import crypto from 'crypto';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryinMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let listCarUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const generate = () => {
  return crypto.randomBytes(8).toString('hex');
};

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 100,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate()
    });

    const cars = await listCarUseCase.execute();

    expect(cars).toEqual([car]);
  });
});