import { FindOptions, getEntityManager, Repository } from 'typeorm';
import { Inject, Singleton } from 'typescript-ioc';

import { User } from '../Models/User';

@Singleton
export default class DirectorRepository {
  constructor() { }

  public async getAllDirectors(): Promise<User[]> {
    return this.getDirectorRepository().find();
  }

  public async findDirectorById(id: number): Promise<User> {
    const result = await this.getDirectorRepository().findOneById(id);
    if (!result) {
      throw new Error('No director was found for ID: ' + id);
    }
    return result;
  }

  public async saveDirector(director: User): Promise<User> {
    return this.getDirectorRepository().persist(director);
  }

  public async deleteDirectorWithId(id: number) {
    await this.movieRepository.deleteMoviesFromDirector(id);
    await this.getDirectorRepository()
      .createQueryBuilder('director')
      .delete()
      .where('director.id = :id', { id })
      .execute();
    return Promise.resolve();
  }
}