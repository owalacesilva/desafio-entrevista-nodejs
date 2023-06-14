import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {

  constructor(
    @Inject('VEHICLE_REPOSITORY')
    private vehicleRepository: Repository<Vehicle>
  ) {}

  async getAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async getById(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOneBy({ id });

    if (!vehicle) {
      throw new HttpException('Vehicle cannot found', HttpStatus.NOT_FOUND);
    }

    return vehicle;
  }

  async create(postData: Object) {
    return await this.vehicleRepository.save(postData);
  }

  async update(id: number, postData: Object) {
    await this.vehicleRepository.update(id, postData);
    return await this.getById(id);
  }

  async delete(id: number) {
    const vehicle = await this.vehicleRepository.delete(id);

    if (!vehicle.affected) {
      throw new HttpException('Vehicle cannot found', HttpStatus.NOT_FOUND);
    }
  }
}