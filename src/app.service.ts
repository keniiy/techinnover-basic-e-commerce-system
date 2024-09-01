import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a warm welcome message to the client.
   *
   * @returns A string containing the welcome message.
   */
  getWelcomeMessageToClient(): string {
    return `I know you were expecting a message here 😔. Well, Oops, caught you snooping around! 😄 Since you're here, let me officially welcome you to the Techinnover API. May your requests be swift and your responses even swifter. Cheers to exploring our API—Hello World! 🥂`;
  }

  /**
   * Returns information about the service.
   *
   * @returns An object containing the following information about the service:
   *   - statusCode: The HTTP status code of the response.
   *   - success: Whether the request was successful or not.
   *   - message: A message describing the result of the request.
   *   - data: An object containing information about the service. The object has the following properties:
   *     - name: The name of the service.
   *     - version: The version of the service.
   *     - description: A description of the service.
   *     - author: The name of the author of the service.
   *   - timestamp: The timestamp of the response.
   *   - path: The path of the requested endpoint.
   */
  getServiceName() {
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Service api info returned successfully',
      data: {
        name: 'Techinnover Basic E-Commerce System',
        version: ['0.0.1'],
        description:
          'Techinnover Basic E-Commerce System hat allows unauthenticated users to view approved products, authenticated users to manage their products, and an admin to manage users and products.',
        author: 'Kehinde Kehinde👨🏻‍💻',
      },
      timestamp: new Date().toISOString(),
      path: '/api',
    };
  }

  /**
   * Returns information about the health of the service.
   *
   * @returns An object containing the following information about the health of the service:
   */
  getHealthCheck() {
    return {
      statusCode: HttpStatus.OK,
      status: 'success',
      message: 'Ok',
      data: {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
    };
  }
}
