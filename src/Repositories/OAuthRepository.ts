import { getManager } from 'typeorm';
import { Singleton } from 'typescript-ioc';

import { OAuthToken } from '../Models/OAuth';

@Singleton
export default class OAuthRepository {
  constructor() { }

  protected getRepository() {
    return getManager().getRepository(OAuthToken);
  }

  public async getAllOAuthTokens(): Promise<OAuthToken[]> {
    return this.getRepository().find();
  }

  public async findOAuthTokenById(id: number): Promise<OAuthToken> {
    const result = await this.getRepository().findOneById(id);
    if (!result) {
      throw new Error('No user was found for ID: ' + id);
    }
    return result;
  }

  public async findOAuthTokenByUserId(userId: string): Promise<OAuthToken> {
    const result = await this.getRepository().findOne({ userId });
    if (!result) {
      throw new Error('No user was found for userId: ' + userId);
    }
    return result;
  }

  public async findOAuthTokenByAuthCode(authorizationCode: string): Promise<OAuthToken> {
    const result = await this.getRepository().findOne({ authorizationCode });
    if (!result) {
      throw new Error('No user was found for authorizationCode: ' + authorizationCode);
    }
    return result;
  }

  public async createOAuthToken(token?: OAuthToken): Promise<OAuthToken> {
    let newOAuthToken = this.getRepository().create();

    if (token) {
      newOAuthToken.$clientId = token.$clientId;
      newOAuthToken.$userId = token.$userId;
      newOAuthToken.$authorizationCode = token.$authorizationCode;
      newOAuthToken.$expiresAt = token.$expiresAt;

      newOAuthToken = await this.saveOAuthToken(newOAuthToken);
    }

    return newOAuthToken;
  }

  public async saveOAuthToken(token: OAuthToken): Promise<OAuthToken> {
    return this.getRepository().save(token);
  }

  public async deleteOAuthTokenWithId(id: number) {
    await this.getRepository()
      .createQueryBuilder('token')
      .delete()
      .where('token.id = :id', { id })
      .execute();
    return Promise.resolve();
  }
}