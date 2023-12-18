<template>
  <div class="colorbar-box">
    <div class="colorbar" ref="colorbarRef" :style="{ background: colorStore.selectColorGradientCss }"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useColorStore } from "../../plugins/store/modules/color";

const colorStore = useColorStore();
const colorbarRef = ref<HTMLDivElement>();
</script>

<style lang="scss" scoped>
.colorbar-box {
  width: 100%;
  margin-bottom: 20px;
  .colorbar {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 2px solid #ffffff;
    outline: 2px solid #17233d;
    background-color: #66ccff;
    position: relative;
    .colorbar-stop {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: var(--stop-position);
      background-color: var(--color-hex);

      width: 10px;
      height: 140%;
      border-radius: 5px;
      border: 3px solid #ffffff;
      outline: 2px solid #17233d;
      cursor: move;
    }
  }
}
</style>
