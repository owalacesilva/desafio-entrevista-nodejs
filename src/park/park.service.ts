import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Park } from './park.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ParkService {

  constructor(
    @Inject('PARK_REPOSITORY')
    private parkRepository: Repository<Park>
  ) {}

  async getAll(user: User, company_id: number): Promise<Park[]> {
    return this.parkRepository.find({
      order: {
        created_at: 'DESC'
      }
    });
  }

  async getById(user: User, id: number): Promise<Park> {
    const park = await this.parkRepository.findOneBy({ id });

    if (!park) {
      throw new NotFoundException('Park cannot found');
    }

    return park;
  }

  async optIn(user: User, postData: Object) {
    return await this.parkRepository.save(postData);
  }

  async optOut(user: User, id: number) {
    await this.parkRepository.update(id, { updated_at: Date() });
    return await this.getById(user, id);
  }
}