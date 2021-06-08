import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const WsUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToWs().getData();
    return request;
  },
);
