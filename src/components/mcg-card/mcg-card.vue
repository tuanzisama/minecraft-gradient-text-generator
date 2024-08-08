<template>
  <div class="mcg-card">
    <div class="mcg-card__header" :class="props.headerClass" v-if="slots.hasOwnProperty('header')">
      <slot name="header" />
    </div>
    <div class="mcg-card__body" :class="props.bodyClass">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

const props = withDefaults(defineProps<McgCardProps>(), {});

const slots = useSlots()
</script>

<script lang="ts">
export interface McgCardProps {
  headerClass?: string;
  bodyClass?: string;
}
</script>

<style lang="scss" scoped>
.mcg-card {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  border-radius: var(--td-radius-medium);
  background-color: var(--td-bg-color-container);
  color: var(--td-text-color-primary);
  transition: card-shadow 0.2s cubic-bezier(0.38, 0, 0.24, 1);
  border: 1px solid var(--td-component-border);
  display: flex;
  flex-direction: column;

  --mcg-card-padding: 20px;

  &__header {
    padding: calc(var(--mcg-card-padding) / 2) var(--mcg-card-padding);
    border-bottom: 1px solid var(--td-component-border);
  }

  &__body {
    display: flow-root;
    padding: var(--mcg-card-padding);
    flex: 1;
    height: 0;
  }
}
</style>
