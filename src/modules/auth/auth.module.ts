import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthConfig } from 'src/config/auth.config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { BcryptProvider } from 'src/providers/bcrypt.provider';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const authConfig = configService.get<AuthConfig>('auth');
        return {
          secret: authConfig.secret,
          signOptions: {
            expiresIn: authConfig.expires,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, BcryptProvider],
})
export class AuthModule {}
