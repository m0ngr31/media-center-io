import {Requests} from './requests';
import {Notifications} from './notifications';

import router from '@/router/index';

declare const process: any;

export const Authentication = {
  user: {
    authenticated: false
  },

  async login(context: any, data: any) {
    const query = { ...context.$route.query };
    const path = query.from || '/';
    delete query.from;

    try {
      const res = await Requests.post('/auth/login', data);
      let authToken = res.headers['authorization'];
      authToken = authToken.replace('Bearer ', '');

      localStorage.setItem('token', authToken);
      this.user.authenticated = true;
      router.push({ path, query });
    } catch (e) {
      throw new Error('Error logging in');
    }
  },

  async oauthLogin(context: any) {
    const query = { ...context.$route.query };
    query.redirect_uri = `${process.env.API_URL}/oauth/finish`;

    try {
      const res = await Requests.post('/oauth/authorize', query);
      const params = Object.keys(res.data).map(key => `${key}=${encodeURIComponent(res.data[key])}`).join('&');
      // location.href = `${context.$route.query.redirect_uri}?${params}`;
    } catch (e) {
      throw new Error('Error authorizing with OAuth');
    }
  },

  logout(showMsg?: Boolean) {
    localStorage.removeItem('token');
    this.user.authenticated = false;
    router.push({name: 'Login'});

    if (showMsg) {
      Notifications.service.open({
        duration: 10000,
        message: `Session Expired. Please login again.`,
        position: 'is-top',
        type: 'is-danger'
      });
    }
  },

  checkAuth() {
    let jwt = localStorage.getItem('token');
    if (jwt) {
      this.user.authenticated = true;
    }
    else {
      this.user.authenticated = false;
    }

    return this.user.authenticated;
  },

  getAuthHeader() {
    return 'Bearer ' + localStorage.getItem('token');
  }
};

export const RouterCheckAuth = (to: any, from: any, next: any) => {
  if (to.matched.some((record: any) => record.meta.auth) && !Authentication.checkAuth()) {
    const query = { ...to.query };

    if (to.path && to.path !== '/') {
      query.from = to.path;
    }

    next({ path: '/auth/login', query });
  } else if (Authentication.checkAuth() && to.name === 'Login') {
    if (to.query.from) {
      next({ path: to.query.from, query: to.query });
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
};
