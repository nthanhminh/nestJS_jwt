import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './Users/User.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/login'),
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
