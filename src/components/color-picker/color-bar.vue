<template>
  <div class="colorbar-box">
    <canvas class="colorbar" ref="colorbarRef" @mousemove="onMouseMoveHandler" height="40"></canvas>
    <span
      class="colorbar-stop"
      :style="{ left: `${colorStopLeft}px`, '--color-stop': `rgb(${colorStopRgb.r}, ${colorStopRgb.g}, ${colorStopRgb.b})` }"
      @mouseup="onColorStopClickHandler"
    ></span>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef } from "vue";
import { useColorStore } from "../../plugins/store/modules/color";
import { rgbToHex } from "@/utils/util";
import { throttle } from "lodash-es";

const colorStore = useColorStore();
const emit = defineEmits<ColorBarEmit>();
const colorbarRef = ref<HTMLCanvasElement>();
const colorbarCtx = shallowRef();

const colorStopLeft = ref(0);
const colorStopRgb = ref({ r: 0, g: 0, b: 0 });

onMounted(() => {
  if (colorbarRef.value) {
    colorbarRef.value.width = colorbarRef.value.offsetWidth;
    colorbarRef.value.height = colorbarRef.value.offsetHeight;
    colorbarCtx.value = colorbarRef.value?.getContext("2d");

    drawCanvas();
  }
});

const drawCanvas = () => {
  const width = colorbarRef.value!.offsetWidth;
  const height = colorbarRef.value!.offsetHeight;

  var gradient = colorbarCtx.value!.createLinearGradient(0, 0, width, height);
  colorStore.selectColorList.forEach((color, _index, list) => {
    const index = _index === 0 ? 0 : (1 / (list.length - 1)) * _index;
    gradient.addColorStop(index, color);
  });

  colorbarCtx.value!.fillStyle = gradient;
  colorbarCtx.value!.fillRect(0, 0, width, height);
};

const onMouseMoveHandler = throttle((event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  const pixel = colorbarCtx.value!.getImageData(x, y, 1, 1).data;
  const pointColor = { r: pixel[0], g: pixel[1], b: pixel[2] };

  if (!colorStore.selectColorList.includes("#000000") && pointColor.r === 0 && pointColor.g === 0 && pointColor.b === 0) {
    return;
  }

  colorStopLeft.value = x;
  colorStopRgb.value = pointColor;
}, 10);

const onColorStopClickHandler = () => {
  const colorStopHex = rgbToHex(colorStopRgb.value);
  colorStore.addSelectColorList(colorStopHex);
  emit("on-select", colorStopHex);
};

defineExpose<ColorBarExpose>({ reDraw: drawCanvas });
</script>

<script lang="ts">
export interface ColorBarExpose {
  reDraw: () => void;
}
export interface ColorBarEmit {
  (e: "on-select", color: HexColorString): void;
}
</script>

<style lang="scss" scoped>
.colorbar-box {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  .colorbar {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 2px solid #ffffff;
    outline: 2px solid #17233d;
    background-color: #000000;
    cursor: pointer;
  }
  &:hover {
    .colorbar-stop {
      opacity: 1 !important;
    }
  }
  .colorbar-stop {
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--color-stop);
    transition: opacity 0.1s;

    width: 10px;
    height: 140%;
    border-radius: 5px;
    border: 3px solid #ffffff;
    outline: 2px solid #17233d;
    z-index: 3;
    will-change: left;
    cursor: pointer;
  }
}
</style>
