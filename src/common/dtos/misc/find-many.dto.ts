import { FindMany, Period } from '@common/@types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PopulateOptions } from 'mongoose';

export class FindManyDto implements FindMany {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, required: false })
  search?: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ type: [String], required: false })
  sort?: string | string[];

  @IsOptional()
  @Transform((v) => (typeof v.value === 'string' ? [v.value] : v.value))
  @IsString({ each: true })
  @ApiProperty({ type: [String], required: false })
  populate?: Array<string | PopulateOptions>;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, minimum: 0, required: false })
  offset?: number;

  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  limit?: number;

  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  page?: number;

  @IsOptional()
  @IsEnum(Period)
  period?: Period;

  @IsOptional()
  @IsDate()
  from?: Date;

  @IsOptional()
  @IsDate()
  to?: Date;
}
