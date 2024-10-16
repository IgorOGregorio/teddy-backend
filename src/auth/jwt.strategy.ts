import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { IAuthRepository } from './repositories/iauth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IAuthRepository) private readonly authRepository: IAuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: AuthPayload): Promise<AuthPayload | null> {
    const validatedUser = await this.authRepository.validateUserByEmail(
      payload.email,
    );

    if (!validatedUser || validatedUser.id !== payload.id) {
      return null;
    }
    return payload;
  }
}

export type AuthPayload = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};
