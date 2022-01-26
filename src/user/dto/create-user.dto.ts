import { Length } from 'class-validator';
import { CheckDuplicateUserDto } from './check-duplicate-user.dto';

export class CreateUserDto extends CheckDuplicateUserDto {
  @Length(8, 15, { message: 'ID는 8자리 이상, 15자리 이하여야 합니다.' })
  password: string;

  profile: string;
}
