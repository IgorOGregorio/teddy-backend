import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUrlRepository } from '../../repositories/iUrl.repository';

@Injectable()
export class DeleteUrlService {
  constructor(@Inject(IUrlRepository) private urlRepository: IUrlRepository) {}
  async execute(id: string, userId: string): Promise<any> {
    //validate if url is not deleted
    const urlIsDeleted = await this.urlRepository.verifyUrlIsDeleted(id);

    if (urlIsDeleted) throw new BadRequestException('Url is already deleted');

    //valide if user owns the url
    const userOwnsUrl = await this.urlRepository.validateUserOwnsUrl(
      userId,
      id,
    );

    if (!userOwnsUrl) {
      throw new BadRequestException('User does not own the url');
    }

    // Delete url
    await this.urlRepository.deleteUrl(id);

    return {
      message: 'Url deleted',
    };
  }
}
