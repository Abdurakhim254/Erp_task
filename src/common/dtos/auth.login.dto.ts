import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsStrongPassword()
  @IsString()
  password: string;
}
