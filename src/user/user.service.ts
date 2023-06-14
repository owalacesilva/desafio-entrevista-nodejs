import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new HttpException('User cannot found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new HttpException('User cannot found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(postData: Object) {
    return await this.userRepository.save(postData);
  }

  async update(id: number, postData: Object) {
    await this.userRepository.update(id, postData);
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new HttpException('User cannot found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async delete(id: number) {
    const user = await this.userRepository.delete(id);

    if (!user.affected) {
      throw new HttpException('User cannot found', HttpStatus.NOT_FOUND);
    }
  }
}