<template>
  <div class="cg-container">
    <mcg-header />
    <t-space direction="vertical" style="width: 100%">
      <div class="text-input-box">
        <text-input v-model="appStore.processText" />
      </div>
      <div class="picker-box">
        <color-picker>
          <template #list-setting>
            <t-button theme="default" @click="visibleSetting = true">设置</t-button>
          </template>
        </color-picker>
      </div>
      <div class="text-output-box">
        <text-output v-model="appStore.processText" />
      </div>
    </t-space>
    <mcg-footer />
    <mcg-setting v-model="visibleSetting" />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "./plugins/store/modules/app";

import { ColorPicker } from "./components/color-picker";
import { McgHeader, McgFooter } from "./components/mcg-layout";
import { TextInput } from "./components/text-input";
import { TextOutput } from "./components/text-output";
import { McgSetting } from "./components/mcg-setting";
import { ref } from "vue";

const appStore = useAppStore();

const visibleSetting = ref(false);
</script>

<style lang="scss" scoped>
.cg-container {
  width: 96%;
  margin: 0 auto;
  width: 1200px;
}
</style>
