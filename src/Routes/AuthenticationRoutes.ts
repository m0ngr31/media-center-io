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
      Route.newRoute('/callback', 'get', async (ctx: IRouterContext) => this.authenticationController.login(ctx)),
      Route.newRoute('/test', 'get', async (ctx: IRouterContext) => this.authenticationController.verify(ctx)),
      // Route.newRoute('/login', 'post', (ctx: IRouterContext) => this.authenticationController.getAllDirectors(ctx)),
      // Route.newRoute('/reset-password/:id', 'post', (ctx: IRouterContext) => this.authenticationController.findDirectorById(ctx)),
      // Route.newRoute('/create-user/', 'post', (ctx: IRouterContext) => this.authenticationController.saveDirector(ctx)),
      // Route.newRoute('/forgot-password/:id', 'post', (ctx: IRouterContext) => this.authenticationController.saveDirector(ctx)),
    ];
  }

}