import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { IUserRequest } from './common/interfaces/requestType.interface';
import { Roles } from './Roles/roles.decorator';
import { Role } from './Roles/enums/roles.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    await this.appService.onModuleInit();
    return this.appService.getHello();
  }

  @Roles(Role.User)
  @Get('info')
  async getInfo(@Req() req: IUserRequest): Promise<string> {
    console.log(req.user);
    return `Information ${req.user}`;
  }

  @Get('hello')
  async getHello2(): Promise<string> {
    return this.appService.getHello2();
  }
}
