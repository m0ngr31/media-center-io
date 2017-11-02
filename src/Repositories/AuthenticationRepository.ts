import { getEntityManager } from 'typeorm';
import { Singleton } from 'typescript-ioc';

import { User } from '../Models/User';

@Singleton
export default class AuthenticationRepository {
  constructor() { }

  protected getRepository() {
    return getEntityManager().getRepository(User);
  }

  public async getAllDirectors(): Promise<User[]> {
    return this.getRepository().find();
  }

  public async findDirectorById(id: number): Promise<User> {
    const result = await this.getRepository().findOneById(id);
    if (!result) {
      throw new Error('No director was found for ID: ' + id);
    }
    return result;
  }

  public async saveDirector(director: User): Promise<User> {
    return this.getRepository().persist(director);
  }

  public async deleteDirectorWithId(id: number) {
    await this.getRepository()
      .createQueryBuilder('director')
      .delete()
      .where('director.id = :id', { id })
      .execute();
    return Promise.resolve();
  }
}