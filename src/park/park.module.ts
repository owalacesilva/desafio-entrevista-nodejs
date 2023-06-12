import { Module } from '@nestjs/common';
import { ParkController } from './park.controller';
import { ParkService } from './park.service';
import { DatabaseModule } from 'src/database/database.module';
import { parkProviders } from './park.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ParkController],
  providers: [...parkProviders, ParkService],
  exports: [ParkService]
})
export class ParkModule {}
