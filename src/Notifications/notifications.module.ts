import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationSchema,
  Notification,
} from './schemas/notification.schema';
import { TasksService } from './tasks.service';
import { NotificationService } from './notifications.service';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [TasksService, NotificationService],
  exports: [TasksService, NotificationService],
})
export class NotificationModule {}
