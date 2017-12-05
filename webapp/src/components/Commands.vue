<template>
  <div class="column">
    <div class="field container">
      <h1 class="title">Example Commands</h1>
      <p>Most everything you can do with a remote or keyboard is supported in the skill, and more:</p>
      <ul>
        <li>Basic navigation (Up/Down, Left/Right, Page Up/Down, Select, Back, Menu, Zoom, Rotate, Move)</li>
        <li>Open library views (Movies, Shows, Music, Artists, Albums, Music Videos, Playlists)</li>
        <li>Open library views by genre (Movies, Shows, Music, Music Videos)</li>
        <li>Open recently added playlists (Movies, Episodes, Albums, Music Videos)</li>
        <li>Playback control (Play/Pause, Skip, Previous, Stop, Step/Jump)</li>
        <li>Adjust volume</li>
        <li>Shuffle all music by an artist</li>
        <li>Play/Shuffle specific album</li>
        <li>Play/Shuffle the latest album by an artist</li>
        <li>Play a specific song</li>
        <li>Play/Shuffle audio and video playlists</li>
        <li>&quot;Party mode&quot; for music (shuffle all)</li>
        <li>Play/Shuffle music videos</li>
        <li>Play/Shuffle music videos from a specific genre</li>
        <li>Play/Shuffle music videos by a specific artist</li>
        <li>Shuffle all episodes of a TV show</li>
        <li>Play random TV show</li>
        <li>Play random TV show from a specific genre</li>
        <li>Play random episode of a specific TV show</li>
        <li>Play specific episode of a TV show (&#39;Play season 4 episode 10 of The Office&#39;)</li>
        <li>Play random movie</li>
        <li>Play random movie from a specific genre</li>
        <li>Play specific movie</li>
        <li>Play trailer for a movie in your library (<strong>requires plugin.video.youtube addon</strong>)</li>
        <li>Play random music video</li>
        <li>Play random music video from a specific genre</li>
        <li>Continue watching next episode of last show that was watched</li>
        <li>Play next episode of a show</li>
        <li>Play newest episode of a show</li>
        <li>Recommend media to watch/listen to</li>
        <li>List/Play recently added media</li>
        <li>List available albums by an artist</li>
        <li>Clean/Update video and audio sources</li>
        <li>&quot;What&#39;s playing?&quot; functionality for music, movies, and shows</li>
        <li>Report time remaining on current media and when it will end</li>
        <li>Cycle through audio and subtitle streams</li>
        <li>Search for something in your library (<strong>requires script.globalsearch addon</strong>)</li>
        <li>Execute addons</li>
        <li>Shutdown/reboot/sleep/hibernate system</li>
        <li>Toggle fullscreen</li>
        <li>Eject media</li>
      </ul>
      <p>Instead of providing the exact verbiage here for each command, we strive to make the experience as natural as we can.  Simply try asking for what you want in a way that feels <em>right</em> to you.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'commands',
})
export default class Commands extends Vue {
  public metaInfo(): any {
    return {
      title: 'Commands'
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
