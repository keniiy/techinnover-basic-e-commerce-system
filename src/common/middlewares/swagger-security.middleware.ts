import * as basicAuth from 'basic-auth';
import { INestApplication } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ISwaggerOptions } from '@interfaces/index';

/**
 * Sets up a middleware that requires Basic Auth to access the Swagger UI
 * and its API endpoints.
 *
 * The `swaggerOptions` object must contain the following properties:
 *
 *   - `basePath`: the base path of the Swagger UI (defaults to `/docs`).
 *   - `swaggerUser`: the username to use for Basic Auth.
 *   - `swaggerPassword`: the password to use for Basic Auth.
 *
 * If the `swaggerUser` and `swaggerPassword` properties are set, this
 * middleware will require Basic Auth to access the Swagger UI and its API
 * endpoints.
 *
 * @param {INestApplication} app - The Nest application to protect.
 * @param {ISwaggerOptions} swaggerOptions - The options for the Swagger UI.
 */
export function useSwaggerSecurityMiddleware(
  app: INestApplication,
  swaggerOptions: ISwaggerOptions,
): void {
  app.use(
    [
      swaggerOptions.basePath || '/docs',
      `${swaggerOptions.basePath || '/docs'}-json`,
    ],
    (req: Request, res: Response, next: NextFunction) => {
      const credentials = basicAuth(req);

      if (
        credentials &&
        credentials.name === swaggerOptions.swaggerUser &&
        credentials.pass === swaggerOptions.swaggerPassword
      ) {
        return next();
      } else {
        res.setHeader(
          'WWW-Authenticate',
          'Basic realm="Swagger Basic E-Commerce System"',
        );
        res.status(401).end('Access denied');
      }
    },
  );
}
