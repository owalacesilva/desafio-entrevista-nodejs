import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ParkService } from './park.service';

@Controller('parks')
export class ParkController {
  constructor(private readonly parkService: ParkService) { }

  @HttpCode(200)
  @Get()
  index() {
    return this.parkService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  show(@Param('id') id: string) {
    return this.parkService.findById(+id);
  }

  @Post()
  create() {
    return this.parkService.create({});
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.parkService.update(+id, {});
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res) {
    this.parkService.delete(+id);

    return res.status(HttpStatus.OK)
        .json({ "message": "Park was deleted successfully!" });
  }
}