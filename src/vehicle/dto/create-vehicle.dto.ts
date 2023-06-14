import { IsNotEmpty } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty({"message" : "O campo marca não pode ser vazio"})
  brand: string;

  @IsNotEmpty({"message" : "O campo modelo não pode ser vazio"})
  model: string;

  @IsNotEmpty({"message" : "O campo cor não pode ser vazio"})
  color: string;

  @IsNotEmpty({"message" : "O campo placa não pode ser vazio"})
  registry: string;

  @IsNotEmpty({"message" : "O campo type de motos não pode ser vazio"})
  kind_of: number;
}