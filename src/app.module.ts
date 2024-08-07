import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './Roles/roles.guard';
import { UsersModule } from './users/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './Notifications/tasks.service';
import { NotificationModule } from './Notifications/notifications.module';
// import { BullModule } from '@nestjs/bullmq';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bullmq';
import { UploadModule } from './Upload/upload.module';
import { CacheModule } from '@nestjs/cache-manager';
// import path from 'path';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    UploadModule,
    // MongooseModule.forRoot('mongodb://localhost:27017/login'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Nhập module cấu hình
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        // uri: 'mongodb://localhost:27017/login',
      }),
      inject: [ConfigService], // Đưa ConfigService vào trong hàm factory
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    NotificationModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: 'src/i18n/',
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    CacheModule.register(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          service: 'gmail',
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    TasksService,
  ],
})
export class AppModule {}
