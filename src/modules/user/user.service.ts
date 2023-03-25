import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(dto: CreateUserDto): string {
    const createdUser = { id: uuid(), ...dto };
    this.users.push(createdUser);
    return createdUser.id;
  }

  getAll(): User[] {
    return this.users;
  }

  getOne(id: string): User {
    const user = this.users.find(user => user.id === id);
    if (!user)
      throw new NotFoundException(`${id} ID 유저가 존재하지 않습니다.`);

    return user;
  }

  update(id: string, dto: UpdateUserDto) {
    const user = this.getOne(id);
    this.deleteOne(id);
    const newUser = { ...user, ...dto };
    this.users.push(newUser);
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.users = this.users.filter(user => user.id !== id);
    return true;
  }
}
