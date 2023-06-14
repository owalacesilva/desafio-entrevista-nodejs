import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty({"message" : "O campo nome não pode ser vazio"})
  name: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo cnpj não pode ser vazio"})
  company_identity: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo endereco não pode ser vazio"})
  address: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo telefone não pode ser vazio"})
  phone_number: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo quantidade de motos não pode ser vazio"})
  amount_motorcycles: number;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo quantidade carros não pode ser vazio"})
  amount_cars: number;
}