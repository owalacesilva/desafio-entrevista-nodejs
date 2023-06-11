import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

// @ts-ignore
const repositoryMockFactory: () => MockType<Repository<Company>> = jest.fn(() => ({
  find: jest.fn(entity => entity),
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  update: jest.fn(entity => entity),
  softDelete: jest.fn(entity => entity),
}));

describe('CompanyController', () => {
  let controller: CompanyController;
  let repositoryMock: MockType<Repository<Company>>;

  beforeEach(async () => {
    const test: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        CompanyService,
        {
          provide: 'COMPANY_REPOSITORY',
          useFactory: repositoryMockFactory
        }
      ],
    }).compile();

    controller = test.get<CompanyController>(CompanyController);
    repositoryMock = test.get('COMPANY_REPOSITORY');
  });

  describe('index', () => {
    it('should return all companies', () => {
      const company = { name: 'Walace Silva' };
      repositoryMock.find.mockReturnValue([company]);

      expect(controller.index()).toEqual([company]);
    });
  });
});
