<template>
  <div style="display: flex; min-height: 100vh; flex-direction: column;">
    <section class="hero is-primary">
      <div class="hero-head">
        <nav class="main-nav nav has-shadow">
          <div class="container">
            <div class="nav-left">
              <a class="nav-item" href="/">
                <h1 class="title is-5">Media Center</h1>
              </a>
              <a class="nav-item" href="//github.com/m0ngr31/kodi-alexa/issues" target="_blank">
                <i class="fa fa-bug"></i>&nbsp;Report an issue
              </a>
            </div>
            <span class="nav-toggle" data-target="mainMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </nav>
      </div>
    </section>
    <div class="columns" style="flex: 1">
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
  name: 'main',
})
export default class Main extends Vue {
  public metaInfo(): any {
    return {
      title: 'Main'
    }
  }
}
</script>
