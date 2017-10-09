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
                <button class="button is-success is-outlined is-large is-fullwidth">Forgot Password</button>
              </p>
            </div>
            <div class="section forgot-password">
              <p class="has-text-centered">
                <router-link to="login">Cancel</router-link>
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

@Component({
  name: 'forgot-password',
})
export default class ForgotPassword extends Vue {
  public metaInfo(): any {
    return {
      title: 'Forgot Password'
    }
  }
}
</script>

