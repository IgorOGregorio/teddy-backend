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
}
