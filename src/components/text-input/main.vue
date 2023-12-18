<template>
  <div class="text-input-wrapper">
    <t-textarea v-model="privateValue" placeholder="输入文字..." maxlength="200" :autosize="{ minRows: 3, maxRows: 8 }" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(defineProps<TextInputProps>(), {});
const emit = defineEmits<TextInputEmit>();

const privateValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<script lang="ts">
export interface TextInputProps {
  modelValue: string;
}
export interface TextInputEmit {
  (e: "update:modelValue", value: TextInputProps["modelValue"]): void;
}
</script>

<style lang="scss" scoped>
.text-input-wrapper {
  width: 100%;
  &:deep(.t-textarea__inner) {
    font-size: 18px;
    font-weight: 700;
    font-family: "Barlow", "Noto Sans SC", sans-serif;
  }
}
</style>
