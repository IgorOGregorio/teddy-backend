import { User } from '../entities/user.entity';

export interface IUserRepository {
  create: (user: User) => Promise<void>;
  findById: (id: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;
}

export const IUserRepository = Symbol('IUserRepository');
