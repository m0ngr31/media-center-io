import { Inject, Singleton } from 'typescript-ioc';

import { User } from '../Models/User';
import AuthenticationRepository from '../Repositories/AuthenticationRepository';

@Singleton
export default class AuthenticationService {
  constructor(@Inject private authenticationRepository: AuthenticationRepository) { }

  public async loginOrCreate(user: User): Promise<User> {
    try {
      return await this.findByAmazonId(user.$user_id);
    } catch (e) {
      return await this.create(user);
    }
  }

  public async findById(id: number): Promise<User> {
    return this.authenticationRepository.findUserById(id);
  }

  public async findByIdDevices(id: number): Promise<User> {
    return this.authenticationRepository.findUserByIdDevices(id);
  }

  public async findByAmazonId(amazonId: string) {
    return this.authenticationRepository.findUserByAmazonId(amazonId);
  }

  public async findAll(): Promise<User[]> {
    return this.authenticationRepository.getAllUsers();
  }

  public async create(user?: User): Promise<User> {
    if (user)
      return this.authenticationRepository.createUser(user);
    else
      return this.authenticationRepository.createUser();
  }

  public async save(user: User): Promise<User> {
    return this.authenticationRepository.saveUser(user);
  }

  public async update(user: User) {
    try {
      await this.authenticationRepository.findUserById(user.$id);
      return this.authenticationRepository.saveUser(user);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error('The given user does not exist yet.');
      }
    }
  }

  public async delete(userId: number) {
    return this.authenticationRepository.deleteUserWithId(userId);
  }
}