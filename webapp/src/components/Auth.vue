<template>
  <div class="login-wrapper columns">
    <div class="column is-one-thirds-widescreen is-one-thirds-fullhd is-hidden-touch is-hidden-desktop-only"></div>
    <div class="column is-one-third-fullhd is-one-third-widescreen is-whole-touch is-whole-desktop-only is-white">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="column is-one-thirds-widescreen is-one-thirds-fullhd is-hidden-touch is-hidden-desktop-only"></div>
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

