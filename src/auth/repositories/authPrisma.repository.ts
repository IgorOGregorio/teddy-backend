import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/Prisma.service';
import { IAuthRepository } from './iauth.repository';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthPrismaRepository implements IAuthRepository {
  constructor(private prisma: PrismaService) {}

  async validateUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const { id, ...props } = user;

    return new User(props, id);
  }
}
