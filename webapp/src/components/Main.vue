<template>
  <div>
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
            <span class="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <div class="nav-right nav-menu">
              <a class="nav-item" href="//github.com/jenil/bulmaswatch/issues" target="_blank" onclick="ga('send', 'event', 'nav', 'click', 'issue');">
                <i class="fa fa-bug"></i>&nbsp;Report an issue
              </a>
              <a class="nav-item" href="//github.com/jenil/bulmaswatch" target="_blank" onclick="ga('send', 'event', 'nav', 'click', 'github');">
                <span class="icon">
                  <i class="fa fa-github"></i>
                </span>
              </a>
              <a class="nav-item" href="//twitter.com/geekGogari" target="_blank" onclick="ga('send', 'event', 'nav', 'click', 'twitter');">
                <span class="icon">
                  <i class="fa fa-twitter"></i>
                </span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </section>
    <div class="columns">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <div id="about" class="content">
            <strong xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">Bulma</strong> by
            <a xmlns:cc="http://creativecommons.org/ns#" href="http://jgthms.com" property="cc:attributionName" rel="cc:attributionURL">Jeremy Thomas</a>.
            <p id="alternative">
              <a href="http://bulma.io/alternative-to-bootstrap/">An alternative to
                <strong>Bootstrap</strong>
              </a>
            </p>

            <div class="twitter-container">
              <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" class="twitter-follow-button twitter-follow-button-rendered" title="Twitter Follow Button" src="http://platform.twitter.com/widgets/follow_button.b7974b8ae7c1ae9cc22c4e8064c094ca.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=jgthms&amp;show_count=true&amp;show_screen_name=true&amp;size=l&amp;time=1507527091983" style="position: static; visibility: visible; width: 230px; height: 29px;" data-screen-name="jgthms"></iframe>
            </div>

          </div>
        </div>
        <div class="column is-5">
          <div id="share" class="content">
            <div>
              <strong>Support</strong> and share the love!
            </div>

            <div id="social">
              <iframe class="github-btn" src="https://ghbtns.com/github-btn.html?user=jgthms&amp;repo=bulma&amp;type=star&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>

              <iframe id="twitter-widget-1" scrolling="no" frameborder="0" allowtransparency="true" class="twitter-share-button twitter-share-button-rendered twitter-tweet-button" title="Twitter Tweet Button" src="http://platform.twitter.com/widgets/tweet_button.b7974b8ae7c1ae9cc22c4e8064c094ca.en.html#dnt=false&amp;id=twitter-widget-1&amp;lang=en&amp;original_referer=http%3A%2F%2Fbulma.io%2Fdocumentation%2Flayout%2Fcontainer%2F&amp;related=jgthms%3ACreator%20of%20Bulma&amp;size=l&amp;text=Bulma%3A%20a%20modern%20CSS%20framework%20based%20on%20Flexbox&amp;time=1507527091993&amp;type=share&amp;url=http%3A%2F%2Fbulma.io&amp;via=jgthms" style="position: static; visibility: visible; width: 76px; height: 29px;" data-url="http://bulma.io"></iframe>

              <form class="paypal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick">
                <input type="hidden" name="hosted_button_id" value="8WMKYSRFN6A78">
                <input type="image" src="http://bulma.io/images/paypal-donate.png" border="0" name="submit" alt="PayPal – The safer, easier way to pay online." height="30">
                <img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1" hidden="" style="display: none !important;">
              </form>

              <div class="fb-like fb_iframe_widget" data-href="https://www.facebook.com/bulmaio" data-layout="button" data-action="like" data-size="large" data-show-faces="false" data-share="true" fb-xfbml-state="rendered" fb-iframe-plugin-query="action=like&amp;app_id=310296819307942&amp;container_width=130&amp;href=https%3A%2F%2Fwww.facebook.com%2Fbulmaio&amp;layout=button&amp;locale=en_US&amp;sdk=joey&amp;share=true&amp;show_faces=false&amp;size=large">
                <span style="vertical-align: bottom; width: 121px; height: 28px;">
                  <iframe name="f38e85e2934a11c" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="fb:like Facebook Social Plugin" src="https://www.facebook.com/v2.8/plugins/like.php?action=like&amp;app_id=310296819307942&amp;channel=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FZ2duorNoYeF.js%3Fversion%3D42%23cb%3Df24c854054ca2d8%26domain%3Dbulma.io%26origin%3Dhttp%253A%252F%252Fbulma.io%252Ff1e981cc9ba78b%26relation%3Dparent.parent&amp;container_width=130&amp;href=https%3A%2F%2Fwww.facebook.com%2Fbulmaio&amp;layout=button&amp;locale=en_US&amp;sdk=joey&amp;share=true&amp;show_faces=false&amp;size=large" style="border: none; visibility: visible; width: 121px; height: 28px;" class=""></iframe>
                </span>
              </div>
            </div>

          </div>
        </div>
        <div class="column is-4">
          <div id="sister">
            <p>
              More
              <strong>helpful</strong> tools:
            </p>
            <ul>
              <li>
                <a href="http://cssreference.io">
                  <img src="http://bulma.io/images/css-reference-logo.png" alt="CSS Reference logo">
                </a>
              </li>
              <li>
                <a href="http://htmlreference.io">
                  <img src="http://bulma.io/images/html-reference-logo.png" alt="HTML Reference logo">
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p id="tsp">
        <small>
          Source code licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          <br> Website content licensed
          <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>.
        </small>
      </p>
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
