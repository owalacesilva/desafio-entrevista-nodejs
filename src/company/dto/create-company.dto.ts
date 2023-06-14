import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({"message" : "O campo nome não pode ser vazio"})
  name: string;

  @IsNotEmpty({"message" : "O campo cnpj não pode ser vazio"})
  company_identity: string;

  @IsNotEmpty({"message" : "O campo endereco não pode ser vazio"})
  address: string;

  @IsNotEmpty({"message" : "O campo telefone não pode ser vazio"})
  phone_number: string;

  @IsNotEmpty({"message" : "O campo quantidade de motos não pode ser vazio"})
  amount_motorcycles: number;

  @IsNotEmpty({"message" : "O campo quantidade carros não pode ser vazio"})
  amount_cars: number;
}