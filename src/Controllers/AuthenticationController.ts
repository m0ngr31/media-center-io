import { Context } from 'koa';
import { IMiddleware, IRouterContext } from 'koa-router';
import * as jwt from 'jsonwebtoken';
import { Inject, Singleton } from 'typescript-ioc';
import axios from 'axios';

import AuthenticationService from '../Services/AuthenticationService';
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

  public async login(ctx: IRouterContext) {
    try {
      const user = await this.getAmazonUser(ctx.query.access_token);
      const userLogin: User = User.newUser(user);
      const userData = await this.authenticationService.loginOrCreate(userLogin);
      const userToken = this.generateJWT(userData);
      await ctx.render('amazon', { userToken });
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

  // public async getAllDirectors(ctx: IRouterContext) {
  //   ctx.body = await this.authenticationService.findAll();
  // }

  // public async findDirectorById(ctx: IRouterContext) {
  //   try {
  //     ctx.body = await this.authenticationService.findById(ctx.params.id);
  //   } catch (e) {
  //     ctx.throw(404);
  //   }
  // }

  // public async saveDirector(ctx: IRouterContext) {
  //   try {
  //     const director: Director = Director.newDirector(ctx.request.body);
  //     const result = await this.authenticationService.save(director);
  //     ctx.body = result;
  //   } catch (e) {
  //     ctx.throw(400, e.message);
  //   }
  // }

  // public async updateDirector(ctx: IRouterContext) {
  //   try {
  //     const director: Director = Director.newDirector(ctx.request.body);
  //     if (String(ctx.params.id) !== String(director.$id)) {
  //       ctx.throw(400);
  //     }
  //     const result = await this.authenticationService.update(director);
  //   } catch (e) {
  //     ctx.throw(400, e.message);
  //   }
  // }

  // public async deleteDirector(ctx: IRouterContext) {
  //   const directorId = ctx.params.id;
  //   await this.authenticationService.delete(directorId);
  //   ctx.status = 200;
  // }
}