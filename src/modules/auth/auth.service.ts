import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { BcryptProvider } from 'src/providers/bcrypt.provider';
import { UsersService } from '../users/users.service';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptProvider: BcryptProvider,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isPasswordMatch = await this.bcryptProvider.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      return null;
    }
    return user;
  }

  async login(user: User) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: AuthRegisterDto) {
    const hashedPassword = await this.bcryptProvider.hash(data.password, 10);
    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }
}
