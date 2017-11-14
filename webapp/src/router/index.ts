import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import Main from '@/components/Main.vue';
import EditConfig from '@/components/EditConfig.vue';

import Auth from '@/components/Auth.vue';
import Login from '@/components/Login.vue';
import OAuthLogin from '@/components/OAuthLogin.vue';

import {RouterCheckAuth} from '@/services/auth';

Vue.use(Router)
Vue.use(Meta);

const appRoutes = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      meta: { auth: true },
      children: [
        {
          path: '',
          alias: 'edit',
          name: 'Edit Config',
          component: EditConfig
        }
      ]
    },
    {
      path: '/auth',
      component: Auth,
      children: [
        {
          path: '',
          alias: 'login',
          name: 'Login',
          component: Login,
          meta: { auth: false },
        },
        {
          path: '/oauth',
          alias: 'oauth',
          name: 'OAuth Login',
          component: OAuthLogin,
          meta: { auth: true },
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

appRoutes.beforeEach(RouterCheckAuth);

export default appRoutes;
