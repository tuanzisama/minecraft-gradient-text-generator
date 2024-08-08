<template>
  <div class="cg-container">
    <mcg-header />
    <mcg-body>
      <template #input>
        <text-input class="text-input-box" v-model="appStore.processTags" @on-change="onTextInputChangeHandler" />
      </template>
      <template #colorplate>
        <div>
          <color-picker class="picker-box" @on-change="onColorPickerChangeHandler" />
        </div>
      </template>
      <template #output>
        <text-output ref="textOutputRef" />
      </template>
    </mcg-body>
    <mcg-footer />
  </div>
  <mcg-feedback />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import { useAppStore } from "./plugins/store/modules/app";
import { ColorPicker } from "./components/color-picker";
import { McgHeader, McgFooter, McgBody } from "./components/mcg-layout";
import { TextInput } from "./components/text-input";
import { TextOutput } from "./components/text-output";
import { McgFeedback } from './components/mcg-feedback'
import { TextOutputExpose } from "./components/text-output/text-output.vue";
import { NotificationInstance } from "tdesign-vue-next";
import { useI18n } from "vue-i18n";

const appStore = useAppStore();
const i18n = useI18n()
const textOutputRef = ref<TextOutputExpose>();

onMounted(() => {
  document.title = i18n.t("app.title")
})

const onContactAuthorClickHandler = (notify: NotificationInstance) => {
  window.open('https://github.com/tuanzisama/minecraft-gradient-text-generator', "_blank")
}

const onTextInputChangeHandler = (val: RichTagChunk) => {
  textOutputRef.value?.generate(val);
};

const onColorPickerChangeHandler = (colors: HexColorString[]) => {
  textOutputRef.value?.generate(null, colors);
};
</script>

<style lang="scss" scoped>
.cg-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .cg-header {
    width: 100%;
    height: 160px;
    flex-shrink: 0;
  }

  .cg-body {
    flex: 1;
    height: 0;
    min-height: 800px;
  }

  .cg-footer {
    width: 100%;
    flex-shrink: 0;
    padding: 20px 0 !important;
  }
}
</style>
