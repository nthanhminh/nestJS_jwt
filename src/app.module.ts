import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './Roles/roles.guard';
import { UsersModule } from './users/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './Notifications/tasks.service';
import { NotificationModule } from './Notifications/notifications.module';
import { BullModule } from '@nestjs/bullmq';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
// import path from 'path';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/login'),
    ConfigModule.forRoot({
      isGlobal: true,
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
