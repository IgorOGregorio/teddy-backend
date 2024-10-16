import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/isPublicKey.decorator';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload, JwtStrategy } from './jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.handleRequest('No token received', null);
    }

    const payload: AuthPayload = this.jwtService.decode(token);

    const validatedUser = this.jwtStrategy.validate(payload);

    if (!validatedUser) {
      this.handleRequest('User not found', null);
    }

    return super.canActivate(context);
  }

  extractTokenFromHeader(
    request: Request & { headers: { authorization?: string } },
  ): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err && new UnauthorizedException(err);
    }
    return user;
  }
}
