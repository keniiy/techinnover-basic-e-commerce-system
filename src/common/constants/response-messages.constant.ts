export class ResponseMessages {
  //NOTE: USE Proper not enough time to implement this

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
