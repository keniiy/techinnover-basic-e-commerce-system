import { PopulateOptions } from 'mongoose';

export type FindOne = {
  search?: string;
  populate?: Array<string | PopulateOptions>;
};
