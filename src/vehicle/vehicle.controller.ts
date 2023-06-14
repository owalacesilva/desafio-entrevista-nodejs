import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseFilters, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { DuplicateEntryFilter } from 'src/exceptions/duplicate.exception.filter';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  index() {
    return this.vehicleService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  show(@Param('id') id: string) {
    return this.vehicleService.getById(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(new DuplicateEntryFilter())
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new DuplicateEntryFilter())
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Res() res) {
    this.vehicleService.delete(+id);

    return res.status(HttpStatus.OK)
        .json({ "message": "Vehicle was deleted successfully!" });
  }
}