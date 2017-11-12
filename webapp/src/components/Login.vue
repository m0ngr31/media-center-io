<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <h1 class="avatar has-text-centered section">
              <img src="/static/img/logo.png" height="128" width="128">
            </h1>
            <div class="login-form">
              <p class="control has-icon has-icon-right">
                <input class="input email-input" type="text" placeholder="Email Address">
                <span class="icon user">
                  <i class="fa fa-user"></i>
                </span>
              </p>
              <p class="control has-icon has-icon-right">
                <input class="input password-input" type="password" placeholder="Password">
                <span class="icon user">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
              <p class="control login">
                <button v-on:click="loginAmazon" class="button is-success is-outlined is-large is-fullwidth">Login with Amazon</button>
              </p>
            </div>
            <div class="section forgot-password">
              <p class="has-text-centered">
                <router-link to="/auth/forgot-password">Forgot password</router-link>
                <router-link to="/auth/register">Register</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PromiseWindow from 'promise-window';

import {Authentication} from '@/services/auth';

@Component({
  name: 'login',
})
export default class Login extends Vue {
  public metaInfo(): any {
    return {
      title: 'Login'
    }
  }

  loginAmazon () {
    return PromiseWindow.open('http://localhost:3000/connect/amazon', {height: 600, width: 800}).then((data: any) => {
      const token = data.result;
      const redirect = this.$route.query.from || '/';

      Authentication.login(this, {token}, redirect);
    }, (err: any) => {});
  }
}
</script>

