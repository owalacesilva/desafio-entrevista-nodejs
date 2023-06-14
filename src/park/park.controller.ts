import { Body, Controller, Get, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ParkService } from './park.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateParkDto } from './dto/create-park.dto';

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
  index(@Request() request, @Query('company_id') company_id) {
    return this.parkService.getAll(request.user, company_id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Show a park' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  show(@Request() request, @Param('id') id: string) {
    return this.parkService.getById(request.user, +id);
  }

  @Post('/in')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Opt in park' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  parkIn(@Request() request, @Body() createParkDto: CreateParkDto) {
    return this.parkService.optIn(request.user, createParkDto);
  }

  @Post(':id/out')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Opt out park' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  parkOut(@Request() request, @Param('id') id: string) {
    return this.parkService.optOut(request.user, +id);
  }
}