<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <h1 class="has-text-centered section">
              <img src="/static/img/logo2.png" height="256" width="256">
            </h1>
            <div class="login-form">
              <p class="has-text-centered">
                Give Amazon permission to use this app?
              </p>
              <p class="control login">
                <button @click="oauthLogin" class="button is-info is-outlined is-medium is-fullwidth" v-bind:class="{'is-loading': isLoading}" :disabled="isLoading">{{isLoading ? '': 'Authorize'}}</button>
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
  isLoading: Boolean;
  $toast: any;

  public metaInfo(): any {
    return {
      title: 'Authorize'
    }
  }

  data() {
    return {
      isLoading: false
    };
  }

  async oauthLogin () {
    this.isLoading = true;

    try {
      Authentication.oauthLogin(this);
    } catch (e) {
      this.$toast.open({
        duration: 5000,
        message: `There was an error authorizing. Please try again.`,
        position: 'is-top',
        type: 'is-danger'
      });
    }

    this.isLoading = false;
  }
}
</script>

