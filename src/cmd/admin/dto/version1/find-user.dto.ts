import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min } from 'class-validator';
import { FindManyDto } from '@common/dtos';

export class FindUsersDto extends FindManyDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ type: Number, description: 'Page number', example: 1 })
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  limit?: number;
}
