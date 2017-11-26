import { Context, Request } from 'koa';
import { IMiddleware, IRouterContext } from 'koa-router';
import * as jwt from 'jsonwebtoken';
import { Inject, Singleton } from 'typescript-ioc';
import axios from 'axios';
import * as request from 'request';

import UserService from '../Services/UserService';
import OAuthService from '../Services/OAuthService';
import ParseIni from '../Services/ParseIni';

import { User, IJWTobj } from '../Models/User';
import { OAuthToken, IOAuthCode } from '../Models/OAuth';

@Singleton
export default class MainController {
  constructor(
    @Inject private userService: UserService,
    @Inject private oauthService: OAuthService
  ) { }

  private async getAmazonUser(access_token: String): Promise<any> {
    try {
      const res = await axios.get(`https://api.amazon.com/user/profile?access_token=${access_token}`);
      return res.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  private generateJWT(user: User) {
    const jwtObj: IJWTobj = user.getObjForJwt();
    return jwt.sign(jwtObj, <any>process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 14 });
  }

  private getUserFromToken(request: Request): IJWTobj {
    const header = request.header || request.headers;
    const authToken = header.authorization.replace('Bearer ', '');
    return <IJWTobj>jwt.verify(authToken, <any>process.env.JWT_SECRET);
  }

  public async amazonLogin(ctx: IRouterContext) {
    try {
      const user = await this.getAmazonUser(ctx.query.access_token);
      const userLogin: User = User.newUser(user);
      const userData = await this.userService.loginOrCreate(userLogin);
      const userToken = this.generateJWT(userData);
      const webappUrl = <any>process.env.WEBAPP_URL;
      await ctx.render('amazon', { userToken, webappUrl });
    } catch (e) {
      console.log(e);
      ctx.status = 401;
      ctx.body = {
        error: e
      };
    }
  }

  public async loginFromToken(ctx: IRouterContext) {
    try {
      const token = ctx.request.body.token;
      const userData = <IJWTobj>jwt.verify(token, <any>process.env.JWT_SECRET);
      ctx.set({
        'Access-Control-Expose-Headers': 'Authorization',
        'Authorization': `Bearer ${token}`
      });
      ctx.body = {};
    } catch (e) {
      console.log(e);
      ctx.status = 401;
      ctx.body = {
        error: e
      };
    }
  }

  private async getDefaultConfig() {
    return new Promise((resolve, reject) => {
      request.get(<any>process.env.CONFIG_TEMPLATE, (error: any, response: any, body: any) => {
        if (!error && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }

  public async userConfig(ctx: IRouterContext) {
    try {
      const userData = this.getUserFromToken(ctx.request);

      const user = await this.userService.findByIdDevices(userData.id);
      const blankConfig = await this.getDefaultConfig();

      const parser = new ParseIni();
      parser.parse(<string>blankConfig);
      parser.setOjb(user.$config);

      ctx.body = { config: parser.ini };
    } catch (e) {
      console.log(e);
      ctx.status = 401;
      ctx.body = {
        error: e
      };
    }
  }

  public async saveUserConfig(ctx: IRouterContext) {
    const userData = this.getUserFromToken(ctx.request);

    try {
      const userConfig = ctx.request.body.config;

      const parser = new ParseIni();
      parser.parse(<string>userConfig);

      if (!parser.verifyData()) {
        throw new Error('Must fill out all required data fields');
      }

      const user = await this.userService.findById(userData.id);
      user.$config = parser.schema;
      await this.userService.save(user);

      ctx.body = {};
    } catch (e) {
      console.log(e);
      ctx.status = 400;
      ctx.body = {
        error: e.message
      };
    }
  }

  public async verify(ctx: IRouterContext) {
    const userObj: IJWTobj = this.getUserFromToken(ctx.request);
    const user = await this.userService.findByIdDevices(userObj.id);
    ctx.body = user;
  }

  public async getOAuthUser(request: Request) {
    const userObj: IJWTobj = this.getUserFromToken(request);
    const user = await this.userService.findById(userObj.id);
    return user;
  }

  public async saveAuthToken(data: IOAuthCode) {
    const token = OAuthToken.newToken(data);
    await this.oauthService.SaveOrCreate(token);
  }

  public async getAuthToken(authToken: string) {
    try {
      const token = await this.oauthService.findByAuthCode(authToken);
      const authTokenData = {
        ...token,
        client: {
          id: token.$clientId
        },
        user: {
          id: token.$userId
        }
      };

      return authTokenData;
    } catch (e) {
      return null;
    }
  }

  public async revokeAuthToken(authToken: string) {
    try {
      const token = await this.oauthService.findByAuthCode(authToken);
      await this.oauthService.delete(token.$id);
      return true;
    } catch (e) {
      return false;
    }
  }

  public async saveAccessToken(accessToken: any, client: any, userData: any) {
    try {
      const user = await this.userService.findByAmazonId(userData.id);
      user.$accessToken = accessToken.accessToken;
      user.$accessTokenExpiresAt = accessToken.accessTokenExpiresAt;
      user.$refreshToken = accessToken.refreshToken;
      user.$refreshTokenExpiresAt = accessToken.refreshTokenExpiresAt;

      await this.userService.save(user);

      const newTokenData = {
        ...accessToken,
        client,
        user: userData
      };

      return newTokenData;
    } catch (e) {
      return null;
    }
  }

  public async getAccessToken(accessToken: string) {
    try {
      const user = await this.userService.findByAccessToken(accessToken);
      const token = {
        accessToken: user.$accessToken,
        accessTokenExpiresAt: user.$accessTokenExpiresAt,
        user: {
          id: user.$user_id
        }
      };

      return token;
    } catch (e) {
      return null;
    }
  }

  public async getRefreshToken(refreshToken: string) {
    try {
      const user = await this.userService.findByRefresToken(refreshToken);
      const token = {
        refreshToken: user.$refreshToken,
        refreshTokenExpiresAt: user.$refreshTokenExpiresAt,
        user: {
          id: user.$user_id
        }
      };

      return token;
    } catch (e) {
      return null;
    }
  }

  public async revokeToken(token: any) {
    try {
      const user = await this.userService.findByRefresToken(token.refreshToken);
      user.$accessToken = '';
      user.$refreshToken = '';
      await this.userService.save(user);
      return true;
    } catch (e) {
      return false;
    }
  }

  public async finishOAuth(ctx: IRouterContext) {
    ctx.body = ctx.request.query;
  }
}
