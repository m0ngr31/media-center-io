import { Inject, Singleton } from 'typescript-ioc';

import { OAuthToken } from '../Models/OAuth';
import OAuthRepository from '../Repositories/OAuthRepository';

@Singleton
export default class OAuthService {
  constructor(@Inject private oauthRepository: OAuthRepository) { }

  public async SaveOrCreate(token: OAuthToken): Promise<OAuthToken> {
    try {
      return await this.findByUserId(token.$userId);
    } catch (e) {
      return await this.create(token);
    }
  }

  public async findById(id: number): Promise<OAuthToken> {
    return this.oauthRepository.findOAuthTokenById(id);
  }

  public async findByUserId(userId: string) {
    return this.oauthRepository.findOAuthTokenByUserId(userId);
  }

  public async findByAuthCode(authorizationCode: string) {
    return this.oauthRepository.findOAuthTokenByAuthCode(authorizationCode);
  }

  public async findAll(): Promise<OAuthToken[]> {
    return this.oauthRepository.getAllOAuthTokens();
  }

  public async create(token?: OAuthToken): Promise<OAuthToken> {
    if (token)
      return this.oauthRepository.createOAuthToken(token);
    else
      return this.oauthRepository.createOAuthToken();
  }

  public async save(token: OAuthToken): Promise<OAuthToken> {
    return this.oauthRepository.saveOAuthToken(token);
  }

  public async update(token: OAuthToken) {
    try {
      await this.oauthRepository.findOAuthTokenById(token.$id);
      return this.oauthRepository.saveOAuthToken(token);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error('The given token does not exist yet.');
      }
    }
  }

  public async delete(tokenId: number) {
    return this.oauthRepository.deleteOAuthTokenWithId(tokenId);
  }
}