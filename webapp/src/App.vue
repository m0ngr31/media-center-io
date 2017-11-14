<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

Component.registerHooks([
  'metaInfo'
]);

@Component({
  name: 'app',
})
export default class App extends Vue {
  public metaInfo(): any {
    return {
      title: 'Home',
      titleTemplate: '%s | Media Center'
    }
  }
}
</script>

<style lang="sass">
@import '~bulmaswatch/lumen/_variables';
@import '~bulma/bulma';
@import '~bulmaswatch/lumen/_overrides';
</style>

<style>
@import '~font-awesome/css/font-awesome.css';
@import './stylesheets/global.css';
</style>
