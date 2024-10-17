import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUrlRepository } from '../../repositories/iUrl.repository';

@Injectable()
export class UpdateUrlService {
  constructor(
    @Inject(IUrlRepository) private readonly urlRepository: IUrlRepository,
  ) {}

  async execute(id: string, data: any, userId: string) {
    const url = await this.urlRepository.findUrlById(id);

    if (!url) throw new BadRequestException('Url not found');

    //validade if user owns the url
    const userOwnsUrl = await this.urlRepository.validateUserOwnsUrl(
      userId,
      id,
    );

    if (!userOwnsUrl) {
      throw new BadRequestException('User does not own the url');
    }

    url.updateUrl(data.url);

    return this.urlRepository.updateUrl(id, {
      url: url.url,
    });
  }
}
