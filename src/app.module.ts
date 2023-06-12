import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { UserModule } from './user/user.module';
import { ParkModule } from './park/park.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CompanyModule,
    VehicleModule,
    ParkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
