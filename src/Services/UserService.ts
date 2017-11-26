import { Inject, Singleton } from 'typescript-ioc';

import { User } from '../Models/User';
import UserRepository from '../Repositories/UserRepository';

@Singleton
export default class UserService {
  constructor(@Inject private userRepository: UserRepository) { }

  public async loginOrCreate(user: User): Promise<User> {
    try {
      return await this.findByAmazonId(user.$user_id);
    } catch (e) {
      return await this.create(user);
    }
  }

  public async findById(id: number): Promise<User> {
    return this.userRepository.findUserById(id);
  }

  public async findByIdDevices(id: number): Promise<User> {
    return this.userRepository.findUserByIdDevices(id);
  }

  public async findByAmazonId(amazonId: string) {
    return this.userRepository.findUserByAmazonId(amazonId);
  }

  public async findByAccessToken(accessToken: string) {
    return this.userRepository.findUserByAccessToken(accessToken);
  }

  public async findByRefresToken(token: string) {
    return this.userRepository.findUserByRefreshToken(token);
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  public async create(user?: User): Promise<User> {
    if (user)
      return this.userRepository.createUser(user);
    else
      return this.userRepository.createUser();
  }

  public async save(user: User): Promise<User> {
    return this.userRepository.saveUser(user);
  }

  public async update(user: User) {
    try {
      await this.userRepository.findUserById(user.$id);
      return this.userRepository.saveUser(user);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error('The given user does not exist yet.');
      }
    }
  }

  public async delete(userId: number) {
    return this.userRepository.deleteUserWithId(userId);
  }
}