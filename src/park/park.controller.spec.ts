import { Test, TestingModule } from '@nestjs/testing';
import { ParkController } from './park.controller';
import { ParkService } from './park.service';
import { Park } from './park.entity';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

// @ts-ignore
const repositoryMockFactory: () => MockType<Repository<Park>> = jest.fn(() => ({
  find: jest.fn(entity => entity),
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  update: jest.fn(entity => entity),
  softDelete: jest.fn(entity => entity),
}));

describe('ParkController', () => {
  let controller: ParkController;
  let repositoryMock: MockType<Repository<Park>>;

  beforeEach(async () => {
    const test: TestingModule = await Test.createTestingModule({
      controllers: [ParkController],
      providers: [
        ParkService,
        {
          provide: 'PARK_REPOSITORY',
          useFactory: repositoryMockFactory
        }
      ],
    }).compile();

    controller = test.get<ParkController>(ParkController);
    repositoryMock = test.get('PARK_REPOSITORY');
  });

  describe('index', () => {
    it('should return all companies', () => {
      const park = { name: 'Walace Silva' };
      repositoryMock.find.mockReturnValue([park]);

      expect(controller.index()).toEqual([park]);
    });
  });
});
