<template>
  <div class="column">
    <div class="field container">
      <h3 class="title">Skill Configuration</h3>
      <div class="control">
        <textarea class="textarea max-height ta-margin" type="text" v-model="config"></textarea>
        <button class="button is-primary is-medium is-pulled-right" @click="saveConfig" style="margin-bottom: 20px; text-align: right;">Save Config</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import {Requests} from '@/services/requests';

@Component({
  name: 'edit-config',
})
export default class EditConfig extends Vue {
  config: String;

  public metaInfo(): any {
    return {
      title: 'Edit Config'
    }
  }

  mounted() {
    Requests.get('/user/config').then((res: any) => {
      this.config = res.data.config;
    });
  }

  data() {
    return {
      config: '',
      preventSave: false
    };
  }

  saveConfig() {
    Requests.post('/user/config/save', { config: this.config }).then((res: any) => {
      console.log('Saved successfully');
    });
  }
}
</script>

<style scoped>
.max-height {
  height: 100vh;
}

.title {
  font-size: 25px;
  font-weight: 600;
  margin-top: 15px;
}

.ta-margin {
  margin-top: 25px;
  margin-bottom: 10px;
}
</style>
