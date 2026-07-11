<template>
  <mcg-card class="text-output-wrapper">
    <template #header>
      <text-params :usage-time="usageTime" />
    </template>
    <div class="preview-content">
      <div v-if="appStore.setting.simulateMode === 'default'" v-html="htmlResult"></div>
      <preview v-if="appStore.setting.simulateMode === 'chat'" />
    </div>
    <div class="output-content">
      <pre><code>{{ mcResult }}</code></pre>
    </div>
  </mcg-card>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useAppStore } from "../../plugins/store/modules/app";
import { useTextStore } from "../../plugins/store/modules/text";
import { useColorStore } from "../../plugins/store/modules/color";
import { adapterMap } from "../../plugins/processor";
import { useEventBus } from "../../plugins/eventbus";
import TextParams from "../text-params/text-params.vue";
import { flatten, isEmpty } from "lodash-es";
import { McgCard } from "../mcg-card";
import { Preview } from "../preview-pip";

const appStore = useAppStore();
const textStore = useTextStore();
const colorStore = useColorStore();
const eventBus = useEventBus();

const mcResult = ref('')
const htmlResult = ref('')

const usageTime = ref<number>(0)

const onGenerateInvoke = ({ tags, colors }: { tags: RichTagChunk | null; colors?: HexColorString[] }) => {
  generateOutput(tags, colors);
};

onMounted(() => {
  eventBus.on("generate:invoke", onGenerateInvoke);
});

onUnmounted(() => {
  eventBus.off("generate:invoke", onGenerateInvoke);
});

const generateOutput = (tags: RichTagChunk | null, colors?: HexColorString[]) => {
  const $tags = tags ?? appStore.processTags;
  const $colors = (colors ?? colorStore.selectColorList) as HexColorString[];

  if (!$tags?.length || !$tags.some((chunk) => chunk.length > 0) || isEmpty($colors)) {
    return;
  }

  const startTime = performance.now();

  const adapterConstructor = adapterMap.get(appStore.setting.usingAdapterKey)?.adapter;

  if (adapterConstructor) {
    textStore.adapter = new adapterConstructor($tags, $colors, {
      vanilla: { charCode: appStore.setting.format.vanillaCharCode },
      processSimplify: appStore.setting.format.processSimplify,
    });

    // console.info('[adapter]', textStore.adapter);

    mcResult.value = textStore.adapter.generateAsString()
    htmlResult.value = textStore.adapter.generateAsHTML()

    const endTime = performance.now()

    usageTime.value = (endTime - startTime)

    eventBus.emit("generate:change", null);
  }
};

defineExpose<TextOutputExpose>({ generate: generateOutput });
</script>

<script lang="ts">
export interface TextOutputExpose {
  generate: (text: RichTagChunk | null, colors?: HexColorString[]) => void;
}
</script>

<style lang="scss" scoped>
.text-output-wrapper {
  width: 100%;
  height: 100%;

  &:deep(.mcg-card__body) {
    height: calc(100% - 65px);
    display: flex;
    flex-direction: column;
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

.preview-content,
.output-content {
  overflow-y: auto;
  @include custom-scrollbar;
  line-height: 1.2em;
}

.preview-content {
  width: 100%;
  height: 60%;
  flex-shrink: 0;
  outline: none;
  border: none;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 22px;

  &:deep(span) {
    color: var(--text-color);
    @include preview-text-format;
  }
}

.output-content {
  flex: 1;
  height: 0;
  overflow-y: auto;
  font-size: 14px;
  line-height: 18px;

  pre,
  code {
    word-break: break-all;
    white-space: pre-wrap;
  }

}
</style>
