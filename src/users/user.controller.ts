import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from './dto/userResponse.dto';
import { Role } from 'src/Roles/enums/roles.enum';
import { Roles } from 'src/Roles/roles.decorator';
import { IUserRequest } from 'src/common/interfaces/requestType.interface';
// import { UserDocument } from './schemas/user.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Admin)
  @Post('createUser')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPasswd = await this.usersService.hashData(
      createUserDto.password,
    );
    const newData = {
      ...createUserDto,
      password: hashedPasswd,
    };
    return this.usersService.create(newData);
  }

  @Roles(Role.Admin)
  @Get('getAllUsers')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of users.',
    type: [UserResponse],
  })
  @ApiResponse({ status: 404, description: 'Users not found.' })
  async findAll() {
    const users = await this.usersService.findAll();
    const res = users.map((user) => {
      return {
        name: user.name,
        userName: user.userName,
        role: user.role,
      };
    });
    return res;
  }

  @Get('getInfo')
  @ApiOperation({ summary: 'Get infomation of user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of users.',
    type: [UserResponse],
  })
  async findById(@Req() req: IUserRequest) {
    const id = req.user['sub'];
    console.log(id);
    const user = await this.usersService.findById(id);
    return {
      name: user.name,
      userName: user.userName,
      role: user.role,
    };
  }

  @Roles(Role.Admin)
  @Patch('update/:id')
  @ApiOperation({ summary: 'update user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of users.',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(id, updateUserDto);
      return {
        status: 200,
        message: 'Successfully updated the user',
      };
    } catch (error) {
      return {
        message: 'error',
      };
    }
  }

  @Roles(Role.Admin)
  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
      return {
        status: 200,
        message: 'Successfully removed the user',
      };
    } catch (error) {
      return {
        message: 'error',
      };
    }
  }
}
