import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @HttpCode(200)
  @Get()
  index() {
    return this.vehicleService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  show(@Param('id') id: string) {
    return this.vehicleService.findById(+id);
  }

  @Post()
  create() {
    return this.vehicleService.create({
      brand: 'Chevrolet',
      model: 'Camaro',
      color: 'Gray',
      registry: 'KDI2023',
      kind_of: 'automobile',
    });
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.vehicleService.update(+id, {
      brand: 'Chevrolet',
      model: 'Plus',
      color: 'Gray',
      registry: 'KDI2023',
      kind_of: 'automobile',
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res) {
    this.vehicleService.delete(+id);

    return res.status(HttpStatus.OK)
        .json({ "message": "Vehicle was deleted successfully!" });
  }
}