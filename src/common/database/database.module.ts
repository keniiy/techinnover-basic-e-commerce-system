import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      /**
       * A factory function that creates options for the MongooseModule to
       * connect to a MongoDB database.
       *
       * This function is called by the MongooseModule, and is passed the
       * ConfigService as an argument. It returns an object with the following
       * properties:
       *
       *   - uri: a string representing the MongoDB connection URI.
       *   - retryAttempts: the number of times to retry connecting to the
       *     database if the initial connection fails. Defaults to 5.
       *   - retryDelay: the number of milliseconds to wait between retries.
       *     Defaults to 1000.
       *
       * The ConfigService is used to get the MongoDB connection URI from the
       * configuration.
       *
       * @param {ConfigService} configService - The ConfigService.
       * @returns {object} Options for the MongooseModule.
       */
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('DATABASE_URL'),
        retryAttempts: 5,
        retryDelay: 1000,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
