import { User } from '../../user/entities/user.entity';

export interface IAuthRepository {
  validateUserByEmail(email: string): Promise<User | null>;
}

export const IAuthRepository = Symbol('IAuthRepository');
