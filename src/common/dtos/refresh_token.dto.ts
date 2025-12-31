import { IsString } from 'class-validator';

export class TokenResponseDto {
  @IsString()
  refresh_token: string;
}
