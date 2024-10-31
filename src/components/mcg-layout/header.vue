<template>
  <header class="cg-header">
    <p class="cg-header__title" :data-version="pkgVersion + modeText">{{ $t('app.title') }}</p>
    <p class="cg-header__summary">
      <span class="header-tag">{{ $t("app.slogan", { count: processorCount }) }}</span>
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
    text-align: center;
    color: var(--mcg-text-color);

    &::after {
      content: "v" attr(data-version);
      position: absolute;
      top: 0;
      left: calc(100% + 5px);

      padding: 2px 4px;
      border-radius: 5px;
      background-color: var(--mcg-bg-color-2);
      color: var(--mcg-text-color);
      font-size: 12px;
      white-space: nowrap;
    }
  }

  &__summary {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 15px 0;

    .header-tag {
      font-size: 14px;
      padding: 6px 10px;
      background: var(--mcg-bg-color-2);
      border: 1px solid var(--mcg-border-color);
      color: var(--mcg-text-color-2);
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
      overflow: hidden;
      user-select: none;
      line-height: 18px;
    }
  }
}
</style>
