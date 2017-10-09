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
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'authentication',
})
export default class Authentication extends Vue {
  public metaInfo(): any {
    return {
      title: 'Authentication'
    }
  }
}
</script>

