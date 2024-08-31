import { Global, Module } from '@nestjs/common';
import { DatabaseModule, DatabaseService } from '@database/index';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule, DatabaseModule],
  exports: [DatabaseModule, ConfigModule],
  providers: [DatabaseService],
})
export class CommonModule {}
