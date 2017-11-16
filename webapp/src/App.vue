<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import {Notifications} from '@/services/notifications';

Component.registerHooks([
  'metaInfo'
]);

@Component({
  name: 'app',
})
export default class App extends Vue {
  $toast: any;

  public metaInfo(): any {
    return {
      title: 'Home',
      titleTemplate: '%s | Media Center'
    }
  }

  mounted() {
    Notifications.service = this.$toast;
  }
}
</script>

<style lang="sass">
@import '~bulmaswatch/lumen/_variables';
@import '~bulma/bulma';
@import '~bulmaswatch/lumen/_overrides';

@import '~buefy/src/scss/utils/_variables';
@import '~buefy/src/scss/utils/_animations';
@import '~buefy/src/scss/components/_notices';
</style>

<style>
@import '~font-awesome/css/font-awesome.css';
@import './stylesheets/global.css';
</style>
