import { AuthLoginDto, AuthRegisterdto, TokenResponseDto } from '@dtos';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRepository } from 'core';

import { TokenService } from './jwt.service';

@Injectable()
export class Userservice {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly jwtService: TokenService,
  ) {}

  async create(createAuthDto: AuthRegisterdto) {
    const olduser = await this.getUserByemail(createAuthDto.email);
    if (olduser) {
      throw new ConflictException('User already exists');
    }

    const newuser = this.userRepository.create(createAuthDto);

    return {
      message: 'User created successfully',
      user: await this.userRepository.save(newuser),
    };
  }

  async getUserByemail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.getUserByemail(authLoginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.createAccessToken(payload),
      this.jwtService.createRefreshToken(payload),
    ]);

    return {
      message: 'User logged in successfully',
      access_token,
      refresh_token,
    };
  }

  async refresh(refreshTokenDto: TokenResponseDto) {
    const payload = await this.jwtService.verifyRefreshToken(
      refreshTokenDto.refresh_token,
    );

    delete payload.iat;
    delete payload.exp;

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.createAccessToken(payload),
      this.jwtService.createRefreshToken(payload),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
