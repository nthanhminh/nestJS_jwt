import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseFilters,
  Inject,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from './dto/userResponse.dto';
import { Role } from 'src/Roles/enums/roles.enum';
import { Roles } from 'src/Roles/roles.decorator';
import { IUserRequest } from 'src/common/interfaces/requestType.interface';
import {
  I18nService,
  I18nContext,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Roles(Role.Admin)
  @Post('createUser')
  @UseFilters(new I18nValidationExceptionFilter())
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const hashedPasswd = await this.usersService.hashData(
        createUserDto.password,
      );
      const newData = {
        ...createUserDto,
        password: hashedPasswd,
      };
      await this.usersService.create(newData);
      return {
        status: 200,
        // description: 'User successfully created.',
        description: await this.i18n.t('test.UserSuccessfullyCreated', {
          lang: I18nContext.current().lang,
        }),
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        description: await this.i18n.t('test.Bad Request', {
          lang: I18nContext.current().lang,
        }),
      };
    }
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
    try {
      const cachedUsers = await this.cacheManager.get('users');

      if (cachedUsers) {
        return cachedUsers;
      }

      const users = await this.usersService.findAll();
      const formattedUsers = users.map((user) => ({
        name: user.name,
        userName: user.userName,
        role: user.role,
      }));

      await this.cacheManager.set('users', formattedUsers);

      return formattedUsers;
    } catch (error) {
      return {
        status: 404,
        description: 'Users not found.',
      };
    }
  }

  @Get('getInfo')
  @ApiOperation({ summary: 'Get infomation of user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of users.',
    type: [UserResponse],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  async findById(@Req() req: IUserRequest) {
    try {
      const id = req.user['sub'];
      console.log(id);
      const user = await this.usersService.findById(id);
      return {
        name: user.name,
        userName: user.userName,
        role: user.role,
      };
    } catch (error) {
      return { status: 400, description: 'Users not found.' };
    }
  }

  @Roles(Role.Admin)
  @Patch('update/:id')
  @ApiOperation({ summary: 'update user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of users.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(id, updateUserDto);
      return {
        status: 200,
        message: 'Successfully updated the user',
      };
    } catch (error) {
      return { status: 400, description: 'Bad request.' };
    }
  }

  @Roles(Role.Admin)
  @Delete('remove/:id')
  @ApiOperation({ summary: 'remove user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed the user.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
      return {
        status: 200,
        message: 'Successfully removed the user',
      };
    } catch (error) {
      return { status: 400, description: 'Bad request.' };
    }
  }
}
