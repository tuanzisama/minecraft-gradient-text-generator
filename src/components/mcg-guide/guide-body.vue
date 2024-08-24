<template>
  <div class="dialog-body">
    <div class="guide-picture" v-if="props.picture">
      <img class="guide-picture__inner" :src="props.picture">
    </div>
    <div class="guide-video" v-if="props.video">
      <video class="guide-video__inner" :src="props.video" autoplay muted loop />
    </div>
    <p class="guide-summary" v-if="props.summary">
      {{ props.summary }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<GuideBodyProps>(), {});
</script>

<script lang="ts">
export interface GuideBodyProps {
  summary?: string
  picture?: string
  video?: string
}
</script>

<style lang="scss" scoped>
.dialog-body {
  .guide-picture {
    width: 100%;
    height: 400px;

    &__inner {
      @include img-contain;
    }
  }

  .guide-video {
    width: 100%;
    height: 300px;

    &__inner {
      @include img-contain;
    }
  }

  .guide-summary {
    margin-top: 24px;
    color: var(--td-text-color-secondary);
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    line-height: 22px;
  }
}
</style>