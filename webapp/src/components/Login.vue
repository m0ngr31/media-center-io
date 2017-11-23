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
              <p class="control login">
                <button @click="loginAmazon" class="button is-info is-outlined is-medium is-fullwidth" v-bind:class="{'is-loading': isLoading}" :disabled="isLoading">{{isLoading ? '': 'Login with Amazon'}}</button>
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
  name: 'login',
})
export default class Login extends Vue {
  isLoading: Boolean;
  $toast: any;

  public metaInfo(): any {
    return {
      title: 'Login'
    }
  }

  data() {
    return {
      isLoading: false
    };
  }

  async loginAmazon () {
    this.isLoading = true;

    try {
      const data = await PromiseWindow.open(`${process.env.API_URL}/connect/amazon`, {height: 600, width: 800});
      const token = data.result;
      await Authentication.login(this, {token});
    } catch (e) {
      this.$toast.open({
        duration: 5000,
        message: `There was an error logging in. Please try again.`,
        position: 'is-top',
        type: 'is-danger'
      });
    }

    this.isLoading = false;
  }
}
</script>

