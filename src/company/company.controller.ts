import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @HttpCode(200)
  @Get()
  index() {
    return this.companyService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  show(@Param('id') id: string) {
    return this.companyService.findById(+id);
  }

  @Post()
  create() {
    return this.companyService.create({
      name: 'Parking Fast',
      company_identity: '000.000.0000/0',
      address: 'Av Paulista, 1000 - São Paulo',
      phone_number: '11966884422',
    });
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.companyService.update(+id, {
      name: 'Parking Low',
      company_identity: '000.000.0000/0',
      address: 'Av Paulista, 1000 - São Paulo',
      phone_number: '11966884422',
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res) {
    this.companyService.delete(+id);

    return res.status(HttpStatus.OK)
        .json({ "message": "Company was deleted successfully!" });
  }
}