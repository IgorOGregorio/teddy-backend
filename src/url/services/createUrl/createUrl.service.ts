import { Inject, Injectable } from '@nestjs/common';
import { Url, urlProps } from '../../entities/url.entity';
import { CreateUrlDto } from '../../dto/create-url.dto';
import { IUrlRepository } from '../../repositories/iUrl.repository';
import { FindByIdService } from '../../../user/services/findById/findById.service';

@Injectable()
export class CreateUrlService {
  constructor(
    @Inject(IUrlRepository) private readonly urlRepository: IUrlRepository,
    private readonly findUserByIdService: FindByIdService,
  ) {}
  async execute(createUrlDto: CreateUrlDto, id?: string): Promise<Url> {
    //verify if user exists else throw error
    let user;
    if (id) user = await this.findUserByIdService.execute(id);

    //create short url
    const shortUrl = await this.createUniqueShortUrl();

    //create url props
    const props: urlProps = {
      url: createUrlDto.url,
      shortUrl: shortUrl,
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    //create url

    const url = new Url(props);

    //save url to db
    await this.urlRepository.createUrl(url);

    //verify if an user and save user url
    if (user) {
      await this.urlRepository.saveUserUrl(user.id, url.id);
    }

    return url;
  }

  private async createUniqueShortUrl(): Promise<string> {
    const shortUrl = Math.random().toString(30).substring(2, 8);

    //verify if short url already exists
    const shortUrlActive = await this.urlRepository.findBySortUrl(shortUrl);

    //if short url already exists, create a new one
    if (shortUrlActive) {
      return this.createUniqueShortUrl();
    }

    return shortUrl;
  }
}
