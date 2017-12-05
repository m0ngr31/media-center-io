<template>
  <div class="column">
    <div class="field container">
      <h3 class="title">Skill Configuration</h3>
      <div class="control">
        <textarea class="textarea max-height ta-margin" type="text" v-model="config" :disabled="isLoading"></textarea>
        <button class="button is-primary is-medium is-pulled-right submit-btn" v-bind:class="{'is-loading btn-loading': isLoading}" @click="saveConfig" :disabled="isLoading">{{isLoading ? '': 'Save Config'}}</button>
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
  isLoading: Boolean;
  $toast: any;

  public metaInfo(): any {
    return {
      title: 'Edit Config'
    }
  }

  async mounted() {
    this.isLoading = true;

    try {
      const res = await Requests.get('/user/config');
      this.config = res.data.config
    } catch (e) {
      this.$toast.open({
        duration: 5000,
        message: `There was an error loading your config. Do you have access to the internet?`,
        position: 'is-top',
        type: 'is-danger'
      });
    }

    this.isLoading = false;
  }

  data() {
    return {
      config: '',
      isLoading: false
    };
  }

  async saveConfig() {
    this.isLoading = true;

    try {
      await Requests.post('/user/config/save', { config: this.config });

      this.$toast.open({
        message: `Configuration saved successfully`,
        type: 'is-success'
      });
    } catch (e) {
      this.$toast.open({
        duration: 5000,
        message: `There was an error with your config. Please double check you have valid entries.`,
        position: 'is-top',
        type: 'is-danger'
      });
    }

    this.isLoading = false;
  }
}
</script>

<style scoped>
.max-height {
  height: 100vh;
}

.title {
  margin-top: 15px;
}

.ta-margin {
  margin-top: 25px;
  margin-bottom: 10px;
}

.submit-btn {
  margin-bottom: 20px;
  text-align: right;
}

.btn-loading {
  width: 147px;
}
</style>
