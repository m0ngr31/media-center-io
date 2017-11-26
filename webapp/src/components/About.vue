<template>
  <div class="column">
    <div class="field container">
      <h3 class="title">About</h3>
      <div class="control">
        Heyo
      </div>
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
  font-size: 25px;
  font-weight: 600;
  margin-top: 15px;
}
</style>
