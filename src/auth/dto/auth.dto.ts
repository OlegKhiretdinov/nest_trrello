import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class authDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
