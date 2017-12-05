<template>
  <div class="column">
    <div class="field container">
      <h1 class="title">About the project</h1>
      <p>This project was born in the early days of the Amazon Echo. I received one as a gift and wanted to find something for it to do. I didn&#39;t have any &quot;smart home&quot; devices, and didn&#39;t have much of a use for it besides listening to music. There weren&#39;t very many skills at the time so functionality wasn&#39;t great.</p>
      <p>I started looking for a way to control Kodi with Alexa and found a <a href="https://github.com/makermusings/echo_kodi/" target="_blank">project</a> that had a good start, but since it only had 3 intents, it was very limited in what it could do. So I forked it and started work expanding the functionality. I started the project over a weekend and it has grown significantly from there.</p>
      <p>My initial release cleaned up some of the original work, added 20 more intents, and had a tutorial about how to host and setup the skill yourself. I received a lot of response from this and over the course of the next few years the project now has over 130 intents with support in English and German, and there are over 10 contributors to the source code. It has undergone several refactorings, and now is using the <a href="https://github.com/johnwheeler/flask-ask" target="_blank">Flask-Ask</a> framework.</p>
      <p>You can view the source code <a href="https://github.com/m0ngr31/kodi-alexa" target="_blank">here</a>. The Media Center skill still runs on the same source code, so you don&#39;t lose any functionality if you still prefer to host the skill yourself.</p>
      <p><strong><em>Media Center</em></strong> is simply the hosted version of the skill for those who don&#39;t want to be bothered to manage the skill and server upkeep.</p>
      <p>It is provided as a free service, and will always remain free.</p>
      <p>The source code for this site is located <a href="https://github.com/m0ngr31/media-center-io" target="_blank">here</a>.</p>
      <h1 class="title">About the creator</h1>
      <p>My name is Joe. You can follow me on <a href="https://twitter.com/m0ngr31" target="_blank">Twitter</a> and <a href="https://github.com/m0ngr31/" target="_blank">Github</a>. Thanks for visiting. I hope the skill does everything you need it to. You can always contact me here: joe(at)ipson.me</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'about',
})
export default class About extends Vue {
  public metaInfo(): any {
    return {
      title: 'About'
    }
  }
}
</script>

<style scoped>
.title {
  margin-top: 15px;
}

p {
  margin-bottom: 10px;
}
</style>
