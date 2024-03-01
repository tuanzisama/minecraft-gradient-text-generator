<template>
  <mcg-card body-class="text-params-body">
    <label class="processor-select-wrapper">
      <span class="processor-label">生成器:</span>
      <t-select
        class="processor-select"
        v-model="appStore.setting.usingProcessor"
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
    </label>
    <div class="tool-bar-wrapper">
      <tool-bar
        ref="toolBarRef"
        :processor-key="appStore.setting.usingProcessor"
        :result-raw-text="textStore.text"
        @on-format-change="onFormatChangeHandler"
      />
    </div>
  </mcg-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useAppStore } from "../../plugins/store/modules/app";
import { useTextStore } from "../../plugins/store/modules/text";
import { KeyOfProcessorMap, processorMap } from "../../plugins/processor";
import { ToolBarExpose, ToolBarModule } from "./tool-bar.vue";
import { McgCard } from "../mcg-card";
import { useEventBus } from "../../plugins/eventbus";

const appStore = useAppStore();
const textStore = useTextStore();
const eventBus = useEventBus();

const toolBarRef = ref<ToolBarExpose>();

onMounted(() => {
  switchToolbar(appStore.setting.usingProcessor);
});

const onProcessorSelectChangeHandler = (val: KeyOfProcessorMap) => {
  switchToolbar(val);
  eventBus.emit("generate:invoke", {});
};

const switchToolbar = (val: KeyOfProcessorMap) => {
  toolBarRef.value?.toggleDisplay(ToolBarModule.VANILLA_CHAR_CODE, ["vanilla", "vanilla-compatible"].includes(val));
  toolBarRef.value?.toggleDisplay(ToolBarModule.DOWNLOAD, val === "csv");
};

const onFormatChangeHandler = () => {
  eventBus.emit("generate:invoke", {});
};
</script>

<style lang="scss" scoped>
.processor-select {
  width: auto;
  &:deep(.t-input__wrap.t-input--auto-width) {
    min-width: 250px;
  }
}

.text-output-action {
  display: flex;
  justify-content: center;
}

.tool-bar-wrapper {
  display: flex;
  justify-content: center;
  margin-left: auto;
}

.processor-select-wrapper {
  @include flex-center;
  .processor-label {
    margin-right: 10px;
  }
}
</style>

<style lang="scss">
.text-params-body {
  display: flex !important;
  user-select: none;
}

.tdesign-processor-select__overlay-option {
  user-select: none;
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
