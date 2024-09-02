import { FindOne } from '@common/@types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { PopulateOptions } from 'mongoose';

export class FindOneDto implements FindOne {
  @IsOptional()
  @Transform((v) => (typeof v.value === 'string' ? [v.value] : v.value))
  @IsString({ each: true })
  @ApiProperty({ type: [String], required: false })
  populate?: Array<string | PopulateOptions>;
}
