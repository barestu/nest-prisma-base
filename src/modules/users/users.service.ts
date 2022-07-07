import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(payload: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  findOne(id: number): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      data,
      where: { id },
    });
  }

  remove(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
