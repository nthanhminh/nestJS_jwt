import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import * as dotenv from 'dotenv';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { BullModule } from '@nestjs/bullmq';
import { VerifyService } from './verify.service';
import { VerifyProcessor } from './verify.processor';

dotenv.config();

console.log(process.env.JWT_SECRET);

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: '60s' },
    }),
    BullModule.registerQueue({
      name: 'verify-email',
    }),
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    VerifyService,
    VerifyProcessor,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('info');
  }
}
