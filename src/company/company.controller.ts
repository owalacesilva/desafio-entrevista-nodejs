import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { DuplicateEntryFilter } from 'src/exceptions/duplicate.exception.filter';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('companies')
@Controller('companies')
export class CompanyController {

  constructor(private readonly companyService: CompanyService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  index(@Request() request) {
    return this.companyService.findAll(request.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Show a company' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  show(@Request() request, @Param('id') id: string) {
    return this.companyService.findById(request.user, +id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a company' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @UseFilters(new DuplicateEntryFilter())
  create(@Request() request, @Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(request.user, createCompanyDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new DuplicateEntryFilter())
  @ApiOperation({ summary: 'Update a company' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  update(@Request() request, @Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(request.user, +id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a company' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  delete(@Request() request, @Param('id') id: string, @Res() res) {
    this.companyService.delete(request.user, +id);

    return res.status(HttpStatus.OK)
        .json({ "message": "Company was deleted successfully!" });
  }
}