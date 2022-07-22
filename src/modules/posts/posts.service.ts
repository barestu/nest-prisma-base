import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  create(userId: number, payload: CreatePostDto): Promise<Post> {
    return this.prismaService.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        author_id: userId,
      },
      include: {
        author: true,
      },
    });
  }

  findAll(): Promise<Post[]> {
    return this.prismaService.post.findMany({
      include: {
        author: true,
      },
    });
  }

  findOne(id: number): Promise<Post> {
    return this.prismaService.post.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdatePostDto): Promise<Post> {
    return this.prismaService.post.update({
      data,
      where: { id },
    });
  }

  remove(id: number): Promise<Post> {
    return this.prismaService.post.delete({
      where: { id },
    });
  }
}
