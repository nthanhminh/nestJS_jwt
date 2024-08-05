import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationRepository } from './notifications.repository';

@Processor('send-birthday-message')
export class BirthdayMessageProcessor extends WorkerHost {
  constructor(private readonly notificationRepository: NotificationRepository) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    const mes = await this.notificationRepository.test();
    console.log(mes, job.data.birthdayMessageta);
    this.notificationRepository.create(job.data);
  }
}
