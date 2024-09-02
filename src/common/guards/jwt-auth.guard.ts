import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Determines whether the request is allowed to proceed or not.
   * @param context The execution context of the request.
   * @returns A boolean indicating whether the request is allowed.
   */
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
