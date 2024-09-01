import { FindMany, PaginateResult } from '@common/@types';
import {
  FilterQuery,
  UpdateQuery,
  Document,
  ClientSession,
  QueryOptions,
} from 'mongoose';

export interface IAbstractRepository<T extends Document> {
  /**
   * Finds a single document that matches the given filter query.
   * This is useful when you expect to find exactly one document.
   *
   * @param filterQuery The filter query to use when finding the document.
   * @param projection Optional projection object that limits the fields returned in the document.
   * @param options Additional query options.
   * @returns The found document or null if no document was found.
   */
  findOne(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, any>,
    options?: QueryOptions,
  ): Promise<T | null>;

  /**
   * Finds a single document that matches the given filter query and updates it with new data.
   * If the document is found and updated, the new version is returned.
   *
   * @param filter The filter query to use when finding the document.
   * @param update The update data to apply to the document.
   * @param options Optional options that can be used to modify the query. The `session` option can be used to enable retries.
   * @returns The updated document or null if not found.
   */
  findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: { session?: ClientSession },
  ): Promise<T | null>;

  /**
   * Finds a document by the given filter query. If it exists, it's updated;
   * if it doesn't exist, a new document is created.
   *
   * @param filterQuery The filter query to use when finding the document.
   * @param document The document data to update or insert.
   * @param options Optional options that can be used to modify the query.
   * @returns The updated or inserted document or null if not found.
   */
  upsert(
    filterQuery: FilterQuery<any>,
    document: UpdateQuery<any>,
    options?: { session?: ClientSession },
  ): Promise<T | null>;

  /**
   * Creates a new document in the collection.
   *
   * @param createEntityData The data to create the document with.
   * @param options Optional options that can be used to modify the query.
   * @returns The created document.
   */
  create(createEntityData: Record<string, any>, options?: any): Promise<T>;

  /**
   * Creates a new document in the collection.
   *
   * @param createEntityData The data to create the document with.
   * @param options Optional options that can be used to modify the query.
   * @returns The created document.
   */
  newInstance(createEntityData: Partial<T>): Promise<T>;

  /**
   * Finds all documents that match the given filter query.
   * Useful for retrieving a list of documents based on certain criteria.
   *
   * @param filterQuery The filter query to use when finding the documents.
   * @param projections Optional projection object that limits the fields returned in the documents.
   * @param options Additional query options.
   * @returns A Promise that resolves with an array of found documents, or null if no documents were found.
   */
  find(
    filterQuery?: FilterQuery<T>,
    projections?: any,
    options?: QueryOptions,
  ): Promise<T[] | null>;

  /**
   * Finds documents that match the given filter query and paginates the results.
   * Useful for retrieving a list of documents based on certain criteria, with
   * pagination.
   *
   * @param condition The filter query to use when finding the documents.
   * @param findMany Options for pagination, sorting, and filtering.
   * @returns A Promise that resolves with a paginated result containing the found documents.
   */
  findManyWithPagination(
    condition: FilterQuery<T>,
    findMany: FindMany,
  ): Promise<PaginateResult<T>>;

  /**
   * Finds a single document by its unique ID.
   *
   * @param id The ID of the document to find.
   * @param projection Optional projection object that limits the fields returned in the document.
   * @param options Additional query options.
   * @returns A Promise that resolves with the found document or null if no document matches the ID.
   */
  findById(
    id: string,
    projection?: Record<string, any>,
    options?: QueryOptions,
  ): Promise<T | null>;

  /**
   * Finds a single document that matches the given filter query and removes it from the database.
   * Useful when you need to remove a document that matches certain criteria.
   *
   * @param filter The filter query to use when finding the document.
   * @param options Additional query options.
   * @returns A Promise that resolves with the deleted document, or null if no document was found.
   */
  findOneAndDelete(
    filter: FilterQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null>;

  /**
   * Counts the number of documents that match the given filter query.
   * Useful when you need to know how many documents satisfy certain conditions.
   *
   * @param filterQuery The filter query to use when counting the documents.
   * @returns A Promise that resolves with the number of documents that match the filter query.
   */
  count(filter?: FilterQuery<T>): Promise<number>;

  /**
   * Counts the number of documents that match the given filter query.
   * Useful when you need to know how many documents satisfy certain conditions.
   *
   * @param filterQuery The filter query to use when counting the documents.
   * @returns A Promise that resolves with the number of documents that match the filter query.
   */
  countDocuments(filterQuery: FilterQuery<T>): Promise<number>;

  /**
   * Returns an array of distinct values for the given field.
   *
   * @param field The field to find distinct values for.
   * @param filterQuery Optional filter query to narrow down the documents.
   * @returns A Promise that resolves with an array of distinct values for the specified field.
   */
  distinct(field: string, filterQuery?: FilterQuery<T>): Promise<any[]>;
}
