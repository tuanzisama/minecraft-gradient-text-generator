<template>
  <div class="preview-box-wrapper" ref="previewBoxRef">
    <div class="preview-box">
      <div class="content">
        <p v-for="(chapter, chapterIndex) in chunker" :key="chapterIndex">

          <template v-for="(item, index) in chapter.tags" :key="index">
            <span v-if="item.char.trim() === ''" class="is-space">&nbsp;</span>
            <span v-else :style="{
              '--text-color': item.color as string,
              '--text-shadow-color': getTextShadowHex(item.color as HexColorString),
            }" :class="{
              'is-bold': chapter.format?.bold,
              'is-italic': chapter.format?.italic,
              'is-underlined': chapter.format?.underlined,
              'is-strikethrough': chapter.format?.strikethrough,
            }">
              {{ item.char }}
            </span>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GradientProcessor } from '@/plugins/processor/processor-core';
import { computed } from 'vue';
import { getTextShadowHex } from "@/utils/color";

const props = withDefaults(defineProps<PreviewBoxProps>(), {
});

const chunker = computed(() => {
  return props.adapter?.chunker() ?? []
})
</script>

<script lang="ts">
export interface PreviewBoxProps {
  adapter: GradientProcessor;
}
</script>

<style lang="scss" scoped>
.preview-box-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
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

  padding: 20px;
  font-family: "Minecraft";
  transition: 0.3s;

  background-image: url(@/assets/images/minecraft-screenshot.png);
  background-position: center bottom;
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
    color: var(--text-color);
    text-shadow: 0.125em 0.125em var(--text-shadow-color);

    &.is-underlined:after,
    &.is-strikethrough:after {
      box-shadow: 0.125em 0.125em var(--text-shadow-color);
    }

    &.is-space {
      font-family: "Arial" !important;
    }

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
</style>