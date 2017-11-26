<template>
  <div style="display: flex; min-height: 100vh; flex-direction: column;">
    <section class="is-primary">
      <nav class="main-nav nav has-shadow is-transparent">
        <div class="navbar-brand">
          <a class="navbar-item" style="cursor: default;">
            <img src="/static/img/dark-horizontal.png" alt="Media Center" width="126" height="28">
          </a>

          <button class="button navbar-burger" data-target="navbar-dropdown">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div id="navbar-dropdown" class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Navigation
              </a>
              <div class="navbar-dropdown is-boxed is-right">
                <router-link to="/" tag="a" class="navbar-item">
                  Edit Configuration
                </router-link>
                <router-link to="about" tag="a" class="navbar-item">
                  About
                </router-link>
                <router-link to="example-commands" tag="a" class="navbar-item">
                  Example Commands
                </router-link>
                <router-link to="privacy-policy" tag="a" class="navbar-item">
                  Privacy Policy
                </router-link>
                <hr class="navbar-divider">
                <a class="navbar-item" @click="logout()">
                  Logout
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item" href="https://forum.kodi.tv/showthread.php?tid=254502">
                  Help
                </a>
                <a class="navbar-item" href="https://github.com/m0ngr31/kodi-alexa">
                  Github
                </a>
                <a class="navbar-item" href="https://twitter.com/m0ngr31">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
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

import {Authentication} from '@/services/auth';

@Component({
  name: 'main',
})
export default class Main extends Vue {
  public metaInfo(): any {
    return {
      title: 'Main'
    }
  }

  logout() {
    Authentication.logout();
  }
}
</script>

<style>
a.navbar-item:hover, a.navbar-item.is-active, .navbar-link:hover, .navbar-link.is-active {
  background-color: initial;
}

.navbar-burger {
  margin-top: 5px;
}

.navbar-item.has-dropdown {
  background-color: white;
}
</style>

