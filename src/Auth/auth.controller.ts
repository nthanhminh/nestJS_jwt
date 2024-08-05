import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';
import { RefreshTokenGuard } from './guards/refresh.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
interface IUserRequest extends Request {
  user: any;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in.',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  signup(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.signUp(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in.',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiOperation({ summary: 'Refresh tokens using the refresh token' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in.',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  refreshTokens(@Req() req: IUserRequest) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    console.log(userId, refreshToken);
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string): Promise<string> {
    // You can access the 'token' query parameter here
    console.log('Received token:', token);
    const check = await this.authService.verifyEmail(token);
    if (check) {
      return 'Successful verify email';
    } else {
      return 'Error verify emaail';
    }
  }
}
