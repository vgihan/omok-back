import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    const { id, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ id });

    if (user && (await compare(password, user.password))) {
      const payload = { id };
      const token = this.jwtService.sign(payload);

      return { token };
    } else {
      throw new UnauthorizedException('로그인에 실패하였습니다.');
    }
  }
}
