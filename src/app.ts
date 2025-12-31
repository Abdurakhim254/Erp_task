import { AppConfigOptions, appConfig } from '@config';
import { AuthGuard } from '@guards';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'api/auth/auth.module';
import { ProductsModule } from 'api/products/products.module';
import { GuardModule } from 'modules/guard.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    JwtModule.register({ global: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => {
        const app = configservice.get<AppConfigOptions>('app');

        if (!app) {
          throw new Error('App config is not loaded');
        }

        return {
          type: 'postgres',
          url: app.db_url,
          entities: ['dist/core/entity/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    GuardModule,
    AuthModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
