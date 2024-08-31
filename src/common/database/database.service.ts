import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  /**
   * Returns the underlying mongoose connection.
   * @returns {Connection} The mongoose connection.
   */
  getDbHandler(): Connection {
    return this.connection;
  }
}
