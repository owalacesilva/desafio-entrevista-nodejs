import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CompanyService {

  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>
  ) {}

  async findAll(user: User): Promise<Company[]> {
    return this.companyRepository.find({
      where: {
        user: {
          id: user.id
        }
      },
      order: {
        created_at: 'DESC'
      }
    });
  }

  async findById(user: User, id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: {
        id: id,
        user: {
          id: user.id
        }
      }
    });

    if (!company) {
      throw new HttpException('Company cannot found', HttpStatus.NOT_FOUND);
    }

    return company;
  }

  async create(user: User, postData: Object) {
    console.log(user)
    return await this.companyRepository.save({
      user: {
        id: user.id
      },
      ...postData
    });
  }

  async update(user: User, id: number, postData: Object) {
    await this.companyRepository.update(id, {
      user: {
        id: user.id
      },
      ...postData
    });
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

  async delete(user: User, id: number) {
    const company = await this.companyRepository.delete(id);

    if (!company.affected) {
      throw new HttpException('Company cannot found', HttpStatus.NOT_FOUND);
    }
  }
}