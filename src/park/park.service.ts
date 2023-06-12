import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Park } from './park.entity';

@Injectable()
export class ParkService {

  constructor(
    @Inject('PARK_REPOSITORY')
    private parkRepository: Repository<Park>
  ) {}

  async findAll(): Promise<Park[]> {
    return this.parkRepository.find();
  }

  async findById(id: number): Promise<Park> {
    const park = await this.parkRepository.findOne({
      where: {
        id: id
      }
    });

    if (!park) {
      throw new HttpException('Park cannot found', HttpStatus.NOT_FOUND);
    }

    return park;
  }

  async create(postData: Object) {
    return await this.parkRepository.save(postData);
  }

  async update(id: number, postData: Object) {
    await this.parkRepository.update(id, postData);
    const park = await this.parkRepository.findOne({
      where: {
        id: id
      }
    });

    if (!park) {
      throw new HttpException('Park cannot found', HttpStatus.NOT_FOUND);
    }

    return park;
  }

  async delete(id: number) {
    const park = await this.parkRepository.delete(id);

    if (!park.affected) {
      throw new HttpException('Park cannot found', HttpStatus.NOT_FOUND);
    }
  }
}