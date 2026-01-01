import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService, Userservice } from '@services';
import { UserEntity } from 'core';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [Userservice],
  providers: [Userservice,BcryptService],
})
export class UserModule {}
