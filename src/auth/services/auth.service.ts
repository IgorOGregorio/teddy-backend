import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { AuthDto } from '../dto/auth.dto';
import { IAuthRepository } from '../repositories/iauth.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(IAuthRepository) private readonly authRepository: IAuthRepository,
  ) {}

  async login(user: AuthDto) {
    const validatedUser = await this.authRepository.validateUserByEmail(
      user.email,
    );
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid Email');
    }

    if (validatedUser.password !== user.password) {
      throw new UnauthorizedException('Invalid Password');
    }

    const payload = {
      id: validatedUser.id,
      email: validatedUser.props.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: '3600s',
      }), //
    };
  }
}
