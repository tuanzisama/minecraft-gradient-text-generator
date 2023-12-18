<template>
  <ul class="color-cube-box">
    <t-popup v-for="(item, index) in props.list" :key="index" :content="item.label" :delay="[200, 50]" hide-empty-popup>
      <li
        class="color-cube"
        :style="`--color-hex: ${item.color}`"
        @click="onCubeClickHandler(item)"
        @contextmenu="onDblClickHandler($event as PointerEvent, item, index)"
      ></li>
    </t-popup>
  </ul>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<ColorQuickSlotProps>(), {});
const emit = defineEmits<ColorCubeEmit>();

const onCubeClickHandler = (item: ColorItem | GradientColorItem) => {
  if (item.hasOwnProperty("colors")) {
    emit("on-select", item as GradientColorItem);
  } else {
    emit("on-change", item as ColorItem);
  }
};

const onDblClickHandler = (event: PointerEvent, item: ColorItem | GradientColorItem, index: number) => {
  if (item.hasOwnProperty("colors")) {
    emit("on-rightclick", event, item as GradientColorItem, index);
  }
};
</script>

<script lang="ts">
export interface ColorQuickSlotProps {
  list: (ColorItem | GradientColorItem)[];
}
export interface ColorCubeEmit {
  (e: "on-change", value: ColorItem): void;
  (e: "on-select", value: GradientColorItem): void;
  (e: "on-rightclick", event: PointerEvent, value: GradientColorItem, index: number): void;
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
    flex-shrink: 0;
    border: 3px solid #ffffff;
    outline: 2px solid #17233d;
    background: var(--color-hex);
    margin-right: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
