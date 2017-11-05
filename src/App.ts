import * as path from 'path';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';
import * as views from 'koa-views';
import * as mount from 'koa-mount';
import * as jwt from 'koa-jwt';
import * as Grant from 'grant-koa';
import * as session from 'koa-session';
import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { Inject } from 'typescript-ioc';

import exceptionHandler from './ExceptionHandler';
import Playground from './Playground';

import AuthenticationRoutes from './Routes/AuthenticationRoutes';

import { User } from './Models/User';
import { Device } from './Models/Device';

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
        Device
      ],
      synchronize: true,
      logging: false
    });

    // const bob: Playground = new Playground();
    // bob.parse();

    const app: Koa = new Koa();
    app.keys = ['grant'];
    const router: Router = new Router();

    app.use(views(path.join(__dirname, '/Views'), { extension: 'ejs' }));
    app.use(
      jwt({
        secret: <any>process.env.JWT_SECRET,
      }).unless({
        path: [/^\/connect/, /^\/callback/, /^\/Views/],
      })
    );

    // this.movieRoutes.register(router);
    // this.directorRoutes.register(router);
    this.authenticationRoutes.register(router);

    const grant = new Grant({
      server: {
        protocol: process.env.SCHEME,
        host: process.env.SERVER_URI,
        state: true
      },
      amazon: {
        key: process.env.AMAZON_KEY,
        secret: process.env.AMAZON_SECRET,
        scope: ['profile'],
        callback: '/callback'
      },
    });

    app.use(session(app));
    app.use(mount(grant));
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