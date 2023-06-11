import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {

  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findById(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: {
        id: id
      }
    });

    if (!company) {
      throw new HttpException('Company cannot found', HttpStatus.NOT_FOUND);
    }

    return company;
  }

  async create(postData: Object) {
    // const company = this.companyRepository.create({}); // company = new Company()

    return await this.companyRepository.save(postData);
  }

  async update(id: number, postData: Object) {
    await this.companyRepository.update(id, postData);
    const company = await this.companyRepository.findOne({
      where: {
        id: id
      }
    });

    if (!company) {
      throw new HttpException('Company cannot found', HttpStatus.NOT_FOUND);
    }

    return company;
  }

  async delete(id: number) {
    const company = await this.companyRepository.delete(id);

    if (!company.affected) {
      throw new HttpException('Company cannot found', HttpStatus.NOT_FOUND);
    }
  }
}