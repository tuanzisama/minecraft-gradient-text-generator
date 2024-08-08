<template>
  <div class="text-params">
    <label class="processor-select-wrapper">
      <t-select class="processor-select" v-model="appStore.setting.usingAdapterKey"
        :placeholder="$t('processor.placeholder')"
        :popup-props="{ overlayClassName: 'tdesign-processor-select__overlay-option' }"
        @change="onProcessorSelectChangeHandler" filterable auto-width>
        <t-option v-for="[key, value] in adapterMap" :key="key" :value="key" :label="$t(value.label)">
          <p class="label-wrapper">
            <span class="label">{{ $t(value.label) }}</span>
            <t-tooltip v-if="value.hint" :content="$t(value.hint)" placement="top-start"
              :overlay-style="{ width: '200px' }" show-arrow>
              <span class="hint" title="">❓</span>
            </t-tooltip>
          </p>
          <span class="sample">{{ value.sample }}</span>
        </t-option>
        <template #panel-bottom-content>
          <div class="panel-bottom">
            <span>{{ $t("common.support_request") }}</span>
            <t-link theme="primary"
              href="https://github.com/tuanzisama/minecraft-gradient-text-generator/issues/new/choose" target="_blank">
              {{ $t("common.contact_developer") }}
            </t-link>
          </div>
        </template>
      </t-select>
    </label>
    <t-tooltip :content="$t('processor.usage_accurate_time', { time: props.usageTime })" placement="top-left" show-arrow
      theme="light">
      <span class="usage-time">{{ props.usageTime.toFixed(2) }}ms</span>
    </t-tooltip>
    <div class="tool-bar-wrapper">
      <tool-bar ref="toolBarRef" @on-format-change="onFormatChangeHandler" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useAppStore } from "../../plugins/store/modules/app";
import { KeyOfAdapterMap, adapterMap } from "../../plugins/processor";
import ToolBar, { ToolBarExpose, ToolBarModule } from "./tool-bar.vue";
import { useEventBus } from "../../plugins/eventbus";

const appStore = useAppStore();
const eventBus = useEventBus();

const props = withDefaults(defineProps<TextParamsProps>(), {
});

const toolBarRef = ref<ToolBarExpose>();

onMounted(() => {
  switchToolbar(appStore.setting.usingAdapterKey);
});

const switchToolbar = (val: KeyOfAdapterMap) => {
  toolBarRef.value?.toggleDisplay(ToolBarModule.VANILLA_CHAR_CODE, ["vanilla", "vanilla-compatible"].includes(val));
};

const onProcessorSelectChangeHandler = (val: KeyOfAdapterMap) => {
  switchToolbar(val);
  eventBus.emit("generate:invoke", { tags: null });
};

const onFormatChangeHandler = () => {
  eventBus.emit("generate:invoke", { tags: null });
};
</script>


<script lang="ts">
export interface TextParamsProps {
  usageTime: number;
}
</script>

<style lang="scss" scoped>
.text-params {
  align-items: center;
}

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

.usage-time {
  margin-left: 10px;
  color: #a6a6a6;
  font-size: 14px;
}
</style>

<style lang="scss">
.text-params {
  display: flex;
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

    &>span {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .label-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 2px;

        .label {
          font-weight: 700;
          font-size: 15px;
        }

        .hint {
          font-size: 12px;
          margin-left: 5px;
          padding: 2px 5px;
          border-radius: 50%;

          &:hover {
            background: var(--td-brand-color-2);
          }
        }
      }

      .sample {
        opacity: 0.6;
        font-size: 12px;
      }
    }
  }

  .panel-bottom {
    text-align: center;
    padding: 10px;
    border-top: 1px solid #e4e7ed;
    font-size: 13px;
    font-weight: 400;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
