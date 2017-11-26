<template>
  <div class="column">
    <div class="field container">
      <h3 class="title">Example Commands</h3>
      <div class="control">
        Eyy
      </div>
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
  font-size: 25px;
  font-weight: 600;
  margin-top: 15px;
}
</style>
