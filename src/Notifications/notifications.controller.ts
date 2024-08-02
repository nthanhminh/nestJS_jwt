import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { NotificationService } from './notifications.service';
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
}
