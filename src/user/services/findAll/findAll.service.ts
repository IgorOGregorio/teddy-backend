import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/iuser.repository';

@Injectable()
export class FindAllService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}
  async execute(): Promise<User[]> {
    //find all users
    const users = await this.userRepository.findAll();

    return users;
  }
}
