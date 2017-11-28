import { Context, Request } from 'koa';
import { IMiddleware, IRouterContext } from 'koa-router';
import * as jwt from 'jsonwebtoken';
import { Inject, Singleton } from 'typescript-ioc';
import axios from 'axios';
import * as request from 'request';

import UserService from '../Services/UserService';
import DeviceService from '../Services/DeviceService';
import ParseIni from '../Services/ParseIni';

import { User, IJWTobj } from '../Models/User';
import { Device } from '../Models/Device';

@Singleton
export default class MainController {
  constructor(
    @Inject private userService: UserService,
    @Inject private deviceService: DeviceService
  ) { }

  private async getAmazonUser(access_token: string): Promise<any> {
    try {
      const res = await axios.get(`https://api.amazon.com/user/profile?access_token=${access_token}`);
      return res.data;
    } catch (e) {
      console.log(e);
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
      let blankConfig = await this.getDefaultConfig();

      const parser = new ParseIni();
      parser.parse(<string>blankConfig);
      parser.setOjb(user.$config);

      if (user.devices.length) {
        let extraDevicesInfo = [
          '\n\n# Here are devices that I have detected automatically. Just remove the \'#\' before them\n',
          '# and configure normally. These get added as you use the skill, so check back after you\'ve\n',
          '# used some more devices!'
        ];

        let unusedDeviceCount = 0;

        user.devices.forEach(device => {
          const deviceObj = parser.schema[device.$device_id];
          const deviceId = device.$device_id;

          if (!deviceObj) {
            extraDevicesInfo.push(`\n\n#[${deviceId}]\n`);
            extraDevicesInfo.push('address=living-room-kodi');
            unusedDeviceCount += 1;
          }
        });

        if (unusedDeviceCount > 0) {
          extraDevicesInfo.forEach(line => {
            parser.ini += line;
          });
        }
      }

      ctx.body = { config: parser.ini };
    } catch (e) {
      console.log(e);
      ctx.status = 400;
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

  public async userConfigSkill(ctx: IRouterContext) {
    let user;

    try {
      const amazonUser = await this.getAmazonUser(ctx.request.body.accessToken);
      user = await this.userService.findByAmazonIdDevices(amazonUser.user_id);
    } catch (e) {
      console.log(e);
      ctx.status = 401;
      ctx.body = {
        error: e.message
      };
      return;
    }

    try {
      if (ctx.request.body.device && ctx.request.body.device !== 'Unknown Device') {
        const device = new Device();
        device.$device_id = ctx.request.body.device;
        await this.deviceService.findOrCreate(device, user);
      }
    } catch (e) {
      console.log(e);
      ctx.status = 400;
      ctx.body = {
        error: e.message
      };
      return;
    }

    const parser = new ParseIni();
    parser.parse('');
    parser.setOjb(user.$config);

    console.log({
      ini: parser.ini
    });

    ctx.body = {
      ini: parser.ini
    };
  }
}
