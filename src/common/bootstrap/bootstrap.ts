import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import {
  useCorsSetupMiddleware,
  useSwaggerSecurityMiddleware,
} from '@middlewares/index';
import helmet from 'helmet';
import { GlobalValidationPipe } from '@pipes/index';
import { ISwaggerOptions } from '@interfaces/index';
import { useSwagger } from './swagger';
import { AddressInfo } from 'net';

/**
 * Bootstraps the Nest application.
 *
 * This function is responsible for setting up the Nest application,
 * configuring the Swagger UI, and starting the server.
 *
 * @returns {Promise<void>} A promise that resolves when the application is fully bootstrapped.
 */
export async function bootstrap(): Promise<void> {
  const app: NestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(configService.get<string>('GLOBAL_PREFIX', 'api'));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());

  useCorsSetupMiddleware(app, configService);

  app.useGlobalPipes(GlobalValidationPipe);

  const swaggerOptions: ISwaggerOptions = {
    title: configService.get<string>(
      'SWAGGER_TITLE',
      'Techinnover Basic E-Commerce System',
    ),
    description: configService.get<string>(
      'SWAGGER_DESCRIPTION',
      'API description for Techinnover Basic E-Commerce System',
    ),
    version: configService.get<string>('SWAGGER_VERSION', '1.0.0'),
    basePath: configService.get<string>('SWAGGER_BASE_PATH', '/api/docs'),
    serviceName: configService.get<string>(
      'SWAGGER_SERVICE_NAME',
      'techinnover',
    ),
    swaggerUser: configService.get<string>('SWAGGER_USER', 'admin'),
    swaggerPassword: configService.get<string>('SWAGGER_PASSWORD', 'password'),
  };

  useSwaggerSecurityMiddleware(app, swaggerOptions);
  useSwagger(app, swaggerOptions);

  const port: number = configService.get<number>('PORT', 3000);
  const host: string = configService.get<string>('HOST', '127.0.0.1');

  await app.listen(port, host);

  const server = app.getHttpServer();
  const address: AddressInfo = server.address() as AddressInfo;

  const finalHost: string =
    address.address === '::1' ? 'localhost' : address.address;

  const protocol = configService.get<string>('PROTOCOL', 'http');
  const formattedProtocol = protocol === 'https' ? 'https' : 'http';

  Logger.log(
    `🚀 Techinnover API is running on: ${formattedProtocol}://${finalHost}:${port}/api`,
  );
  Logger.log(
    `📚 Swagger docs available at: ${formattedProtocol}://${finalHost}:${port}/api/docs`,
  );
}
