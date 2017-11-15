import { Context } from 'koa';
import { IMiddleware, IRouterContext } from 'koa-router';
import * as jwt from 'jsonwebtoken';
import { Inject, Singleton } from 'typescript-ioc';
import axios from 'axios';
import * as request from 'request';

import AuthenticationService from '../Services/AuthenticationService';
import ParseIni from '../Services/ParseIni';
import { User, IJWTobj } from '../Models/User';

@Singleton
export default class AuthenticationController {
  constructor(@Inject private authenticationService: AuthenticationService) { }

  private getAmazonUser(access_token: String): Promise<any> {
    return axios.get(`https://api.amazon.com/user/profile?access_token=${access_token}`)
      .then(response => response.data)
      .catch(err => {
        throw new Error(err);
      });
  }

  private generateJWT(user: User) {
    const jwtObj: IJWTobj = user.getObjForJwt();
    return jwt.sign(jwtObj, <any>process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 14 });
  }

  private getUserFromToken(ctx: IRouterContext): IJWTobj {
    const header = ctx.request.header;
    const authToken = header.authorization.replace('Bearer ', '');
    return <IJWTobj>jwt.verify(authToken, <any>process.env.JWT_SECRET);
  }

  public async amazonLogin(ctx: IRouterContext) {
    try {
      const user = await this.getAmazonUser(ctx.query.access_token);
      const userLogin: User = User.newUser(user);
      const userData = await this.authenticationService.loginOrCreate(userLogin);
      const userToken = this.generateJWT(userData);
      const webappUrl = <any>process.env.WEBAPP_URL;
      await ctx.render('amazon', { userToken, webappUrl });
    } catch (e) {
      console.log(e);
      ctx.throw(401);
    }
  }

  public async loginFromToken(ctx: IRouterContext) {
    try {
      const token = ctx.request.body.token;
      const userData = <IJWTobj>jwt.verify(token, <any>process.env.JWT_SECRET);
      // userData.token = authToken;
      // ctx.set({
      //   'Access-Control-Expose-Headers': 'Authorization',
      //   'Authorization': `Bearer ${token}`
      // });
      ctx.body = {token};
    } catch (e) {
      console.log(e);
      ctx.throw(401);
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
      const userData = this.getUserFromToken(ctx);

      const user = await this.authenticationService.findByIdDevices(userData.id);
      const blankConfig = await this.getDefaultConfig();

      const parser = new ParseIni();
      parser.parse(<string>blankConfig);
      parser.setOjb(user.$config);

      ctx.body = { user, config: parser.ini };
    } catch (e) {
      console.log(e);
      ctx.throw(401);
    }
  }

  public async saveUserConfig(ctx: IRouterContext) {
    try {
      const userData = this.getUserFromToken(ctx);

      const userConfig = ctx.request.body.config;

      const parser = new ParseIni();
      parser.parse(<string>userConfig);
      console.log(parser.schema);

      ctx.body = {};
    } catch (e) {
      console.log(e);
      ctx.throw(401);
    }
  }

  public async verify(ctx: IRouterContext) {
    const userObj: IJWTobj = this.getUserFromToken(ctx);
    const user = await this.authenticationService.findByIdDevices(userObj.id);
    ctx.body = user;
  }
}
