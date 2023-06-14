import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User cannot found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User cannot found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(postData: Object) {
    return await this.userRepository.save(postData);
  }

  async update(user: User, id: number, postData: Object) {
    await this.userRepository.update(id, postData);
    return await this.getById(id);
  }

  async delete(id: number) {
    const user = await this.userRepository.delete(id);

    if (!user.affected) {
      throw new HttpException('User cannot found', HttpStatus.NOT_FOUND);
    }
  }
}