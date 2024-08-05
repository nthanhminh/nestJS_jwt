import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { NotificationService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
// import { UsersService } from 'src/users/user.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly notificationService: NotificationService,
  ) {}

  @Get()
  async getAllNotifications() {
    return 'Testing';
  }

  @Post('test')
  async test(@Body() createNotificationDto: CreateNotificationDto) {
    await this.notificationService.addBirthdayMessageJob(createNotificationDto);
    return 'testing';
  }
}
