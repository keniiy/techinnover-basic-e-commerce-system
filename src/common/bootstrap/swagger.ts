import { ISwaggerOptions } from '@interfaces/index';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Configure the Swagger UI for our Nest application.
 *
 * @param {INestApplication} application - The Nest application to configure.
 * @param {ISwaggerOptions} swaggerOptions - Options for the Swagger UI.
 * @returns {void}
 */
export function useSwagger(
  application: INestApplication,
  swaggerOptions: ISwaggerOptions,
): void {
  const { title, description, version, basePath: baseApiPath } = swaggerOptions;

  const swaggerConfiguration = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    application,
    swaggerConfiguration,
  );

  SwaggerModule.setup(baseApiPath || '/docs', application, swaggerDocument);
}
