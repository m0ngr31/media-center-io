import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import Main from '@/components/Main.vue';
import EditConfig from '@/components/EditConfig.vue';
import About from '@/components/About.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';
import Commands from '@/components/Commands.vue';
import GettingStarted from '@/components/GettingStarted.vue'

import Auth from '@/components/Auth.vue';
import Login from '@/components/Login.vue';

import {RouterCheckAuth} from '@/services/auth';

Vue.use(Router)
Vue.use(Meta);

const appRoutes = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          alias: 'edit-config',
          name: 'Edit Config',
          component: EditConfig,
          meta: { auth: true },
        },
        {
          path: 'about',
          name: 'About',
          component: About,
          meta: { auth: false },
        },
        {
          path: 'privacy-policy',
          name: 'Privacy Policy',
          component: PrivacyPolicy,
          meta: { auth: false },
        },
        {
          path: 'example-commands',
          name: 'Commnads',
          component: Commands,
          meta: { auth: false },
        },
        {
          path: 'getting-started',
          name: 'Getting Started',
          component: GettingStarted,
          meta: { auth: false },
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
