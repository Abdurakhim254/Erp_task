import { Roles } from '@enums';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class AuthRegisterdto {
  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsStrongPassword()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Roles)
  role: Roles;
}
