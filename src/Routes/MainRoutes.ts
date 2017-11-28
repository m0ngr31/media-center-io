import { IRouterContext } from 'koa-router';
import { Container, Inject } from 'typescript-ioc';

import MainController from '../Controllers/MainController';
import Route from '../Models/Route';
import IRoutes from './IRoutes';

export default class MainRoutes extends IRoutes {

  constructor(@Inject private mainController: MainController) {
    super();
  }

  protected getRoutes(): Route[] {
    return [
      Route.newRoute('/callback', 'get', async (ctx: IRouterContext) => this.mainController.amazonLogin(ctx)),
      Route.newRoute('/auth/login', 'post', async (ctx: IRouterContext) => this.mainController.loginFromToken(ctx)),
      Route.newRoute('/auth/user', 'get', async (ctx: IRouterContext) => this.mainController.verify(ctx)),
      Route.newRoute('/user/config', 'get', async (ctx: IRouterContext) => this.mainController.userConfig(ctx)),
      Route.newRoute('/user/config/save', 'post', async (ctx: IRouterContext) => this.mainController.saveUserConfig(ctx)),
      Route.newRoute('/user/config/skill', 'post', async (ctx: IRouterContext) => this.mainController.userConfigSkill(ctx))
    ];
  }

}