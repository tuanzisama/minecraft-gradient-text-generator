<template>
  <div class="text-output-wrapper">
    <t-card title="生成" header-bordered>
      <template #actions>
        <t-space align="center">
          <t-radio-group
            v-if="['vanilla', 'vanilla-compatible'].includes(appStore.setting.processor)"
            v-model="appStore.setting.vanillaCharCode"
            @change="() => generateOutput()"
          >
            <t-radio value="&">&</t-radio>
            <t-radio value="§">§</t-radio>
          </t-radio-group>
          <t-select
            v-model="appStore.setting.processor"
            placeholder="请选择生成器"
            @change="onProcessorSelectChangeHandler"
            filterable
            :popup-props="{ overlayClassName: 'tdesign-processor-select__overlay-option' }"
          >
            <t-option v-for="[key, value] in processorMap" :key="key" :value="key" :label="value.label">
              <span class="label">{{ value.label }}</span>
              <span class="sample">{{ value.sample }}</span>
            </t-option>
            <template #panel-bottom-content>
              <div class="panel-bottom">
                <span>希望支持其它插件/格式？</span>
                <t-link theme="primary" href="https://github.com/tuanzisama/minecraft-color-gradient-generator/issues/new/choose" target="_blank">
                  告诉我！
                </t-link>
              </div>
            </template>
          </t-select>
          <span style="cursor: pointer" @click="onCopyClickHandler">复制</span>
        </t-space>
      </template>
      <div class="text-output text-output--preview" v-html="processResult.preview"></div>
      <t-divider />
      <div class="text-output text-output--raw" v-html="processResult.rawHTML" contenteditable></div>
    </t-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, shallowRef } from "vue";
import { useAppStore } from "../../plugins/store/modules/app";
import { useColorStore } from "../../plugins/store/modules/color";
import { MessagePlugin } from "tdesign-vue-next";
import { KeyOfProcessorMap, processorMap } from "../../plugins/processor";
import { GradientProcessor, GradientProcessorConstructor } from "@/plugins/processor/processor-core";

const appStore = useAppStore();
const colorStore = useColorStore();

const processorConstructor = ref<GradientProcessorConstructor>();
const processor = shallowRef<GradientProcessor>();

const processResult = reactive({
  preview: "",
  rawText: "",
  rawHTML: "",
});

onMounted(() => {
  processorConstructor.value = processorMap.get(appStore.setting.processor)?.processor;
});

const onCopyClickHandler = () => {
  if (appStore.processText.length === 0) {
    MessagePlugin.warning({ content: "请先输入文本", placement: "bottom" });
    return;
  }
  navigator.clipboard
    .writeText(processResult.rawText)
    .then(() => MessagePlugin.success({ content: "复制成功 (ノ￣▽￣)", placement: "bottom" }))
    .catch((err) => {
      MessagePlugin.error({ content: "复制失败，请尝试更新您的浏览器", placement: "bottom" });
      console.error(err);
    });
};

const onProcessorSelectChangeHandler = (val: KeyOfProcessorMap) => {
  processorConstructor.value = processorMap.get(val)?.processor;
  generateOutput();
};

const generateOutput = (text?: string, colors?: HexColorString[]) => {
  if (processorConstructor.value) {
    processor.value = new processorConstructor.value(text ?? appStore.processText, colors ?? colorStore.selectColorList, {
      vanilla: { charCode: appStore.setting.vanillaCharCode },
      clearWhiteSpace: appStore.setting.clearWhiteSpace,
    });
    processResult.preview = processor.value.getResultByHTML();
    processResult.rawText = processor.value.getResultByText();
    processResult.rawHTML = processor.value.getRawResultByHTML();
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
}

.text-output {
  width: 100%;
  height: 150px;
  font-size: 20px;
  line-height: 25px;
  word-break: break-all;

  outline: none;
  border: none;

  text-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
  @include custom-scrollbar();

  &--preview {
    height: 80px;
  }
  &--raw {
    font-size: 14px;
    line-height: 20px;
    &:deep(.color-tag) {
      color: var(--color-hex);
    }
  }
}
</style>

<style lang="scss">
.tdesign-processor-select__overlay-option {
  .t-popup__content {
    max-height: 450px !important;
  }
  .t-select-option {
    height: 100%;
    padding: 4px 8px;
    margin-bottom: 4px;
    & > span {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span.label {
        font-weight: 700;
        font-size: 15px;
        margin-bottom: 2px;
      }
      span.sample {
        opacity: 0.6;
        font-size: 12px;
      }
    }
  }
  .panel-bottom {
    text-align: center;
    padding: 10px 0;
    border-top: 1px solid #e4e7ed;
    font-size: 13px;
    font-weight: 400;
  }
}
</style>
