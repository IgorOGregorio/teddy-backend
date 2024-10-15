import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/iuser.repository';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}
  async execute(createUserDto: CreateUserDto): Promise<User> {
    //validate email
    const findedUserByEmail = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    //if email already exists
    if (findedUserByEmail) {
      throw new BadRequestException('Email already exists');
    }

    let user: User;

    //create user
    try {
      user = new User({
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    //save user
    await this.userRepository.create(user);

    return user;
  }
}
