<template>
  <div class="column">
    <div class="field container">
      <h3 class="title">Skill Configuration</h3>
      <div class="control">
        <textarea class="textarea max-height ta-margin" type="text" v-model="config"></textarea>
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
  preventSave: Boolean;
  $toast: any;

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
      preventSave: false,
      isLoading: false
    };
  }

  async saveConfig() {
    if (this.preventSave) {
      return;
    }

    this.isLoading = true;

    try {
      await Requests.post('/user/config/save', { config: this.config });

      this.$toast.open({
        // duration: 2000,
        message: `Configuration saved successfully`,
        // position: 'is-top',
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
  font-size: 25px;
  font-weight: 600;
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
