<template>
  <div style="display: flex; min-height: 100vh; flex-direction: column;">
    <section class="hero is-primary">
      <div class="hero-head">
        <nav class="main-nav nav has-shadow">
          <div class="container">
            <div class="nav-left">
              <a class="nav-item" href="/">
                <h1 class="title is-5">Kodi-Voice</h1>
              </a>
              <a class="nav-item" router-link to="edit">Edit Config</a>
              <a class="nav-item" router-link to="help">Help</a>
            </div>
            <span class="nav-toggle" data-target="mainMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <div class="nav-right nav-menu" id="mainMenu">
              <a class="nav-item" href="//github.com/m0ngr31/kodi-alexa/issues" target="_blank">
                <i class="fa fa-bug"></i>&nbsp;Report an issue
              </a>
              <!-- <a class="nav-item" href="//github.com/m0ngr31" target="_blank">
                <span class="icon">
                  <i class="fa fa-github"></i>
                </span>
              </a>
              <a class="nav-item" href="//twitter.com/m0ngr31" target="_blank">
                <span class="icon">
                  <i class="fa fa-twitter"></i>
                </span>
              </a> -->
            </div>
          </div>
        </nav>
      </div>
    </section>
    <div class="columns" style="flex: 1">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <!-- <div id="about" class="content">
              <strong>Kodi-Alexa</strong> by
              <a href="http://ipson.me">Joe Ipson</a>
            </div> -->
          </div>
          <div class="column is-4">
          </div>
          <div class="column is-5">
            <div id="share" class="content" style="text-align: right;">
              <div>
                <strong>Spead the word!</strong>
              </div>
              <div id="social">
                <iframe class="github-btn" src="https://ghbtns.com/github-btn.html?user=m0ngr31&amp;repo=kodi-alexa&amp;type=star&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="130px" height="30px"></iframe>
                <div class="twitter-container">
                  <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" class="twitter-follow-button twitter-follow-button-rendered" title="Twitter Follow Button" src="http://platform.twitter.com/widgets/follow_button.b7974b8ae7c1ae9cc22c4e8064c094ca.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=m0ngr31&amp;show_count=true&amp;show_screen_name=true&amp;size=l&amp;time=1507527091983" style="position: static; visibility: visible; width: 230px; height: 29px;" data-screen-name="jgthms"></iframe>
                </div>
                <!-- <form class="paypal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                  <input type="hidden" name="cmd" value="_s-xclick">
                  <input type="hidden" name="hosted_button_id" value="8WMKYSRFN6A78">
                  <input type="image" src="http://bulma.io/images/paypal-donate.png" border="0" name="submit" alt="PayPal – The safer, easier way to pay online." height="30">
                  <img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1" hidden="" style="display: none !important;">
                </form> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
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
