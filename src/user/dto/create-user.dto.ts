import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({"message" : "O campo nome não pode ser vazio"})
  full_name: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo email não pode ser vazio"})
  email: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo senha não pode ser vazio"})
  password: string;
}