import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('birthday') birthday: Date,
    @Body('location') location: string,
  ): Promise<User> {
    return this.userService.createUser(firstName, lastName, birthday, location); 
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

}