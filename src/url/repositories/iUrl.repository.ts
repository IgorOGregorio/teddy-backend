import { UpdateUrlDto } from '../dto/update-url.dto';
import { Url } from '../entities/url.entity';

export interface IUrlRepository {
  findBySortUrl(shortUrl: string): Promise<Url | null>;
  createUrl(url: Url): Promise<void>;
  saveUserUrl(userId: string, urlId: string): Promise<void>;
  findUrlsByUserId(id: string): Promise<Url[]>;
  updateUrl(id: string, data: UpdateUrlDto): Promise<Url>;
  validateUserOwnsUrl(userId: string, urlId: string): Promise<boolean>;
  deleteUrl(urlId: string): Promise<void>;
  verifyUrlIsDeleted(urlId: string): Promise<boolean>;
}

export const IUrlRepository = Symbol('IUrlRepository');
