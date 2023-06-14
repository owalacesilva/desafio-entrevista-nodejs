import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty()
  @IsNotEmpty({"message" : "O campo marca não pode ser vazio"})
  brand: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo modelo não pode ser vazio"})
  model: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo cor não pode ser vazio"})
  color: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo placa não pode ser vazio"})
  registry: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo type de motos não pode ser vazio"})
  kind_of: number;
}