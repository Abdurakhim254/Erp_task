import { AuthLoginDto, AuthRegisterdto, TokenResponseDto } from '@dtos';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRepository } from 'core';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class Userservice {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly bcryptservice: BcryptService
  ) {}

  async create(createAuthDto: AuthRegisterdto) {
    const olduser = await this.getUserByemail(createAuthDto.email);
    if (olduser) {
      throw new ConflictException('User already exists');
    }

    createAuthDto.password=await this.bcryptservice.hashPassword(createAuthDto.password);
    const newuser = this.userRepository.create(createAuthDto);

    return {
      message: 'User created successfully',
      user: await this.userRepository.save(newuser)
    };
  }

  async getUserByemail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.getUserByemail(authLoginDto.email);
    if (!user) {
      throw new NotFoundException('Email or password is incorrect');
    }

    const isPasswordMatch = await this.bcryptservice.comparePassword(
      authLoginDto.password,
      user.password
    );
    if (!isPasswordMatch) {
      throw new NotFoundException('Email or password is incorrect');
    }

    return user;
  }

  
}
