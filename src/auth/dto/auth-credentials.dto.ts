import { Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @Length(6, 15, { message: 'ID는 6자리 이상, 15자리 이하여야 합니다.' })
  id: string;

  @Length(8, 15, { message: 'Password는 8자리 이상, 15자리 이하여야 합니다.' })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '영어와 숫자로 이루어진 비밀번호를 작성해주세요.',
  })
  password: string;
}
