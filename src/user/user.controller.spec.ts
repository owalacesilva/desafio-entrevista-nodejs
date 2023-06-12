import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

// @ts-ignore
const repositoryMockFactory: () => MockType<Repository<User>> = jest.fn(() => ({
  find: jest.fn(entity => entity),
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  update: jest.fn(entity => entity),
  softDelete: jest.fn(entity => entity),
}));

describe('UserController', () => {
  let controller: UserController;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const test: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'USER_REPOSITORY',
          useFactory: repositoryMockFactory
        }
      ],
    }).compile();

    controller = test.get<UserController>(UserController);
    repositoryMock = test.get('USER_REPOSITORY');
  });

  describe('index', () => {
    it('should return all companies', () => {
      const user = { name: 'Walace Silva' };
      repositoryMock.find.mockReturnValue([user]);

      expect(controller.index()).toEqual([user]);
    });
  });
});
