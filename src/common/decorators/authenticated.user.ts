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
    // Depending on the context type, retrieve the user from the appropriate request object.
    if (ctx.getType() === 'http') {
      // For HTTP contexts, retrieve the user from the request object.
      return ctx.switchToHttp().getRequest().user as IUser;
    }
    if (ctx.getType() === 'ws') {
      // For WebSocket contexts, retrieve the user from the client object.
      return ctx.switchToWs().getClient().user as IUser;
    }
    if (ctx.getType() === 'rpc') {
      // For RPC contexts, retrieve the user from the data object.
      return ctx.switchToRpc().getData().user as IUser;
    }
  },
);
