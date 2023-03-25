import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '이름' })
  name: string;

  @IsNumber()
  @ApiProperty({ description: '나이' })
  age: number;
}
