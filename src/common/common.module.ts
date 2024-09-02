import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, DatabaseService } from './database';

@Module({
  imports: [ConfigModule, DatabaseModule],
  exports: [DatabaseModule, ConfigModule],
  providers: [DatabaseService],
})
export class CommonModule {}
