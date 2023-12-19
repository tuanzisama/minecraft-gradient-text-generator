<template>
  <div class="preview-box-wrapper">
    <Transition>
      <div class="preview-box plain-mode" v-if="props.mode === 'default'" v-html="props.modelValue"></div>
      <div class="preview-box chat-mode" v-else-if="props.mode === 'chat'">
        <div class="content" v-html="props.modelValue"></div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { AppStoreState } from "@/plugins/store/modules/app";

const props = withDefaults(defineProps<PreviewBoxProps>(), {
  modelValue: "",
  mode: "default",
});
</script>

<script lang="ts">
export interface PreviewBoxProps {
  modelValue: string;
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
    font-size: 20px;
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
    line-height: 22px;
    white-space: pre;
    .content {
      background-color: rgba(1, 1, 1, 0.4);
      padding: 8px;
      min-height: 38px;
    }
    &:deep(span) {
      text-shadow: 3px 3px var(--text-shadow-hsl);
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
