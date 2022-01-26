import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;

  const users = [];
  const mockUserService = {
    createUser: jest.fn((dto) => {
      const { id, password, profile } = dto;
      if (dto.id.length < 6 || dto.id.length > 15)
        return {
          statusCode: 400,
          message: ['ID는 6자리 이상, 15자리 이하여야 합니다.'],
          error: 'Bad Request',
        };
      if (dto.password.length < 6 || dto.password.length > 15)
        return {
          statusCode: 400,
          message: ['Password는 8자리 이상, 15자리 이하여야 합니다.'],
          error: 'Bad Request',
        };
      const newUser = {
        id,
        password,
        profile: profile || null,
        win_num: 0,
        lose_num: 0,
        rating: 1000,
      };
      users.push(newUser);
      return newUser;
    }),
    checkDuplicateUser: jest.fn((dto) => {
      if (dto.id.length < 6 || dto.id.length > 15)
        return {
          statusCode: 400,
          message: ['ID는 6자리 이상, 15자리 이하여야 합니다.'],
          error: 'Bad Request',
        };
      if (users.some((user) => user.id === dto.id)) {
        return {
          statusCode: 400,
          message: '이미 존재하는 ID입니다.',
        };
      }
      return {
        statusCode: 200,
        message: '사용가능한 ID입니다.',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(
      controller.createUser({ id: 'vgihan', password: '254425', profile: '' }),
    ).toEqual({
      id: expect.any(String),
      password: expect.any(String),
      profile: null,
      lose_num: 0,
      win_num: 0,
      rating: 1000,
    });
  });

  it('should check duplication user', () => {
    const first = controller.checkDuplicateUser({ id: 'testtest' });
    controller.createUser({ id: 'testtest', password: '254425', profile: '' });
    const second = controller.checkDuplicateUser({ id: 'testtest' });

    expect(first).toEqual({
      statusCode: 200,
      message: '사용가능한 ID입니다.',
    });

    expect(second).toEqual({
      statusCode: 400,
      message: '이미 존재하는 ID입니다.',
    });
  });
});
