import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 200, description: 'success' })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get my user' })
  async getMe(@Request() req): Promise<User> {
    const me: User = await this.usersService.findByEmail(req.user.email);

    if (!me) {
      throw new NotFoundException('user does not exist');
    }

    me.password = null;
    return me;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async getOneById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  async updateOneById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'deleted' })
  async deleteOneById(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }
}
