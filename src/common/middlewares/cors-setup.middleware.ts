import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Enables CORS on the given Nest application, based on the environment.
 *
 * In production, sets the origin to the value of the `PRODUCTION_ORIGIN`
 * environment variable, or `*` if no value is set. Allows the standard
 * `GET`, `POST`, `PUT`, `DELETE`, and `PATCH` methods, and permits the `Content-Type`
 * and `Authorization` headers.
 *
 * In development, enables CORS for all origins.
 *
 * @param {INestApplication} app - The Nest application to configure.
 * @param {ConfigService} configService - The ConfigService to get environment variables from.
 */
export function useCorsSetupMiddleware(
  app: INestApplication,
  configService: ConfigService,
): void {
  const isProduction = configService.getOrThrow('NODE_ENV') === 'production';

  if (isProduction) {
    app.enableCors({
      origin: configService.get<string>('PRODUCTION_ORIGIN', '*'),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  } else {
    app.enableCors({ origin: '*' });
  }
}
