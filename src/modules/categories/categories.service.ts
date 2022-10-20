import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: {
        name: data.name,
      },
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  update(id: number, data: UpdateCategoryDto) {
    return this.prismaService.category.update({
      data,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prismaService.category.delete({
      where: { id },
    });
  }
}
