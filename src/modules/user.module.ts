import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userservice } from '@services';
import { UserEntity } from 'core';

import { GuardModule } from './guard.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), GuardModule],
  exports: [Userservice],
  providers: [Userservice],
})
export class UserModule {}
