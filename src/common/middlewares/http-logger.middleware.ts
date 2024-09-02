import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);

  /**
   * Logs each incoming HTTP request in the following format:
   *   "METHOD URL STATUS STATUSMESSAGE"
   * The log level is determined by the HTTP status code.
   *   - 500 or above: error
   *   - 400 or above: warn
   *   - otherwise: log
   * @param request The incoming HTTP request.
   * @param response The outgoing HTTP response.
   * @param next The next middleware function in the chain.
   */
  use(request: Request, response: Response, next: NextFunction): void {
    response.on('finish', () => {
      const { method, originalUrl } = request;
      const { statusCode, statusMessage } = response;
      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        this.logger.error(message);
      } else if (statusCode >= 400) {
        this.logger.warn(message);
      } else {
        this.logger.log(message);
      }
    });

    next();
  }
}
