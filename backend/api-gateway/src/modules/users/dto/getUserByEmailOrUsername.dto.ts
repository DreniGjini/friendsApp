import { IsEmail, IsString, ValidateIf } from 'class-validator';

export class GetUserByEmailOrUsername {
  @ValidateIf((o) => !o.email)
  @IsString()
  username?: string;

  @ValidateIf((o) => !o.username)
  @IsEmail()
  email?: string;
}
