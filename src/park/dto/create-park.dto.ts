import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateParkDto {
  @ApiProperty()
  @IsNotEmpty({"message" : "O campo empresa não pode ser vazio"})
  company_id: number;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo veiculo não pode ser vazio"})
  vehicle_id: number;
}