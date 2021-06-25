import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewUserDto } from 'src/users/dto/new-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-guard.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'login with email and password and return access_token',
  })
  async login(@Request() req): Promise<JwtTokenResponse> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({
    summary: 'create new user with email and password and return access_token',
  })
  async register(@Body() newUserDto: NewUserDto): Promise<JwtTokenResponse> {
    return this.authService.register(newUserDto);
  }
}
