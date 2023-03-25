import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiPropertyOptional({ description: '이름' })
  name: string;

  @IsNumber()
  @ApiPropertyOptional({ description: '나이' })
  age: number;
}
