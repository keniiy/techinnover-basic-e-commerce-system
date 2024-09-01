import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Root Route')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  /**
   * The only reason you're here is because you were probably
   * snooping around for an API endpoint to call. Well, I suppose
   * I should give you something. Here's a warm welcome message
   * from the Techinnover Basic E-Commerce System. May your
   * requests be swift and your responses even swifter. Cheers!🥂
   *
   * @returns {string} A warm welcome message.
   */
  getWelcomeMessageToClient(): string {
    return this.appService.getWelcomeMessageToClient();
  }

  /**
   * Returns the name of the service.
   * @returns {string} The name of the service.
   */
  @Get('service-name')
  getServiceName(): object {
    return this.appService.getServiceName();
  }

  /**
   * Returns information about the health of the service.
   *
   * @returns An object containing the following information about the health of the service:
   *   - statusCode: The HTTP status code of the response.
   *   - status: Whether the request was successful or not.
   *   - message: A message describing the result of the request.
   *   - data: An object containing information about the service. The object has the following properties:
   *     - uptime: The uptime of the service in seconds.
   *     - timestamp: The timestamp of the response.
   *   - path: The path of the requested endpoint.
   */
  @Get('health-check')
  getHealthCheck(): object {
    return this.appService.getHealthCheck();
  }
}
