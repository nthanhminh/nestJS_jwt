import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationSchema,
  Notification,
} from './schemas/notification.schema';
import { TasksService } from './tasks.service';
import { NotificationService } from './notifications.service';
import { UsersModule } from 'src/users/user.module';
import { BullModule } from '@nestjs/bullmq';
import { NotificationController } from './notifications.controller';
import { BirthdayMessageProcessor } from './notifications.processor';
import { NotificationRepository } from './notifications.repository';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    BullModule.registerQueue({
      name: 'send-birthday-message',
    }),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationRepository,
    TasksService,
    NotificationService,
    BirthdayMessageProcessor,
  ],
  exports: [TasksService, NotificationService, NotificationRepository],
})
export class NotificationModule {}
