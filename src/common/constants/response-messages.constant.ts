export class ResponseMessages {
  //NOTE: STATIC RESPONSE MESSAGES
  /**
   * Returns a message indicating that the resource was not found.
   *
   * @param {string} resource - The name of the resource that was not found.
   * @returns {string} A message indicating that the resource was not found.
   */
  public static readonly NOT_FOUND = (resource: string) =>
    `${resource} not found.`;

  public static readonly OPERATION_SUCCESSFUL = 'Operation successful';
  public static readonly OPERATION_FAILED = 'Operation failed';
  public static readonly RESOURCE_NOT_FOUND = (resource: string) =>
    `${resource} not found.`;
  public static readonly RESOURCE_CREATED = (resource: string) =>
    `${resource} created successfully`;
  public static readonly RESOURCE_UPDATED = (resource: string) =>
    `${resource} updated successfully`;
  public static readonly RESOURCE_DELETED = (resource: string) =>
    `${resource} deleted successfully`;
  public static readonly ALREADY_EXISTS = (resource: string) =>
    `${resource} already exists`;
}
