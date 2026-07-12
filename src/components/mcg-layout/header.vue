<template>
  <header class="cg-header">
    <div class="cg-header__brand">
      <p class="cg-header__title">{{ $t('app.title') }}</p>
      <span class="cg-header__version">v{{ pkgVersion }}{{ modeText }}</span>
    </div>
    <div class="cg-header__right">
      <span class="cg-header__slogan">{{ $t("app.slogan", { count: processorCount }) }}</span>
      <button class="cg-header__theme-btn" @click="toggleTheme" :title="isDark ? 'dark' : 'light'">
        <i-material-symbols-dark-mode v-if="isDark" />
        <i-material-symbols-light-mode v-else />
      </button>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { adapterMap } from "@/plugins/processor";
import { computed } from "vue";
import { useTheme } from "@/composables/use-theme";

const { isDark, toggleTheme } = useTheme();

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
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 0 var(--layout-padding-x);

  &__brand {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  &__title {
    font-size: 22px;
    font-weight: 700;
  }

  &__version {
    font-size: 12px;
    color: var(--td-text-color-placeholder);
    background: var(--td-bg-color-container);
    padding: 2px 6px;
    border-radius: 4px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__slogan {
    font-size: 13px;
    color: var(--td-text-color-placeholder);
    user-select: none;
  }

  &__theme-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--td-text-color-primary);
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background: var(--td-bg-color-container-hover);
    }

    :deep(svg) {
      font-size: 22px;
    }
  }
}
</style>
