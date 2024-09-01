import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ThrottlerModuleOptions,
  ThrottlerAsyncOptions,
} from '@nestjs/throttler';

export const ThrottlerConfig: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  /**
   * A factory function that creates a configuration object for the ThrottlerModule.
   *
   * If the application is running in production mode, it will return a configuration
   * that sets up the throttler with a TTL of 60 seconds and a limit of 10 requests.
   * Otherwise, it will return a configuration that sets up the throttler with a TTL
   * of 0 seconds and a limit of 0 requests, effectively disabling the throttler.
   *
   * @param {ConfigService} config - The ConfigService to get configuration from.
   * @returns {ThrottlerModuleOptions} A configuration object for the ThrottlerModule.
   */
  useFactory: (config: ConfigService): ThrottlerModuleOptions => {
    const isProduction = config.get<string>('NODE_ENV') === 'production';
    if (isProduction) {
      return {
        throttlers: [
          {
            ttl: config.get<number>('THROTTLE_TTL', 60),
            limit: config.get<number>('THROTTLE_LIMIT', 10),
          },
        ],
      };
    }
    return {
      throttlers: [
        {
          ttl: 0,
          limit: 0,
        },
      ],
    };
  },
};
