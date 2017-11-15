import {Requests} from './requests';

export const Authentication = {
  user: {
    authenticated: false
  },

  login(context: any, data: any) {
    const query = { ...context.$route.query };
    const path = query.from || '/';
    delete query.from;

    Requests.post('/auth/login', data).then((res) => {
      localStorage.setItem('token', data.token);
      this.user.authenticated = true;
      context.$router.push({ path, query });
    }).catch((err) => {
      context.error = err;
    });
  },

  oauthLogin(context: any) {
    Requests.post('/auth/login', {}).then((res) => {
      location.replace(context.$route.redirect_uri);
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
