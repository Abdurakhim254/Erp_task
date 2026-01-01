import { AuthLoginDto, AuthRegisterdto, TokenResponseDto } from '@dtos';
import { Injectable } from '@nestjs/common';
import { TokenService, Userservice } from '@services';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: Userservice,
    private readonly jwtService: TokenService
    ) {}
  async register(createAuthDto: AuthRegisterdto) {
    const result = await this.userService.create(createAuthDto);
    return result;
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.userService.login(authLoginDto);

    const payload={
      id:user.id,
      email:user.email,
      role:user.role  
    }
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.createAccessToken(payload),
      this.jwtService.createRefreshToken(payload)
    ])
    return {
      message: 'User logged in successfully',
      access_token,
      refresh_token
    }
  }

  async refresh(refreshTokenDto: TokenResponseDto) {
    const payload = await this.jwtService.verifyRefreshToken(
      refreshTokenDto.refresh_token
    );

    delete payload.iat;
    delete payload.exp;
    
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.createAccessToken(payload),
      this.jwtService.createRefreshToken(payload)
    ])

    return {
      message: 'Token refreshed successfully',
      access_token,
      refresh_token
    };
  }
}
