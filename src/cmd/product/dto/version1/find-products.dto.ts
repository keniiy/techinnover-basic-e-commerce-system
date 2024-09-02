import { FindManyDto } from '@common/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class FindProductsDto extends FindManyDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Filter by approval status',
  })
  isApproved?: boolean;
}
