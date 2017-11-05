import { getManager } from 'typeorm';
import { Singleton } from 'typescript-ioc';

import { User } from '../Models/User';

@Singleton
export default class AuthenticationRepository {
  constructor() { }

  protected getRepository() {
    return getManager().getRepository(User);
  }

  public async getAllUsers(): Promise<User[]> {
    return this.getRepository().find();
  }

  public async findUserById(id: number): Promise<User> {
    const result = await this.getRepository().findOneById(id);
    if (!result) {
      throw new Error('No user was found for ID: ' + id);
    }
    return result;
  }

  public async findUserByIdDevices(id: number): Promise<User> {
    const result = await this.getRepository().findOneById(id, {relations: ["devices"]});
    if (!result) {
      throw new Error('No user was found for ID: ' + id);
    }
    return result;
  }

  public async findUserByAmazonId(user_id: string): Promise<User> {
    const result = await this.getRepository().findOne({ user_id });
    if (!result) {
      throw new Error('No user was found for AmazonId: ' + user_id);
    }
    return result;
  }

  public async createUser(user?: User): Promise<User> {
    let newUser = this.getRepository().create();

    if (user) {
      newUser.$user_id = user.$user_id;
      newUser.$email = user.$email;
      newUser.$name = user.$name;

      newUser = await this.saveUser(newUser);
    }

    return newUser;
  }

  public async saveUser(user: User): Promise<User> {
    return this.getRepository().save(user);
  }

  public async deleteUserWithId(id: number) {
    await this.getRepository()
      .createQueryBuilder('user')
      .delete()
      .where('user.id = :id', { id })
      .execute();
    return Promise.resolve();
  }
}