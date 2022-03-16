import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from '../user/user.repository';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { id, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ id });

    if (!user || !(await compare(password, user.password)))
      throw new UnauthorizedException('로그인에 실패하였습니다.');

    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return { token };
  }
}
