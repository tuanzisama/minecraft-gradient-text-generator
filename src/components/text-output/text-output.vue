<template>
  <mcg-card class="text-output-wrapper">
    <preview-box class="text-output text-output--preview" v-model="textStore.preview" :mode="appStore.setting.simulateMode" />
    <t-divider />
    <div class="text-output text-output--raw" v-html="textStore.renderHTML"></div>
  </mcg-card>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useAppStore } from "../../plugins/store/modules/app";
import { useTextStore } from "../../plugins/store/modules/text";
import { useColorStore } from "../../plugins/store/modules/color";
import { processorMap } from "../../plugins/processor";
import { isEmpty } from "lodash-es";
import { McgCard } from "../mcg-card";
import { useEventBus } from "../../plugins/eventbus";

const appStore = useAppStore();
const textStore = useTextStore();
const colorStore = useColorStore();
const eventBus = useEventBus();

onMounted(() => {
  eventBus.on("generate:invoke", ({ text, colors }) => generateOutput(text, colors));
});

const generateOutput = (text?: string, colors?: HexColorString[]) => {
  const $text = text ?? appStore.processText;
  const $colors = colors ?? colorStore.selectColorList;

  if (isEmpty($text) || isEmpty($colors)) {
    return;
  }

  const processorConstructor = processorMap.get(appStore.setting.usingProcessor)?.processor;

  if (processorConstructor) {
    textStore.processor = new processorConstructor($text, $colors, {
      vanilla: { charCode: appStore.setting.format.vanillaCharCode },
      format: {
        bold: appStore.setting.format.bold,
        italic: appStore.setting.format.italic,
        underlined: appStore.setting.format.underlined,
        strikethrough: appStore.setting.format.strikethrough,
      },
      clearWhiteSpace: appStore.setting.clearWhiteSpace,
    });

    eventBus.emit("generate:change", null);
  }
};

defineExpose<TextOutputExpose>({ generate: generateOutput });
</script>

<script lang="ts">
export interface TextOutputExpose {
  generate: (text?: string, colors?: HexColorString[]) => void;
}
</script>

<style lang="scss" scoped>
.text-output-wrapper {
  width: 100%;
  height: 100%;
  &:deep(.mcg-box__body) {
    height: calc(100% - 65px);
  }
}

.output-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .text-output {
    flex: 1;
  }
}

.text-output {
  width: 100%;
  outline: none;
  border: none;
  height: 50%;

  &--preview {
  }
  &--raw {
    font-size: 14px;
    line-height: 20px;
    word-break: break-all;
    text-wrap: wrap;

    overflow-x: hidden;
    overflow-y: auto;
    @include custom-scrollbar();
    &:deep(.color-tag) {
      color: var(--color-hex);
    }
  }
}
</style>
