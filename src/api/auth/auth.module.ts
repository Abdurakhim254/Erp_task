import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GuardModule } from 'modules/guard.module';

@Module({
  imports: [UserModule,GuardModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
