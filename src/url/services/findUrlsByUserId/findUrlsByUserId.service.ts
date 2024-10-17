import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Url } from '../../entities/url.entity';
import { IUrlRepository } from '../../repositories/iUrl.repository';

@Injectable()
export class FindUrlsByUserIdService {
  constructor(
    @Inject(IUrlRepository) private readonly urlRepository: IUrlRepository,
  ) {}
  async execute(userId: string): Promise<Url[]> {
    //find urls by email
    const urls = await this.urlRepository.findUrlsByUserId(userId);

    if (!urls.length)
      throw new NotFoundException('Not found any url to this user');

    return urls;
  }
}
