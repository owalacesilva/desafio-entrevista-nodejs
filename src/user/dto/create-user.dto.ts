import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({"message" : "O campo nome não pode ser vazio"})
  full_name: string;

  @IsNotEmpty({"message" : "O campo email não pode ser vazio"})
  email: string;

  @IsNotEmpty({"message" : "O campo senha não pode ser vazio"})
  password: string;
}