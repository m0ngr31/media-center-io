import * as OAuthServer from 'koa2-oauth-server';
import * as Router from 'koa-router';
import * as Koa from 'koa';
import { Inject } from 'typescript-ioc';

import { OAuthModel } from '../Models/OAuthModel';
import MainController from '../Controllers/MainController';

export default class OAuthRoutes {
  router: Router;

  constructor(
    @Inject public mainController: MainController,
    @Inject private model: OAuthModel
  ) {
    this.router = new Router({prefix: '/oauth'});

    const oauth = new OAuthServer({
      model: this.model,
      useErrorHandler: true
    });

    this.router.post('/authorize', oauth.authorize({
      authenticateHandler: this.authenticateHandler()
    }));

    this.router.post('/token', oauth.token());

    this.router.use('/config', oauth.authenticate());
    this.router.post('/config', async (ctx: Router.IRouterContext) => this.mainController.userConfig(ctx));

    this.router.all('/finish', async (ctx: Router.IRouterContext) => this.mainController.finishOAuth(ctx));

    //error handler
    this.router.all('/*', async (ctx, next) => {
      var oauthState = ctx.state.oauth || {};

      if (oauthState.error) {
        //handle the error thrown by the oauth.authenticate middleware here
        ctx.throw(oauthState.error);
        return;
      }

      await next();
    });
  }

  authenticateHandler() {
    return {
      handle: async (request: Koa.Request, response: Koa.Response) => {
        try {
          const dbUser = await this.mainController.getOAuthUser(request);
          const user = { id: dbUser.$user_id };
          return user;
        } catch (e) {
          return null;
        }
      }
    };
  }
}
