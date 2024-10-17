import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUrlRepository } from '../../repositories/iUrl.repository';

@Injectable()
export class RedirectUrlService {
  constructor(
    @Inject(IUrlRepository) private readonly urlRepository: IUrlRepository,
  ) {}
  async execute(shortUrl: string): Promise<string> {
    //get the url from the database by shortUrl
    const url = await this.urlRepository.findBySortUrl(shortUrl);

    if (!url) {
      throw new NotFoundException('Url not found');
    }

    url.incrementAccessCount();

    //save the updated url
    await this.urlRepository.updateUrl(url.id, {
      accessCount: url.accessCount,
    });

    //return the url
    return url.url;
  }
}
