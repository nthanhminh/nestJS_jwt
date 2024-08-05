import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from 'src/users/user.service';
import { NotificationService } from './notifications.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly userService: UsersService,
    private readonly notificationService: NotificationService,
  ) {}

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async handleCron() {
  //   const users = await this.userService.findAll();
  //   const tasks = users.filter((user) => {
  //     const birthday = user.birthday;
  //     if (!birthday) {
  //       return false;
  //     }
  //     const arr: string[] = birthday.split('-');
  //     const now = new Date();
  //     const currentDate = now.getDate();
  //     const currentMonth = now.getMonth() + 1;
  //     console.log(
  //       parseInt(arr[0]),
  //       parseInt(arr[1]),
  //       currentDate,
  //       currentMonth,
  //     );
  //     console.log(
  //       parseInt(arr[0]) === currentDate && parseInt(arr[1]) === currentMonth,
  //     );
  //     return (
  //       parseInt(arr[0]) === currentDate && parseInt(arr[1]) === currentMonth
  //     );
  //   });
  //   const newTasks = tasks.map((task) => {
  //     return this.notificationService.create({
  //       name: task.name,
  //       userName: task.name,
  //       userId: task._id,
  //       message: 'Happy birthday',
  //     });
  //   });

  //   await Promise.all(newTasks);
  //   console.log('Completed');
  //   this.logger.debug('Called every 30 seconds');
  // }

  // @Cron(CronExpression.EVERY_DAY_AT_6AM)
  // handleBirthDayNotification() {
  //   console.log('Happy birthday user!');
  //   this.logger.debug('Called every 30 seconds');
  // }
}
