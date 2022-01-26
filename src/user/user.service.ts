import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { hash } from '../utils/hash';
import { CheckDuplicateUserDto } from './dto/check-duplicate-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { id, password, profile } = createUserDto;

    const user = this.userRepository.create({
      id,
      password: await hash(password),
      rating: 1000,
      profile: profile || null,
      win_num: 0,
      lose_num: 0,
    });

    await this.userRepository.save(user);
    return user;
  }

  async checkDuplicateUser(checkDuplicateUserDto: CheckDuplicateUserDto) {
    const { id } = checkDuplicateUserDto;
    const user = await this.userRepository.findOne(id);
    if (user) {
      throw new HttpException(
        '이미 존재하는 ID입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      statusCode: 200,
      message: '사용가능한 ID입니다.',
    };
  }
}
