import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { hash, genSalt } from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { id, password } = authCredentialsDto;
    const salt = await genSalt();
    const encryptedPassword = await hash(password, salt);

    try {
      await this.createQueryBuilder()
        .insert()
        .into(User, [
          'id',
          'password',
          'rating',
          'win_num',
          'lose_num',
          'profile',
        ])
        .values({
          id,
          password: encryptedPassword,
          rating: 1000,
          win_num: 0,
          lose_num: 0,
          profile: null,
        })
        .execute();
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('이미 존재하는 ID입니다.');
      }
    }
  }
}
