import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { DuplicateEntryFilter } from 'src/exceptions/duplicate.exception.filter';

@Controller('companies')
export class CompanyController {

  constructor(private readonly companyService: CompanyService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  index(@Request() request) {
    return this.companyService.findAll(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  show(@Request() request, @Param('id') id: string) {
    return this.companyService.findById(request.user, +id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(new DuplicateEntryFilter())
  create(@Request() request, @Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(request.user, createCompanyDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new DuplicateEntryFilter())
  update(@Request() request, @Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(request.user, +id, updateCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() request, @Param('id') id: string, @Res() res) {
    this.companyService.delete(request.user, +id);

    return res.status(HttpStatus.OK)
        .json({ "message": "Company was deleted successfully!" });
  }
}