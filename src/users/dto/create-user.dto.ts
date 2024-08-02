/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @ApiProperty({ description: 'userName' })
  userName: string;

  @ApiProperty({ description: 'The role of the user' })
  role: string;

  @ApiProperty({ description: 'password' })
  password: string;
}
