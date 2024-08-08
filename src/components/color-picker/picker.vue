<template>
  <div class="picker-container">
    <div class="picker" ref="boxPickerRef"></div>
  </div>
</template>

<script lang="ts" setup>
import iro from "@jaames/iro";
import { computed, onMounted, ref } from "vue";

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
        { component: iro.ui.Box, options: { boxHeight: 200 } },
        { component: iro.ui.Slider, options: { sliderType: "hue" } },
      ],
      width: 250,
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

.picker {
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

  width: 220px;
  $gap-size: 20px;
  margin-right: $gap-size;
  padding-right: $gap-size;
  border-right: 1px dashed #dcdfe6;

  .color-input {
    margin-bottom: 20px;
  }
}
</style>
