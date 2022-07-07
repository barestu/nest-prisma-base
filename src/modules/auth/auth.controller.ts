import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: AuthLoginDto })
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  public login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  register(@Body() data: AuthRegisterDto) {
    return this.authService.register(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public getProfile(@Request() req) {
    return req.user;
  }
}
