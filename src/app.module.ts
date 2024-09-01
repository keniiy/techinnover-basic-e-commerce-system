import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@common/index';
import { ConfigModule } from '@nestjs/config';
import { getClsModule, ThrottlerConfig } from '@config/index';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    getClsModule(),
    ThrottlerModule.forRootAsync(ThrottlerConfig),
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useValue: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
