import { Inject, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../repositories/iuser.repository';
import { User } from '../../entities/user.entity';

export class FindByEmailService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}
  async execute(email: string): Promise<User> {
    //find user by email
    const user = await this.userRepository.findByEmail(email);

    //if user not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
