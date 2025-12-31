import { Public } from '@decorators';
import { AuthLoginDto, AuthRegisterdto, TokenResponseDto } from '@dtos';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() createAuthDto: AuthRegisterdto) {
    return this.authService.register(createAuthDto);
  }

  @Public()
  @Post('login')
  login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() refreshTokenDto: TokenResponseDto) {
    return this.authService.refresh(refreshTokenDto);
  }
}
