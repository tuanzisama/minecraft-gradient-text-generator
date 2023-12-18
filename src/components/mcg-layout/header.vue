<template>
  <header class="cg-header">
    <p class="cg-header__title" :data-version="pkgVersion + modeText">Minecraft 渐变颜色生成器</p>
  </header>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const pkgVersion = computed(() => {
  return import.meta.env.PACKAGE_VERSION;
});

const modeText = computed(() => {
  return import.meta.env.DEV ? "-SNAPSHOT" : "";
});
</script>

<style lang="scss" scoped>
.cg-header {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  &__title {
    position: relative;
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
}
</style>
