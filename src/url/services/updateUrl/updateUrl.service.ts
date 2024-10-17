import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUrlRepository } from '../../repositories/iUrl.repository';

@Injectable()
export class UpdateUrlService {
  constructor(
    @Inject(IUrlRepository) private readonly urlRepository: IUrlRepository,
  ) {}

  async execute(id: string, data: any, userId: string) {
    //validate if url is not deleted
    const urlIsDeleted = await this.urlRepository.verifyUrlIsDeleted(id);

    if (urlIsDeleted) throw new BadRequestException('Url is deleted');

    //validade if user owns the url
    const userOwnsUrl = await this.urlRepository.validateUserOwnsUrl(
      userId,
      id,
    );

    if (!userOwnsUrl) {
      throw new BadRequestException('User does not own the url');
    }

    return this.urlRepository.updateUrl(id, data);
  }
}
