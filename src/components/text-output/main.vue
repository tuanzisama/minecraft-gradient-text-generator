<template>
  <div class="text-output-wrapper">
    <t-card title="生成" header-bordered>
      <template #actions>
        <div class="text-output-action">
          <div class="tool-bar-wrapper">
            <tool-bar
              ref="toolBarRef"
              :processor="processor"
              :processor-key="appStore.setting.processor"
              :result-raw-text="processResult.text"
              @on-format-change="onFormatChangeHandler"
            />
          </div>
          <t-select
            class="processor-select"
            v-model="appStore.setting.processor"
            placeholder="请选择生成器"
            @change="onProcessorSelectChangeHandler"
            filterable
            auto-width
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
        </div>
      </template>
      <preview-box class="text-output text-output--preview" v-model="processResult.preview" :mode="appStore.setting.simulateMode" />
      <t-divider />
      <div class="text-output text-output--raw" v-html="processResult.renderHTML"></div>
    </t-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, shallowRef } from "vue";
import { useAppStore } from "../../plugins/store/modules/app";
import { useColorStore } from "../../plugins/store/modules/color";
import { KeyOfProcessorMap, processorMap } from "../../plugins/processor";
import { GradientProcessor, GradientProcessorConstructor, ProcessorResultItem } from "@/plugins/processor/processor-core";
import { isEmpty } from "lodash-es";
import { ToolBarExpose, ToolBarModule } from "./tool-bar.vue";

const appStore = useAppStore();
const colorStore = useColorStore();

const toolBarRef = ref<ToolBarExpose>();
const processorConstructor = ref<GradientProcessorConstructor>();
const processor = shallowRef<GradientProcessor>();

const processResult = reactive<{
  /**
   * 预览体结构
   */
  preview: ProcessorResultItem[];
  /**
   * 主要复制用
   */
  text: string;
  /**
   * 适用于渲染页面
   */
  renderHTML: string;
}>({
  preview: [],
  text: "",
  renderHTML: "",
});

onMounted(() => {
  processorConstructor.value = processorMap.get(appStore.setting.processor)?.processor;
  switchToolbar(appStore.setting.processor);
});

const onProcessorSelectChangeHandler = (val: KeyOfProcessorMap) => {
  processorConstructor.value = processorMap.get(val)?.processor;
  switchToolbar(val);
  generateOutput();
};

const switchToolbar = (val: KeyOfProcessorMap) => {
  toolBarRef.value?.toggleDisplay(ToolBarModule.VANILLA_CHAR_CODE, ["vanilla", "vanilla-compatible"].includes(val));
  toolBarRef.value?.toggleDisplay(ToolBarModule.DOWNLOAD, val === "csv");
};

const generateOutput = (text?: string, colors?: HexColorString[]) => {
  const $text = text ?? appStore.processText;
  const $colors = colors ?? colorStore.selectColorList;

  if (isEmpty($text) || isEmpty($colors)) {
    processResult.preview = [];
    processResult.text = "";
    processResult.renderHTML = "";
    return;
  }

  if (processorConstructor.value) {
    processor.value = new processorConstructor.value($text, $colors, {
      vanilla: { charCode: appStore.setting.format.vanillaCharCode },
      format: {
        bold: appStore.setting.format.bold,
        italic: appStore.setting.format.italic,
        underlined: appStore.setting.format.underlined,
        strikethrough: appStore.setting.format.strikethrough,
      },
      clearWhiteSpace: appStore.setting.clearWhiteSpace,
    });

    processResult.preview = processor.value.getResult();
    processResult.text = processor.value.getResultText();
    processResult.renderHTML = processor.value.getRenderHTML();
  }
};

const onFormatChangeHandler = () => {
  generateOutput();
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

.processor-select {
  width: auto !important;
  &:deep(.t-input__wrap.t-input--auto-width) {
    min-width: 250px;
  }
}

.text-output {
  width: 100%;
  outline: none;
  border: none;

  &--raw {
    height: 150px;
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

.text-output-action {
  display: flex;
  justify-content: center;
}

.tool-bar-wrapper {
  display: flex;
  justify-content: center;
  margin-right: 20px;
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
