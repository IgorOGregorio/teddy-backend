import { Url } from '../entities/url.entity';

export interface IUrlRepository {
  findBySortUrl(shortUrl: string): Promise<Url | null>;
  createUrl(url: Url): Promise<void>;
  saveUserUrl(userId: string, urlId: string): Promise<void>;
}

export const IUrlRepository = Symbol('IUrlRepository');
