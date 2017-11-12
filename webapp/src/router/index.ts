import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import Main from '@/components/Main.vue';
import EditConfig from '@/components/EditConfig.vue';

import Auth from '@/components/Auth.vue';
import Login from '@/components/Login.vue';
// import Register from '@/components/Register.vue';
// import ForgotPassword from '@/components/ForgotPassword.vue';
// import ResetPassword from '@/components/ResetPassword.vue';

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
      meta: { auth: false },
      children: [
        {
          path: '',
          alias: 'login',
          name: 'Login',
          component: Login
        },
        // {
        //   path: 'register',
        //   name: 'Register',
        //   component: Register
        // },
        // {
        //   path: 'forgot-password',
        //   name: 'Forgot Password',
        //   component: ForgotPassword
        // },
        // {
        //   path: 'reset-password',
        //   name: 'Reset Password',
        //   component: ResetPassword
        // }
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
