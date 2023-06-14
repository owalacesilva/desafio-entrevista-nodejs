import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseFilters, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { DuplicateEntryFilter } from 'src/exceptions/duplicate.exception.filter';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  index() {
    return this.vehicleService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Show a vehicle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  show(@Param('id') id: string) {
    return this.vehicleService.getById(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a vehicle' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @UseFilters(new DuplicateEntryFilter())
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new DuplicateEntryFilter())
  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  delete(@Param('id') id: string, @Res() res) {
    this.vehicleService.delete(+id);

    return res.status(HttpStatus.OK)
        .json({ "message": "Vehicle was deleted successfully!" });
  }
}