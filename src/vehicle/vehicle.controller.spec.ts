import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

// @ts-ignore
const repositoryMockFactory: () => MockType<Repository<Vehicle>> = jest.fn(() => ({
  find: jest.fn(entity => entity),
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  update: jest.fn(entity => entity),
  softDelete: jest.fn(entity => entity),
}));

describe('VehicleController', () => {
  let controller: VehicleController;
  let repositoryMock: MockType<Repository<Vehicle>>;

  beforeEach(async () => {
    const test: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        VehicleService,
        {
          provide: 'VEHICLE_REPOSITORY',
          useFactory: repositoryMockFactory
        }
      ],
    }).compile();

    controller = test.get<VehicleController>(VehicleController);
    repositoryMock = test.get('VEHICLE_REPOSITORY');
  });

  describe('index', () => {
    it('should return all companies', () => {
      const vehicle = { name: 'Walace Silva' };
      repositoryMock.find.mockReturnValue([vehicle]);

      expect(controller.index()).toEqual([vehicle]);
    });
  });
});
