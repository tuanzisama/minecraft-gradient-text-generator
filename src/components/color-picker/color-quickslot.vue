<template>
  <ul class="color-cube-box">
    <t-popup v-for="(item, index) in colorList" :key="index" :content="item.label" :delay="[200, 50]" hide-empty-popup>
      <li class="color-cube" :style="`--color-hex: ${item.color}`" @click="onCubeClickHandler(item)"></li>
    </t-popup>
  </ul>
</template>

<script lang="ts" setup>
import colorList, { ColorItem } from "./colors";

const emit = defineEmits<ColorCubeEmit>();

const onCubeClickHandler = (item: ColorItem) => {
  emit("on-change", item.color);
};
</script>

<script lang="ts">
export interface ColorCubeEmit {
  (e: "on-change", value: HexColorString): void;
}
</script>

<style lang="scss" scoped>
.color-cube-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .color-cube {
    width: 40px;
    height: 40px;
    border: 3px solid #ffffff;
    outline: 2px solid #17233d;
    background-color: var(--color-hex);
    margin-right: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
