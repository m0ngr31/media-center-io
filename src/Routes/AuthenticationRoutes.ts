import { IMiddleware, IRouterContext } from 'koa-router';
import { Container, Inject } from 'typescript-ioc';

import AuthenticationController from '../Controllers/AuthenticationController';
import Route from '../Models/Route';
import IRoutes from './IRoutes';

export default class AuthenticationRoutes extends IRoutes {

  constructor(@Inject private authenticationController: AuthenticationController) {
    super();
  }

  protected getRoutes(): Route[] {
    return [
      Route.newRoute('/callback', 'get', async (ctx: IRouterContext) => this.authenticationController.amazonLogin(ctx)),
      Route.newRoute('/auth/login', 'post', async (ctx: IRouterContext) => this.authenticationController.loginFromToken(ctx)),
      Route.newRoute('/auth/user', 'get', async (ctx: IRouterContext) => this.authenticationController.verify(ctx)),
      Route.newRoute('/test', 'get', async (ctx: IRouterContext) => this.authenticationController.verify(ctx)),
      Route.newRoute('/user/config', 'get', async (ctx: IRouterContext) => this.authenticationController.userConfig(ctx)),
      Route.newRoute('/user/config/save', 'post', async (ctx: IRouterContext) => this.authenticationController.saveUserConfig(ctx)),
      // Route.newRoute('/login', 'post', (ctx: IRouterContext) => this.authenticationController.getAllDirectors(ctx)),
      // Route.newRoute('/reset-password/:id', 'post', (ctx: IRouterContext) => this.authenticationController.findDirectorById(ctx)),
      // Route.newRoute('/create-user/', 'post', (ctx: IRouterContext) => this.authenticationController.saveDirector(ctx)),
      // Route.newRoute('/forgot-password/:id', 'post', (ctx: IRouterContext) => this.authenticationController.saveDirector(ctx)),
    ];
  }

}