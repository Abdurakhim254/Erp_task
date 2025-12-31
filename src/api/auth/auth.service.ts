import { AuthLoginDto, AuthRegisterdto, TokenResponseDto } from '@dtos';
import { Injectable } from '@nestjs/common';
import { Userservice } from '@services';

@Injectable()
export class AuthService {
  constructor(private readonly userService: Userservice) {}
  async register(createAuthDto: AuthRegisterdto) {
    const result = await this.userService.create(createAuthDto);
    return result;
  }

  async login(authLoginDto: AuthLoginDto) {
    const result = await this.userService.login(authLoginDto);

    return result;
  }

  async refresh(refreshTokenDto: TokenResponseDto) {
    const result = await this.userService.refresh(refreshTokenDto);

    return result;
  }
}
