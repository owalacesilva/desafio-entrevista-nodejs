import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { DatabaseModule } from 'src/database/database.module';
import { vehicleProviders } from './vehicle.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [VehicleController],
  providers: [...vehicleProviders, VehicleService],
  exports: [VehicleService]
})
export class VehicleModule {}
