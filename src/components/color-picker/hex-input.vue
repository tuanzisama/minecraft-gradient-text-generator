<template>
  <div class="hex-input">
    <t-input
      v-model="privateValue"
      label="#"
      maxlength="6"
      placeholder="16进制颜色"
      size="large"
      @paste="onInputPasteHandler"
      @change="onInputChangeHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { MessagePlugin } from "tdesign-vue-next";
import { computed } from "vue";

const props = withDefaults(defineProps<HexInputProps>(), {});
const emit = defineEmits<HexInputEmit>();

const privateValue = computed({
  get: () => props.modelValue?.replace(/#|&/g, "") as string,
  set: (val) => emit("update:modelValue", `#${val}`),
});

const hexColorRegExp = /^&?#?[a-fA-F0-9]{6}$/;

const onInputPasteHandler = ({ e, pasteValue }: { e: ClipboardEvent; pasteValue: string }) => {
  if (pasteValue === "") {
    MessagePlugin.warning({ content: "请粘贴文本", placement: "bottom" });
    e.preventDefault();
    return;
  }
  if (!hexColorRegExp.test(pasteValue)) {
    MessagePlugin.warning({ content: "请粘贴16进制文字", placement: "bottom" });
    e.preventDefault();
    return;
  }

  privateValue.value = pasteValue.replace(/#|&/g, "") as HexColorString;
};

const onInputChangeHandler = (_val: string | number) => {
  const value = String(_val);
  if (value.length === 6 && hexColorRegExp.test(value)) {
    emit("on-change", `#${privateValue.value}` as HexColorString);
  }
};
</script>

<script lang="ts">
export interface HexInputProps {
  modelValue: HexColorString | "";
}

export interface HexInputEmit {
  (e: "update:modelValue", value: HexInputProps["modelValue"]): void;
  (e: "on-change", value: HexColorString): void;
}
</script>

<style lang="scss" scoped>
.hex-input {
  width: 100%;
  &:deep(.t-input__inner) {
    font-family: "Barlow";
    font-weight: 700;
  }
}
</style>
