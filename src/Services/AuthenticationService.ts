import { Inject, Singleton } from 'typescript-ioc';

import {User} from '../Models/User';

@Singleton
export default class AuthenticationService {
  constructor() { }

  public async findById(id: number): Promise<User> {
    return this.directorRepository.findDirectorById(id);
  }

  public async findAll(): Promise<User[]> {
    return this.directorRepository.getAllDirectors();
  }

  public async save(director: User): Promise<User> {
    return this.directorRepository.saveDirector(director);
  }

  public async update(user: User) {
    try {
      await this.directorRepository.findDirectorById(director.$id);
      return this.directorRepository.saveDirector(director);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error('The given director does not exist yet.');
      }
    }
  }

  public async delete(directorId: number) {
    return this.directorRepository.deleteDirectorWithId(directorId);
  }
}