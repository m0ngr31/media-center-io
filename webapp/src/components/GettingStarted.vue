<template>
  <div class="column">
    <div class="field container">
      <h1 class="title">Getting Started</h1>
      <p>Before you can use this skill, you&#39;ll need to setup a few things on your end so the server can control your Kodi box(es).</p>
      <h4 class="subtitle is-4" id="kodi-setup">Kodi Setup</h4>
      <p>Before a command from Alexa can be sent to <a href="https://kodi.tv">Kodi</a>, you need to enable the following settings found under <em>Settings -&gt; System -&gt; Services -&gt; Web server</em> in <a href="https://kodi.tv">Kodi</a>:</p>
      <ul>
        <li>Allow remote control via HTTP</li>
        <li>Allow remote control from applications on this system</li>
        <li>Allow remote control from applications on other systems</li>
      </ul>
      <p>Note that wording might change depending on the version of <a href="https://kodi.tv">Kodi</a> you have installed.  This example is for <a href="https://kodi.tv">Kodi</a> 17:</p>
      <p><img src="http://i.imgur.com/YMqS8Qj.png" alt="Kodi settings"></p>
      <p>Next, supply a <em>Username</em> and <em>Password</em> that you don&#39;t use anywhere else.  You can share these credentials with all of your <a href="https://kodi.tv">Kodi</a> installations, but you should not use the same credentials you might use elsewhere on the web.</p>
      <p>Repeat this for every installation of <a href="https://kodi.tv">Kodi</a> you have that you wish to control via the skill.  All of this information -- including the port number -- can be the same for every installation of <a href="https://kodi.tv">Kodi</a> if you wish.  If you are unsure, set up every instance of <a href="https://kodi.tv">Kodi</a> the same way to avoid confusion.</p>
      <p>Unless you have a very specific reason to do so, there is no reason to change the port number from the default.  Your router will control access from the outside world.</p>
      <p><em>Make note of the port, username, and password you are using for later steps.</em></p>
      <p><em>If you have more than one instance of <a href="https://kodi.tv">Kodi</a> you would like to control with this skill, make note of the private IP address for each machine as well.  Private IP addresses are typically addresses like 192.168.1.9 or 192.168.0.23</em></p>
      <h4 class="subtitle is-4" id="obtaining-your-internet-address">Obtaining Your Internet Address</h4>
      <p>This skill is hosted in the &quot;cloud,&quot; unless you opt to host it yourself locally.  As such, it will need to know your internet address to contact <a href="https://kodi.tv">Kodi</a>.</p>
      <p>While you can use your <a href="http://www.whatsmyip.org/">public IP address</a>, with most residential internet providers this address can change over time, which would necessitate setting up the skill again.</p>
      <p>To avoid this, before you continue, we suggest you set up what&#39;s called a <em>Dynamic Domain Name</em> with a service provider such as <a href="http://www.dynu.com/">Dynu</a>.  HowToGeek.com provides a <a href="https://www.howtogeek.com/66438/how-to-easily-access-your-home-network-from-anywhere-with-ddns/">guide for setting this up</a>.</p>
      <p>Whether you choose to use your <a href="http://www.whatsmyip.org/">public IP address</a> or obtain a dynamic domain name, <em>make note of it before continuing</em>.</p>
      <h4 class="subtitle is-4" id="router-setup">Router Setup</h4>
      <p>It is required that you have the <a href="https://kodi.tv">Kodi</a> web server(s) opened up to the internet via port forwarding on your router.</p>
      <p>For each <a href="https://kodi.tv">Kodi</a> instance, you will need a port forwarding rule on your router.  For each <em>private</em> IP address (i.e., the local address of each machine on which <a href="https://kodi.tv">Kodi</a> is installed), you need to forward a unique <em>external</em> port to that <em>private</em> IP address on your router.</p>
      <p>If you followed our suggestion and set up all of your <a href="https://kodi.tv">Kodi</a> instances with the default port, you would forward them all like so:</p>
      <ul>
        <li>Kodi1: external port 8080, internal -&gt; 192.168.1.10:8080</li>
        <li>Kodi2: external port 8081, internal -&gt; 192.168.1.11:8080</li>
        <li>Kodi3: external port 8082, internal -&gt; 192.168.1.12:8080</li>
      </ul>
      <p>And so on for each instance of <a href="https://kodi.tv">Kodi</a> that you wish to control via the skill.  The key here is that the <em>external port number</em> needs to be unique for each instance.</p>
      <p>For more information on port forwarding, see this <a href="https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/" target="_blank">HowToGeek guide</a>.</p>
      <h4 class="subtitle is-4" id="router-setup">Configuration</h4>
      <p>Now just head over to the <router-link to="edit-config" tag="a">Edit Configuration</router-link> page and use the hints in there to configure the settings that you would like.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'getting-started',
})
export default class GettingStarted extends Vue {
  public metaInfo(): any {
    return {
      title: 'Getting Started'
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

.subtitle {
  margin-bottom: 10px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 10px;
}
</style>
