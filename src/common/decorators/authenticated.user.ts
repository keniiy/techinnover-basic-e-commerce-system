import { IUser } from '@common/interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator that retrieves the authenticated user from the request context.
 * This decorator supports HTTP, WebSocket, and RPC contexts.
 *
 * @param data - The data passed to the decorator, currently unused.
 * @param ctx - The execution context containing the request context.
 * @returns The authenticated user object.
 */
export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      return ctx.switchToHttp().getRequest().user as IUser;
    }
  },
);
