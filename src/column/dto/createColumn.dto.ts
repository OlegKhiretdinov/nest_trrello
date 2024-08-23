import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createColumnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class updateColumnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}
