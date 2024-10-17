import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from '../auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

export const GetUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext): Promise<AuthPayload> => {
    const request = await context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const jwtService = new JwtService();
    const payload: AuthPayload = await jwtService.decode(token);
    return payload as AuthPayload;
  },
);
