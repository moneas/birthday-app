import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {
    console.log("uuuuuu")
  }

  async createUser(firstName: string, lastName: string, birthday: Date, location: string): Promise<User> {
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.birthday = birthday;
    newUser.location = location;

    return this.entityManager.save(User, newUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.entityManager
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }

  async getUsersByBirthday(month: number, day: number): Promise<User[]> {
    const query = this.entityManager.createQueryBuilder(User, 'user');
    query
      .where('MONTH(user.birthday) = :month', { month })
      .andWhere('DAY(user.birthday) = :day', { day });
    return query.getMany();
  }

}
