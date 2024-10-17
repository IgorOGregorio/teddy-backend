import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { IAuthRepository } from './repositories/iauth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IAuthRepository) private readonly authRepository: IAuthRepository,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(token: string): Promise<AuthPayload | null> {
    const payload: AuthPayload = await this.jwtService.decode(token);
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
