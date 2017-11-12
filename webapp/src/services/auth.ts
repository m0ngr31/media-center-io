import {Requests} from './requests';

export const Authentication = {
  user: {
    authenticated: false
  },

  login(context, data, redirect) {
    Requests('post', '/auth/login', data).then((res) => {
      localStorage.setItem('token', data.token);

      this.user.authenticated = true;

      if (redirect) {
        context.$router.push({path: redirect})
      }
    }).catch((err) => {
      context.error = err;
    });
  },

  logout() {
    localStorage.removeItem('token');
    this.user.authenticated = false;
  },

  checkAuth() {
    var jwt = localStorage.getItem('token');
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

export const RouterCheckAuth = (to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!Authentication.checkAuth()) {
      const redirectInfo = to.path && to.path !== '/' ? '?from=' + to.path : '';
      next({ path: `/auth/login${redirectInfo}` })
    } else {
      next();
    }
  } else {
    next();
  }
};
