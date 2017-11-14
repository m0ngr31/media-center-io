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
              <p class="control login">
                <button v-on:click="loginAmazon" class="button is-success is-outlined is-medium is-fullwidth">Login with Amazon</button>
              </p>
            </div>
            <div class="section forgot-password">
              <p class="has-text-centered">
                <router-link to="/">Cancel</router-link>
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

declare const process :any;

@Component({
  name: 'oauth-login',
})
export default class OAuthLogin extends Vue {
  public metaInfo(): any {
    return {
      title: 'Login'
    }
  }

  loginAmazon () {
    return PromiseWindow.open(`${process.env.API_URL}/connect/amazon`, {height: 600, width: 800}).then((data: any) => {
      const token = data.result;
      const redirect = this.$route.query.from || '/';

      Authentication.login(this, {token}, redirect);
    }, (err: any) => {});
  }
}
</script>

