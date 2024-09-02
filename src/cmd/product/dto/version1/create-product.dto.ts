import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsInt } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop' })
  @IsString()
  name: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'A high-performance laptop.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  quantity: number;
}
