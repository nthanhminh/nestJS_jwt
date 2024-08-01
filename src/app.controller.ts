import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    await this.appService.onModuleInit();
    return this.appService.getHello();
  }

  @Get('info')
  async getInfo(): Promise<string> {
    return 'Information';
  }
}
