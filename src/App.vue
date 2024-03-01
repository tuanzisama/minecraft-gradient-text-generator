<template>
  <div class="cg-container">
    <mcg-header />
    <mcg-body>
      <template #input>
        <text-input class="text-input-box" v-model="appStore.processText" @on-change="onTextInputChangeHandler" />
        <text-params />
        <color-picker class="picker-box" @on-change="onColorPickerChangeHandler" />
      </template>
      <template #output>
        <text-output ref="textOutputRef" />
      </template>
    </mcg-body>
    <mcg-footer />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "./plugins/store/modules/app";

import { ColorPicker } from "./components/color-picker";
import { McgHeader, McgFooter, McgBody } from "./components/mcg-layout";
import { TextParams } from "./components/text-params";
import { TextInput } from "./components/text-input";
import { TextOutput } from "./components/text-output";
import { ref } from "vue";
import { TextOutputExpose } from "./components/text-output/main.vue";

const appStore = useAppStore();
const textOutputRef = ref<TextOutputExpose>();

const onTextInputChangeHandler = (val: string) => {
  textOutputRef.value?.generate(val);
};

const onColorPickerChangeHandler = (colors: HexColorString[]) => {
  textOutputRef.value?.generate(undefined, colors);
};
</script>

<style lang="scss" scoped>
.cg-container {

  
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .cg-header {
    width: 100%;
    height: 160px;
    flex-shrink: 0;
  }
  .cg-body {
    width: 95%;
    height: 0;
    flex: 1;

    min-height: 800px;
    margin: 0 auto;
    max-height: 80vh;
  }
  .cg-footer {
    width: 100%;
    flex-shrink: 0;
    padding: 20px 0 !important;
  }
}
.picker-box {
  flex: 1;
  height: 0;
  min-height: 470px;
}
</style>
