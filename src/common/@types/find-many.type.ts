import { PopulateOptions } from 'mongoose';

export type FindMany = {
  search?: string;
  sort?: string | string[];
  populate?: Array<string | PopulateOptions>;
  offset?: number;
  limit?: number;
  page?: number;
  period?: Period;
  from?: Date;
  to?: Date;
};

export enum Period {
  Today = 'today',
  Seven = '7',
  LastMonth = 'lastmonth',
  All = 'all',
  Range = 'range',
}
