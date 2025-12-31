import { AppConfigOptions } from '@config';
import { AuthGuard } from '@guards';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '@services';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const app = configService.get<AppConfigOptions>('app');

        if (!app) {
          throw new Error('App config not loaded');
        }

        return {
          secret: app.JWT_ACCESS_SECRET,
          signOptions: {
            expiresIn: app.JWT_ACCESS_TIME,
          },
        };
      },
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const app = configService.get<AppConfigOptions>('app');

        if (!app) {
          throw new Error('App config not loaded');
        }

        return {
          secret: app.JWT_REFRESH_SECRET,
          signOptions: {
            expiresIn: app.JWT_REFRESH_TIME,
          },
        };
      },
    }),
  ],
  providers: [TokenService, AuthGuard],
  exports: [TokenService, AuthGuard],
})
export class GuardModule {}
