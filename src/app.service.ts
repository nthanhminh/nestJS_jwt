import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly i18n: I18nService,
  ) {}

  async onModuleInit() {
    this.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    this.connection.on('error', (err) => {
      console.error('Error connecting to MongoDB', err);
    });

    this.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  getHello2(): string {
    return this.i18n.t('test.HELLO', { lang: I18nContext.current().lang });
  }
}
