/* eslint-disable indent */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @ApiPropertyOptional()
  name?: string;

  @ApiProperty({ description: 'userName' })
  @ApiPropertyOptional()
  userName?: string;

  @ApiProperty({ description: 'The role of the user' })
  @ApiPropertyOptional()
  role?: string;

  @ApiProperty({ description: 'password' })
  @ApiPropertyOptional()
  password?: string;

  @ApiProperty({ description: 'password' })
  @ApiPropertyOptional()
  refreshToken?: string;

  @ApiProperty({ description: 'birthday' })
  @ApiPropertyOptional()
  birthday?: string;
}
