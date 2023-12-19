<template>
  <div class="picker-container">
    <div class="picker--box" ref="boxPickerRef"></div>
    <div class="picker-options">
      <div class="color-input">
        <hex-input v-model="privateValue" @on-change="onHexInputChangeHandler" />
      </div>
      <color-quickslot :list="colorList" @on-change="onColorQuickSlotChangeHandler" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import iro from "@jaames/iro";
import HexInput from "./hex-input.vue";
import { computed, onMounted, ref } from "vue";
import colorList from "./colors";

const boxPickerRef = ref<HTMLDivElement>();
const boxPickerInstance = ref();

const props = withDefaults(defineProps<PickerProps>(), {
  modelValue: "#FFFFFF",
});
const emit = defineEmits<PickerEmit>();

const privateValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

onMounted(() => {
  initializeBoxPicker();
});

const initializeBoxPicker = () => {
  if (boxPickerRef.value) {
    boxPickerInstance.value = iro.ColorPicker(boxPickerRef.value, {
      layout: [
        { component: iro.ui.Box, options: { boxHeight: 250 } },
        { component: iro.ui.Slider, options: { sliderType: "hue" } },
      ],
      width: 400,
      color: privateValue.value,
    });

    boxPickerInstance.value.on("color:change", (iroColor: iro.Color) => {
      privateValue.value = iroColor.hexString as HexColorString;
    });

    // may cause visual lag, like drop frame.
    // don't ask why, "performance"
    boxPickerInstance.value.on("input:end", (iroColor: iro.Color) => {
      emit("on-change", iroColor.hexString as HexColorString);
    });
  }
};

const onHexInputChangeHandler = (val: HexColorString) => {
  setColor(val);
  privateValue.value = val;
  emit("on-change", val);
};

const onColorQuickSlotChangeHandler = (item: ColorItem) => {
  const color = item.color as HexColorString;
  setColor(color);
  privateValue.value = color;
  emit("on-change", color);
};

const setColor = (color: HexColorString) => {
  boxPickerInstance.value?.setColors([color]);
};

defineExpose<PickerExpose>({
  setColor,
});
</script>

<script lang="ts">
export interface PickerProps {
  modelValue?: HexColorString | "";
}

export interface PickerExpose {
  setColor: (color: HexColorString) => void;
}

export interface PickerEmit {
  (e: "update:modelValue", value: PickerProps["modelValue"]): void;
  (e: "on-change", colors: HexColorString): void;
}
</script>

<style lang="scss" scoped>
.picker-container {
  display: flex;
}
.picker--box {
  margin-right: 20px;
  &:deep(.IroBox) {
    border-radius: 6px !important;
  }
  &:deep(.IroColorPicker),
  &:deep(.IroSlider),
  &:deep(.IroSliderGradient) {
    border-radius: 6px !important;
  }
}
.picker-options {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  width: 325px;
  $gap-size: 20px;
  margin-right: $gap-size;
  padding-right: $gap-size;
  border-right: 1px dashed #dcdfe6;

  .color-input {
    margin-bottom: 20px;
  }
}
</style>
