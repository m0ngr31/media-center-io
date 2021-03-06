import * as Koa from 'koa'
import { Exception } from './Services/ErrorService';

export default async (ctx: Koa.Context, next: Function) => {
  try {
    return next();
  } catch (err) {
    if (err instanceof Exception) {
      // it transform the exception to an object literal
      ctx.body = err.toObject();
      ctx.status = err.statusCode;
    } else {
      // unknow error
      ctx.body = { message: 'Unexpected error.' };
      ctx.status = 500;
    }
  }
};