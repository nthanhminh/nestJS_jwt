import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue('send-birthday-message')
    private readonly birthdayQueue: Queue,
  ) {}

  async addBirthdayMessageJob(data: any) {
    await this.birthdayQueue.add('send-birthday-message', data);
  }
}
