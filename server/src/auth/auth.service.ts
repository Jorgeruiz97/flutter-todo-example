import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { NewUserDto } from 'src/users/dto/new-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      const result = user;

      result.password = undefined;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<JwtTokenResponse> {
    return {
      ...user,
      access_token: this.jwtService.sign(user),
    };
  }

  async register(newUser: NewUserDto): Promise<JwtTokenResponse> {
    const user: User = await this.usersService.create(newUser);
    return {
      ...user,
      access_token: this.jwtService.sign(user),
    };
  }
}
