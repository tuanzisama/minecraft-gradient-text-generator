<template>
  <div class="text-output-wrapper">
    <t-card title="生成" header-bordered>
      <template #actions>
        <span style="cursor: pointer" @click="onCopyClickHandler">复制</span>
      </template>
      <div class="text-output text-output--preview">
        <v-node-component :content="resultVNode" />
      </div>
      <t-divider />
      <div class="text-output text-output--raw" v-text="resultHTML" contenteditable></div>
    </t-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, h } from "vue";
import { VNode as vNodeComponent } from "../../utils/vnode";
import { genColorGradients } from "../../utils/util";
import { useAppStore } from "../../plugins/store/modules/app";
import { useColorStore } from "../../plugins/store/modules/color";
import { MessagePlugin } from "tdesign-vue-next";

const appStore = useAppStore();
const colorStore = useColorStore();

const gradientList = computed(() => {
  return genColorGradients(colorStore.selectColorList, appStore.processText.length);
});

const resultContent = computed<Record<"code" | "color" | "char", string>[]>(() => {
  return appStore.processText.split("").map((item, index) => {
    const color = gradientList.value[index];
    if (appStore.setting.compatibleMode) {
      const colorSplit = color
        .slice(1)
        .split("")
        .reduce((acc, cur) => `${acc}${appStore.setting.charMode}${cur}`, "");
      return { code: `${appStore.setting.charMode}x${colorSplit}${item}`, color, char: item };
    } else {
      return { code: `${appStore.setting.charMode}${color}`, color, char: item };
    }
  });
});

const resultText = computed<string>(() => {
  if (colorStore.selectColorList.length < 2) {
    return appStore.processText;
  } else {
    return resultContent.value.map((item) => item.char).join("");
  }
});

const resultVNode = computed(() => {
  if (colorStore.selectColorList.length < 2) {
    return appStore.processText.split("").map((el) => h("span", el));
  }
  return resultContent.value.map((item) => h("span", { style: { color: item.color } }, item.char));
});

const resultHTML = computed(() => {
  if (colorStore.selectColorList.length < 2) {
    return appStore.processText;
  }
  return resultContent.value.map((item) => `${item.code}${item.char}`).join("");
});

const onCopyClickHandler = () => {
  if (appStore.processText.length === 0) {
    MessagePlugin.warning({ content: "请先输入文本", placement: "bottom" });
    return;
  }
  navigator.clipboard
    .writeText(resultText.value)
    .then(() => MessagePlugin.success({ content: "复制成功啦", placement: "bottom" }))
    .catch((err) => {
      MessagePlugin.error({ content: "复制失败，请尝试更新您的浏览器", placement: "bottom" });
      console.error(err);
    });
};
</script>

<style lang="scss" scoped>
.text-output-wrapper {
  width: 100%;
}

.text-output {
  width: 100%;
  height: 150px;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 20px;
  line-height: 25px;
  letter-spacing: 1px;
  @include custom-scrollbar();
  outline: none;
  border: none;
  word-break: break-all;
  &--preview {
    height: 80px;
  }
  &--raw {
    font-size: 14px;
    line-height: 20px;
    &:deep(.color-tag) {
      color: var(--color-hex);
    }
  }
}
</style>
