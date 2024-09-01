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
}
