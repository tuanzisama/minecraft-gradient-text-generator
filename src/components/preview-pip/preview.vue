<template>
  <div class="preview-box-wrapper" ref="previewBoxRef">
    <div class="preview-box">
      <div class="content">
        <p v-for="(chapter, chapterIndex) in chapters" :key="chapterIndex">
          <template v-for="(words, wordsIndex) in chapter" :key="wordsIndex">
            <template v-for="(word, wordIndex) in words.tags" :key="wordIndex">
              <span :style="{
                '--text-color': word.color as string,
                '--text-shadow-color': getTextShadowHex(word.color as HexColorString),
              }" :class="{
                'is-bold': words.format?.bold,
                'is-italic': words.format?.italic,
                'is-underlined': words.format?.underlined,
                'is-strikethrough': words.format?.strikethrough,
                'is-space': word.character.trim() === '',
              }">
                {{ word.character.trim() === '' ? '&nbsp;' : word.character }}
              </span>
            </template>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { getTextShadowHex } from "@/utils/color";
import { useTextStore } from "../../plugins/store/modules/text";

const textStore = useTextStore()

const chapters = computed(() => {
  return textStore.adapter?.chapters ?? []
})
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