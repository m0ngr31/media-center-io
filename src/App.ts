import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';
import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { Inject } from 'typescript-ioc';

import exceptionHandler from './ExceptionHandler';
import Playground from './Playground';

import AuthenticationRoutes from './Routes/AuthenticationRoutes';

import { User } from './Models/User';
import { Config } from './Models/Config';

export default class App {

  constructor(
    @Inject private authenticationRoutes: AuthenticationRoutes
  ) {}

  private async createApp() {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'unnamed',
      entities: [
        User,
        Config
      ],
      synchronize: true,
      logging: false
    });

    // const bob: Playground = new Playground();
    // bob.parse();

    const app: Koa = new Koa();
    const router: Router = new Router();

    // this.movieRoutes.register(router);
    // this.directorRoutes.register(router);
    this.authenticationRoutes.register(router);

    app.use(logger());
    app.use(bodyParser());
    app.use(exceptionHandler);
    app.use(router.routes());
    app.use(router.allowedMethods());

    return Promise.resolve(app);
  }

  public async start() {
    const app = await this.createApp();
    console.log('Started listening on port 3000...');
    const server = app.listen(3000);
    return Promise.resolve(server);
  }
}