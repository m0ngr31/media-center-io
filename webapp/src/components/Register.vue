<template>
  <div class="login-wrapper columns">
    <div class="column is-8 is-hidden-mobile hero-banner">
      <section class="hero is-fullheight is-dark">
        <video autoplay loop style="object-fit: fill; height: 100vh">
          <source src="/static/video/alexa.mp4" type="video/mp4">
        </video>
      </section>
    </div>
    <div class="column is-4 is-white">
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
                  <hr />
                  <p class="control has-icon has-icon-right">
                    <input class="input password-input" type="password" placeholder="Password">
                    <span class="icon user">
                      <i class="fa fa-lock"></i>
                    </span>
                  </p>
                  <p class="control has-icon has-icon-right">
                    <input class="input password-input" type="password" placeholder="Confirm Password">
                    <span class="icon user">
                      <i class="fa fa-lock"></i>
                    </span>
                  </p>
                  <p class="control login">
                    <button class="button is-success is-outlined is-large is-fullwidth">Register</button>
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { ComponentOptions } from 'vue';

export default {
  name: 'register',
  metaInfo: {
    title: 'Register'
  }
} as ComponentOptions<Vue>;
</script>

