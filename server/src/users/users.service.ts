import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { NewUserDto } from './dto/new-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async create(newUser: NewUserDto): Promise<User> {
    const alreadyExistsUser = await this.findByEmail(newUser.email);

    if (alreadyExistsUser) {
      throw new ConflictException('user already exists');
    }

    const user = { id: nanoid(), ...newUser };
    this.users.push(user);

    console.log(this.users);
    return user;
  }

  async update(id: string, updates: UpdateUserDto): Promise<User> {
    const userTobeUpdatedIndex: number = this.users.findIndex(
      (user) => user.id === id,
    );

    const currentUser = this.users[userTobeUpdatedIndex];

    for (const [key, value] of Object.entries(updates)) {
      if (key !== 'password' && key !== 'id') {
        currentUser[key] = value;
      }
    }

    console.log(this.users);
    return currentUser;
  }

  async remove(id: string): Promise<void> {
    const newUsers = this.users.filter((user) => user.id !== id);
    this.users = newUsers;

    console.log(this.users);
    return;
  }
}
