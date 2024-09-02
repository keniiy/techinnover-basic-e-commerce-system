import { FindMany, PaginateResult, PaginationOptions } from '@types';
import { IAbstractRepository } from '@common/interfaces';
import { Logger } from '@nestjs/common';
import {
  ClientSession,
  Connection,
  Document,
  FilterQuery,
  Model,
  PopulateOptions,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
} from 'mongoose';
export abstract class AbstractRepository<T extends Document>
  implements IAbstractRepository<T>
{
  protected readonly logger = new Logger(AbstractRepository.name);

  protected constructor(
    protected readonly model: Model<T>,
    private readonly connection: Connection,
  ) {}

  /**
   * Counts the number of documents that match the given filter query.
   * Useful when you need to know how many documents satisfy certain conditions.
   *
   * @param filterQuery The filter query to use when counting the documents.
   * @returns A Promise that resolves with the number of documents that match the filter query.
   */
  async countDocuments(filterQuery: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filterQuery);
  }

  /**
   * Finds a single document that matches the given filter query.
   * This is useful when you expect to find exactly one document.
   *
   * @param filterQuery The filter query to use when finding the document.
   * @param projection Optional projection object that limits the fields returned in the document.
   * @param options Additional query options, including population.
   * @returns The found document or null if no document was found.
   */
  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions & {
      populate?: string | string[] | PopulateOptions | PopulateOptions[];
    },
  ): Promise<T | null> {
    let query = this.model.findOne(filterQuery, projection);

    if (options?.populate) {
      if (Array.isArray(options.populate)) {
        query = query.populate(
          options.populate as Array<string | PopulateOptions>,
        );
      } else if (
        typeof options.populate === 'string' ||
        typeof options.populate === 'object'
      ) {
        query = query.populate([options.populate] as
          | [string]
          | PopulateOptions);
      }
    }

    return query.exec();
  }

  /**
   * Finds a single document by the given filter query and updates it with new data.
   * If the document is found and updated, the new version is returned.
   *
   * @param filter The filter query to use when finding the document.
   * @param update The update data to apply to the document.
   * @param options Optional options that can be used to modify the query.
   * @returns The updated document or null if not found.
   */
  async findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.model
      .findOneAndUpdate(filter, update, {
        new: true,
        ...options,
      })
      .exec();
  }

  /**
   * Finds a document by the given filter query. If it exists, it's updated;
   * if it doesn't exist, a new document is created.
   *
   * @param filterQuery The filter query to use when finding the document.
   * @param document The document data to update or insert.
   * @param options Optional options that can be used to modify the query.
   * @returns The updated or inserted document or null if not found.
   */
  async upsert(
    filterQuery: FilterQuery<T>,
    document: UpdateQuery<T>,
    options?: { session?: ClientSession },
  ): Promise<T | null> {
    return this.model
      .findOneAndUpdate(filterQuery, document, {
        upsert: true,
        new: true,
        ...options,
      })
      .exec();
  }

  /**
   * Creates a new document in the database.
   *
   * @param createEntityData The data for the new document.
   * @param options Optional options that can be used to modify the creation query.
   * @returns The created document.
   */
  async create(
    createEntityData: Record<string, any>,
    options?: SaveOptions,
  ): Promise<T> {
    const createdDocument = await this.model.create(
      [createEntityData],
      options,
    );
    return createdDocument[0] as T;
  }

  /**
   * Creates a new document instance in memory without saving it to the database.
   * This is useful when you need to perform some operations on a document before saving it.
   *
   * @param createEntityData The data for the new document instance.
   * @returns The created document instance.
   */
  async newInstance(createEntityData: Partial<T>): Promise<T> {
    return new this.model(createEntityData) as T;
  }

  /**
   * Finds all documents that match the given filter query.
   * Useful for retrieving a list of documents based on certain criteria.
   *
   * @param filterQuery The filter query to use when finding the documents.
   * @param projections Optional projection object that limits the fields returned in the documents.
   * @param options Additional query options.
   * @returns A list of found documents, or null if no documents were found.
   */
  async find(
    filterQuery?: FilterQuery<T>,
    projections?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<T[] | null> {
    return this.model.find(filterQuery, projections, options).exec();
  }

  /**
   * Finds documents that match the given filter query and paginates the results.
   * This is useful when you need to retrieve documents in batches (pages).
   *
   * @param condition The filter query to use when finding the documents.
   * @param findMany Options for pagination, sorting, and filtering.
   * @returns A paginated result containing the found documents and pagination details.
   */
  async findManyWithPagination(
    condition: FilterQuery<T>,
    findMany: FindMany,
  ): Promise<PaginateResult<T>> {
    const { offset, limit, sort, page, populate } = findMany;
    const options: PaginationOptions = { sort: {}, offset, limit, page };

    if (sort) {
      const sortArray = Array.isArray(sort) ? sort : [sort];
      sortArray.forEach((pair) => {
        const [key, value] = pair.split(',');
        options.sort[key] = Number(value);
      });
    }

    let query = (this.model as any).paginate(condition, options);

    if (populate) {
      const populateArray = Array.isArray(populate) ? populate : [populate];
      populateArray.forEach((pop) => {
        query = query.populate(pop);
      });
    }

    return query;
  }

  /**
   * Finds a document by its unique ID.
   *
   * @param id The ID of the document to find.
   * @param projection Optional projection object that limits the fields returned in the document.
   * @param options Additional query options.
   * @returns The found document or null if no document matches the ID.
   */
  async findById(
    id: string,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.model.findById(id, projection, options).exec();
  }

  /**
   * Finds a document that matches the given filter query and removes it from the database.
   *
   * @param filter The filter query to use when finding the document.
   * @param options Additional query options.
   * @returns The deleted document or null if not found.
   */
  async findOneAndDelete(
    filter: FilterQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.model.findOneAndDelete(filter, options).exec();
  }

  /**
   * Updates multiple documents that match the given filter query.
   * Useful when you need to update several documents with similar criteria.
   *
   * @param filter The filter query to use when finding the documents to update.
   * @param updateQuery The update data to apply to the found documents.
   * @returns The result of the update operation.
   */
  async updateMany(
    filter: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
  ): Promise<any> {
    return this.model.updateMany(filter, updateQuery).exec();
  }

  /**
   * Counts the number of documents that match the given filter query.
   * This can be useful for pagination or determining the size of a dataset.
   *
   * @param filter The filter query to use when counting the documents.
   * @returns The number of documents that match the filter query.
   */
  async count(filter?: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  /**
   * Retrieves a list of distinct values for a specific field in the collection.
   * Useful for getting unique entries of a field, like categories or tags.
   *
   * @param field The field to retrieve distinct values for.
   * @param filterQuery Optional filter query to narrow down the documents.
   * @returns A list of distinct values for the specified field.
   */
  async distinct(field: string, filterQuery?: FilterQuery<T>): Promise<any[]> {
    return this.model.distinct(field, filterQuery).exec();
  }
}
