import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUrlRepository } from '../../repositories/iUrl.repository';

@Injectable()
export class DeleteUrlService {
  constructor(@Inject(IUrlRepository) private urlRepository: IUrlRepository) {}
  async execute(id: string, userId: string): Promise<any> {
    const url = await this.urlRepository.findUrlById(id);

    if (!url) {
      throw new BadRequestException('Url not found');
    }

    //valide if user owns the url
    const userOwnsUrl = await this.urlRepository.validateUserOwnsUrl(
      userId,
      id,
    );

    if (!userOwnsUrl) {
      throw new BadRequestException('User does not own the url');
    }

    url.delete();

    // Delete url
    await this.urlRepository.deleteUrl(id);

    return {
      message: 'Url deleted',
    };
  }
}
