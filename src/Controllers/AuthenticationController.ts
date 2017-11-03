import { Context } from 'koa';
import { IMiddleware, IRouterContext } from 'koa-router';
import * as jwt from 'jsonwebtoken';
import { Inject, Singleton } from 'typescript-ioc';
import axios from 'axios';

import AuthenticationService from '../Services/AuthenticationService';
import { User } from '../Models/User';

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

  public async login(ctx: IRouterContext) {
    try {
      const user = await this.getAmazonUser(ctx.query.access_token);

      let userLogin = new User();
      userLogin.amazonId = user.user_id;
      userLogin.name = user.name;
      userLogin.email = user.email;

      const userData = await this.authenticationService.loginOrCreate(userLogin);

      const userToken = jwt.sign(user, "pa$$word");
      await ctx.render('amazon', { userToken });
    } catch (e) {
      console.log(e);
      ctx.throw(401);
    }
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