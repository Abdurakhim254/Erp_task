import { AppConfigOptions } from '@config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private get app(): AppConfigOptions {
    const config = this.configService.get<AppConfigOptions>('app');

    if (!config) {
      throw new Error('App config is not loaded');
    }

    return config;
  }

  createAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.app.JWT_ACCESS_SECRET,
      expiresIn: this.app.JWT_ACCESS_TIME,
    });
  }

  createRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.app.JWT_REFRESH_SECRET,
      expiresIn: this.app.JWT_REFRESH_TIME,
    });
  }
  async verifyAccessToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.app.JWT_ACCESS_SECRET,
      });
      return payload;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.app.JWT_REFRESH_SECRET,
      });
      return payload;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
