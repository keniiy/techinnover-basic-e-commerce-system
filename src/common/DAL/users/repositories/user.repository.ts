import { AbstractRepository } from '@common/DAL/abstract';
import { Collections } from '@common/enums';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { UserDocument } from '../models';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  /**
   * Creates an instance of UserRepository.
   *
   * @param userModel The mongoose model for the users collection.
   * @param connection The mongoose connection to use.
   */
  constructor(
    @InjectModel(Collections.USERS)
    private readonly userModel: Model<UserDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
