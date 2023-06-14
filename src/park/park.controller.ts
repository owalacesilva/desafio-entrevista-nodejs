import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { ParkService } from './park.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';

@ApiBearerAuth()
@ApiTags('parks')
@Controller('parks')
export class ParkController {

  constructor(private readonly parkService: ParkService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all parks' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  index(@Request() request) {
    return this.parkService.getAll(request.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Show a park' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  show(@Request() request, @Param('id') id: string) {
    return this.parkService.getById(request.user, +id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a park' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  create(@Request() request, @Body() createParkDto: CreateParkDto) {
    return this.parkService.create(request.user, createParkDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a park' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  update(@Request() request, @Param('id') id: string, @Body() updateParkDto: UpdateParkDto) {
    return this.parkService.update(request.user, +id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a park' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  delete(@Request() request, @Param('id') id: string, @Res() res) {
    this.parkService.delete(request.user, +id);

    return res.status(HttpStatus.OK)
        .json({ "message": "Park was deleted successfully!" });
  }
}