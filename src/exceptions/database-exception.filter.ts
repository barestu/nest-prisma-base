import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const mappedException = this.mapTypeError(exception);
    const status = mappedException.getStatus();

    response.status(status).json({
      statusCode: status,
      message: mappedException.message,
    });
  }

  mapTypeError(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2000':
        return new BadRequestException();
      case 'P2002':
        return new ConflictException();
      case 'P2003':
        return new ConflictException();
      case 'P2025':
        return new NotFoundException();
      default:
        return new InternalServerErrorException('Database error');
    }
  }
}
