import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@common/index';
import { ConfigModule } from '@nestjs/config';
import { getClsModule, ThrottlerConfig } from '@config/index';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { OnboardingModule } from './cmd/onboarding/onboarding.module';
import { AuthModule } from './cmd/auth/auth.module';
import { ProductModule } from './cmd/product/product.module';
import { UserModule } from './cmd/user/user.module';
import { AdminModule } from './cmd/admin/admin.module';
import { HttpLoggerMiddleware } from '@middlewares/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    getClsModule(),
    ThrottlerModule.forRootAsync(ThrottlerConfig),
    OnboardingModule,
    AuthModule,
    ProductModule,
    UserModule,
    AdminModule,
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
export class AppModule {
  /**
   * Configures the global middleware for the application.
   * This middleware applies the logger middleware to all routes.
   *
   * @param consumer The middleware consumer to use for configuration.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
