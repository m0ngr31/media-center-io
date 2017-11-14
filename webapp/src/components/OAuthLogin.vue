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
              <p class="has-text-centered">
                Give Amazon permission to use this app?
              </p>
              <p class="control login">
                <button v-on:click="oauthLogin" class="button is-success is-outlined is-medium is-fullwidth">Authorize</button>
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

import {Authentication} from '@/services/auth';

declare const process :any;

@Component({
  name: 'oauth-login',
})
export default class OAuthLogin extends Vue {
  public metaInfo(): any {
    return {
      title: 'Authorize'
    }
  }

  oauthLogin () {
    Authentication.oauthLogin(this);
  }
}
</script>

