import { Length } from 'class-validator';

export class CheckDuplicateUserDto {
  @Length(6, 15, { message: 'ID는 6자리 이상, 15자리 이하여야 합니다.' })
  id: string;
}
