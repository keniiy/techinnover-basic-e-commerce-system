import { ValidationPipe } from '@nestjs/common';

/**
 * Global Validation Pipe for NestJS
 *
 * @see https://docs.nestjs.com/pipes
 */
export const GlobalValidationPipe = new ValidationPipe({
  transform: true,
  forbidUnknownValues: true,
  whitelist: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
});
