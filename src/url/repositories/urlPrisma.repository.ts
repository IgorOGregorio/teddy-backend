import { Injectable } from '@nestjs/common';
import { IUrlRepository } from './iUrl.repository';
import { Url } from '../entities/url.entity';
import { PrismaService } from '../../prisma/Prisma.service';

@Injectable()
export class UrlPrismaRepository implements IUrlRepository {
  constructor(private prismaService: PrismaService) {}
  async findBySortUrl(shortUrl: string): Promise<Url | null> {
    try {
      const url = await this.prismaService.url.findUnique({
        where: {
          shortUrl: shortUrl,
        },
      });

      if (!url) return null;

      return new Url(
        {
          url: url.url,
          shortUrl: url.shortUrl,
          accessCount: url.accessCount,
          createdAt: url.createdAt,
          updatedAt: url.updatedAt,
          deletedAt: url.deletedAt,
        },
        url.id,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createUrl(url: Url): Promise<void> {
    try {
      await this.prismaService.url.create({
        data: {
          id: url.id,
          url: url.url,
          shortUrl: url.shortUrl,
          accessCount: url.accessCount,
          createdAt: url.createdAt,
          updatedAt: url.updatedAt,
          deletedAt: url.deletedAt,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async saveUserUrl(userId: string, urlId: string): Promise<void> {
    try {
      await this.prismaService.userUrl.create({
        data: {
          User: {
            connect: {
              id: userId,
            },
          },
          Url: {
            connect: {
              id: urlId,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findUrlsByUserId(id: string): Promise<Url[]> {
    try {
      const userUrl = await this.prismaService.userUrl.findMany({
        where: {
          userId: id,
          Url: {
            deletedAt: null,
          },
        },
        include: {
          Url: true,
        },
      });

      if (!userUrl.length) return [];

      return userUrl.map(
        (element) =>
          new Url(
            {
              url: element.Url.url,
              shortUrl: element.Url.shortUrl,
              accessCount: element.Url.accessCount,
              createdAt: element.Url.createdAt,
              updatedAt: element.Url.updatedAt,
              deletedAt: element.Url.deletedAt,
            },
            element.Url.id,
          ),
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
