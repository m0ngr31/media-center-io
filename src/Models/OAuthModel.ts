import { Inject } from 'typescript-ioc';

import MainController from '../Controllers/MainController';

import { IOAuthCode } from './OAuth';

const amazonRedirectsEnv = process.env.OAUTH_CLIENT_REDIRECTS || '';
const amazonRedirectsArr = amazonRedirectsEnv.split(' ');

const amazon_skill = {
  id: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  name: 'Media Center Skill',
  scope: process.env.OAUTH_SCOPES,
  grants: ['authorization_code', 'refresh_token'],
  redirectUris: amazonRedirectsArr
};

const registry = {
  clients: {
    amazon_skill
  },
  scopes: {
    'user_info': {
      'desc': 'Read and Update user information'
    }
  }
};

export class OAuthModel {
  constructor(@Inject public mainController: MainController) { }

  public getClient(clientId: string, clientSecret: string) {
    let client;

    for (let a in registry.clients) {
      if (clientId === (<any>registry.clients)[a].id) {
        client = (<any>registry.clients)[a];
      }
    }

    if (client) {
      if (!clientSecret || (clientSecret === client.clientSecret)) {
        return client;
      }
    }

    return null;
  }

  public async saveAuthorizationCode(authorizationCode: any, client: any, user: any) {
    if (!authorizationCode || !client || !user) {
      return null;
    }

    try {
      const codePass: IOAuthCode = {
        ...authorizationCode,
        client: client.id,
        user: user.id
      }

      await this.mainController.saveAuthToken(codePass);
      return codePass;
    } catch (e) {
      return null;
    }
  }

  public async getAuthorizationCode(authorizationCode: string) {
    console.log('getAuthorizationCode');
    return await this.mainController.getAuthToken(authorizationCode);
  }

  public async revokeAuthorizationCode(authorizationCode: string) {
    console.log('revokeAuthorizationCode');
    return await this.mainController.revokeAuthToken(authorizationCode);
  }

  public async saveToken(token: any, client: any, user: any) {
    console.log('saveToken');
    if (!token || !client || !user) {
      return null;
    }

    return await this.mainController.saveAccessToken(token, client, user);
  }

  public async getAccessToken(accessToken: string) {
    console.log('getAccessToken');
    return await this.mainController.getAccessToken(accessToken);
  }

  public async getRefreshToken(refreshToken: any) {
    console.log('getRefreshToken');
    return await this.mainController.getAccessToken(refreshToken);
  }

  public async revokeToken(token: any) {
    console.log('revokeToken');
    return await this.mainController.revokeToken(token);
  }
}