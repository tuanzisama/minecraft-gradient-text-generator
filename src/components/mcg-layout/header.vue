<template>
  <header class="cg-header">
    <p class="cg-header__title" :data-version="pkgVersion + modeText">Minecraft 渐变颜色生成器</p>
    <p class="cg-header__summary">
      <span>支持超 {{ processorCount }} 款格式 / 渐变缓存 / 预览结果</span>
      <a href="https://github.com/tuanzisama/minecraft-color-gradient-generator" target="_blank"
        rel="noopener noreferrer nofollow">
        <img alt="GitHub Repo stars"
          src="https://img.shields.io/github/stars/tuanzisama/minecraft-color-gradient-generator?style=flat-square&labelColor=%23f5f7fa&color=%23909399">
      </a>
      <a href="https://qm.qq.com/q/wxxCCGLoHg" target="_blank" title="点击链接加入群聊【Minecraft 渐变颜色生成器】"
        rel="noopener noreferrer nofollow">
        <img alt="GitHub Repo stars"
          src="https://img.shields.io/badge/QQ%E7%BE%A4%20994713939-0099FF?logo=tencent-qq&logoColor=white">
      </a>
    </p>
  </header>
</template>
<script lang="ts" setup>
import { adapterMap } from "@/plugins/processor";
import { computed } from "vue";

const processorCount = computed(() => {
  return adapterMap.size;
});

const pkgVersion = computed(() => {
  return import.meta.env.PACKAGE_VERSION;
});

const modeText = computed(() => {
  return import.meta.env.DEV ? "-SNAPSHOT" : "";
});
</script>

<style lang="scss" scoped>
.cg-header {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__title {
    position: relative;
    font-size: 40px;
    font-weight: 700;

    &::after {
      content: "v" attr(data-version);
      position: absolute;
      top: 0;
      left: calc(100% + 5px);

      padding: 2px 4px;
      border-radius: 5px;
      background-color: #f0f2f5;
      font-size: 12px;
      white-space: nowrap;
    }
  }

  &__summary {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 15px 0;

    span {
      font-size: 14px;
      padding: 5px 10px;
      background: #f5f7fa;
      border: 1px solid #dcdfe6;
      color: #909399;
      border-radius: 5px;
    }
  }
}
</style>
