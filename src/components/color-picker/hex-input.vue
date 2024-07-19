<template>
  <div class="hex-input" :data-theme="props.theme" :class="{ 'is-incorrect': !isCorrect }">
    <input class="hex-input__inner" v-model="privateValue" maxlength="6" placeholder="16进制颜色"
      @paste="onInputPasteHandler" @input="onInputChangeHandler" @blur="onInputBlurHandler" />
  </div>
</template>

<script lang="ts" setup>
import { isHexColor } from "@/utils/color";
import { MessagePlugin } from "tdesign-vue-next";
import { computed } from "vue";

const props = withDefaults(defineProps<HexInputProps>(), {
  theme: 'default'
});
const emit = defineEmits<HexInputEmit>();

const privateValue = computed({
  get: () => props.modelValue?.replace(/#|&/g, "") as string,
  set: (val) => emit("update:modelValue", `#${val}`),
});

const isCorrect = computed(() => {
  return isHexColor(privateValue.value)
})

const onInputPasteHandler = (event: ClipboardEvent) => {
  const pasteValue = event.clipboardData!.getData('text');

  if (pasteValue === "") {
    MessagePlugin.warning({ content: "请粘贴文本" });
    event.preventDefault();
    return;
  }
  if (!isHexColor(pasteValue)) {
    MessagePlugin.warning({ content: "请粘贴16进制文字" });
    event.preventDefault();
    return;
  }

  privateValue.value = pasteValue.replace(/#|&/g, "") as HexColorString;
};

const onInputChangeHandler = () => {
  if (privateValue.value.length === 6 && isHexColor(privateValue.value)) {
    emit("on-change", `#${privateValue.value}` as HexColorString);
  }
};

const onInputBlurHandler = () => {
  if (!isHexColor(privateValue.value)) {
    MessagePlugin.warning({ content: "请输入16进制颜色" });
  }
}
</script>

<script lang="ts">
export interface HexInputProps {
  modelValue: HexColorString | "";
  theme: 'default' | 'dashed' | 'ghost'
}

export interface HexInputEmit {
  (e: "update:modelValue", value: HexInputProps["modelValue"]): void;
  (e: "on-change", value: HexColorString): void;
}
</script>

<style lang="scss" scoped>
.hex-input {
  width: 100%;
  height: calc(100% + 4px);
  transform: translateY(-2px);
  position: relative;

  &.is-incorrect {
    .hex-input__inner {
      border-color: #FF5252 !important;
    }
  }

  &__inner {
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: "Barlow";
    font-weight: 600;
    padding-left: 20px;
    transition: all .3s;
    background: transparent;

    &::selection {
      background: #212121;
      color: #ffffff;
    }
  }

  &::before {
    content: '#';
    position: absolute;
    font-size: 16px;
    font-weight: 700;
    left: 7px;
    top: 50%;
    transform: translateY(-50%);
    color: gray;
  }

  &[data-theme="dashed"] {
    .hex-input__inner {
      border: 2px dashed #E0E0E0;
      border-radius: 5px;
      outline: none;

      &:hover {
        border-color: #9E9E9E;
      }

      &:focus {
        border-color: #212121;
      }
    }

  }

  &[data-theme="ghost"] {
    .hex-input__inner {
      outline: none;
      border: none;
    }

    &::before {
      left: 5px;
    }
  }
}
</style>
