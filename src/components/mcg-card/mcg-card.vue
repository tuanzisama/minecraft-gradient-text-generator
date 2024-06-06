<template>
  <div class="mcg-box">
    <div class="mcg-box__body" :class="props.bodyClass">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<McgCardProps>(), {});
</script>

<script lang="ts">
export interface McgCardProps {
  bodyClass?: string;
}
</script>

<style lang="scss" scoped>
.mcg-box {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  border-radius: var(--td-radius-medium);
  background-color: var(--td-bg-color-container);
  color: var(--td-text-color-primary);
  transition: box-shadow 0.2s cubic-bezier(0.38, 0, 0.24, 1);
  border: 1px solid var(--td-component-border);
  &__body {
    display: flow-root;
    padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-xl);
  }
}
</style>
