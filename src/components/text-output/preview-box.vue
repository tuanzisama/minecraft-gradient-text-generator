<template>
  <div class="preview-box-wrapper">
    <div class="preview-box" :class="props.mode === 'default' ? 'plain-mode' : 'chat-mode'">
      <div class="content">
        <span
          v-for="(item, index) in props.modelValue"
          :key="index"
          :style="{
            '--text-color': item.color,
            '--text-shadow-color': item.shadow,
          }"
          :class="{
            'is-bold': item.format?.bold,
            'is-italic': item.format?.italic,
            'is-underlined': item.format?.underlined,
            'is-strikethrough': item.format?.strikethrough,
          }"
        >
          {{ item.char }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ProcessorResultItem } from "@/plugins/processor/processor-core";
import { AppStoreState } from "@/plugins/store/modules/app";

const props = withDefaults(defineProps<PreviewBoxProps>(), {
  mode: "default",
});
</script>

<script lang="ts">
export interface PreviewBoxProps {
  modelValue: ProcessorResultItem[];
  mode: AppStoreState["setting"]["simulateMode"];
}
</script>

<style lang="scss" scoped>
.preview-box-wrapper {
  height: 240px;
  position: relative;
}
.preview-box {
  overflow-x: hidden;
  overflow-y: auto;
  @include custom-scrollbar();
  word-break: break-all;
  text-wrap: wrap;
  width: 100%;
  height: 100%;
  position: absolute;

  &.plain-mode {
    font-size: 18px;
    line-height: 24px;
  }
  &.chat-mode {
    padding: 20px;
    font-family: "Minecraft";
    transition: 0.3s;

    background-image: url(@/assets/images/minecraft-screenshot.png);
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    font-size: 18px;
    line-height: 24px;
    word-wrap: break-word;
    .content {
      background-color: rgba(1, 1, 1, 0.4);
      padding: 8px;
      min-height: 38px;
    }
    &:deep(span) {
      text-shadow: 0.125em 0.125em var(--text-shadow-color);
      &.is-underlined:after,
      &.is-strikethrough:after {
        box-shadow: 0.125em 0.125em var(--text-shadow-color);
      }
    }
  }

  &.chat-mode,
  &.plain-mode {
    &:deep(span) {
      color: var(--text-color);
      &.is-bold {
        font-weight: bold;
      }
      &.is-italic {
        font-style: italic;
      }
      &.is-underlined {
        display: inline-block;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          bottom: calc(0px - 2px);
          left: 0;
          display: inline-block;
          width: 100%;
          height: 2px;
          background: var(--text-color);
        }
      }
      &.is-strikethrough {
        display: inline-block;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: calc(50% - 2px);
          left: 0;
          display: inline-block;
          width: 100%;
          height: 2px;
          background: var(--text-color);
        }
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
