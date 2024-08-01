// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

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
}
