import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/Prisma.service';
import { User, UserProps } from '../entities/user.entity';
import { IUserRepository } from './iuser.repository';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    try {
      await this.prismaService.user.create({
        data: {
          id: user.id,
          name: user.props.name,
          email: user.props.email,
          password: user.props.password,
          createdAt: user.props.createdAt,
          updatedAt: user.props.updatedAt,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) return null;

      return new User(
        {
          name: user.name,
          email: user.email,
          password: user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        } as UserProps,
        user.id,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.prismaService.user.findMany();

      return users.map(
        (user) =>
          new User(
            {
              name: user.name,
              email: user.email,
              password: user.password,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            } as UserProps,
            user.id,
          ),
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
