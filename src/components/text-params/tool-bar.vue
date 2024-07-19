<template>
  <ul class="toolbar-container">
    <template v-for="(item, index) in toolbars" :key="index">
      <t-popup v-if="item?.isDisplay ?? true" :content="item.label">
        <li class="toolbar-box" :class="{ 'is-active': item.isActive, 'has-divider': item.divider }"
          @click="onToolbarItemClickHandler(item)">
          <component :is="item.render(item)" />
        </li>
      </t-popup>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { VNode, h, onMounted, reactive } from "vue";
import { useAppStore } from "../../plugins/store/modules/app";
import { MessagePlugin, NotifyPlugin } from "tdesign-vue-next";
import { useTextStore } from "@/plugins/store/modules/text";
import { saveAs } from "@/utils/file";

const appStore = useAppStore();
const textStore = useTextStore();

const emit = defineEmits<ToolBarEmit>();
type ToolBarItem = {
  key: string;
  label: string;
  isDisplay?: boolean;
  isActive?: boolean;
  divider?: boolean;
  render: (item: ToolBarItem) => VNode;
};

const toolbars = reactive<ToolBarItem[]>([
  {
    key: ToolBarModule.VANILLA_CHAR_CODE,
    label: "字符格式",
    isActive: false,
    render: (item: ToolBarItem) => h("span", { class: "vanilla-char-code" }, item.isActive ? "§" : "&"),
    divider: true,
  },
  { key: ToolBarModule.DOWNLOAD, label: "下载", render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "download") },
  {
    key: ToolBarModule.COPY,
    label: "复制",
    divider: true,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined small-icon" }, "content_copy"),
  },
]);

onMounted(() => {
  for (let i = 0; i < toolbars.length; i++) {
    const element = toolbars[i];
    const key = element.key;

    if (element.hasOwnProperty("isActive")) {
      element.isActive = appStore.setting.format[key as never] as boolean;
    }
  }
});

const onToolbarItemClickHandler = (item: ToolBarItem) => {
  switch (item.key) {
    case "vanillaCharCode":
      item.isActive = !item.isActive;
      appStore.setting.format.vanillaCharCode = item.isActive ? "§" : "&";
      emit("on-format-change");
      break;
    case "copy":
      copyProcessText();
      break;
    case "download":
      onDownloadClickHandler();
      break;
  }
};

const copyProcessText = () => {
  if (!textStore.adapter?.rawTextWithoutSpace) {
    MessagePlugin.warning({ content: "请先输入文本" });
    return;
  }

  const result = textStore.adapter?.generateAsString();
  if (!result) {
    MessagePlugin.error({ content: "复制失败，请联系开发者" });
    return;
  }

  navigator.clipboard
    .writeText(result)
    .then(() => MessagePlugin.success({ content: "复制成功 (ノ￣▽￣)" }))
    .catch((err) => {
      MessagePlugin.error({ content: "复制失败，请尝试更新您的浏览器" });
      console.error(err);
    });
};

const toggleDisplay = (key: ToolBarModule, flag?: boolean) => {
  const tool = toolbars.find((el) => el.key === key);
  if (tool) {
    // @ts-ignore
    tool.isDisplay = arguments.length == 2 ? flag : !tool.isDisplay;
  }
};

const onDownloadClickHandler = () => {
  if (!textStore.adapter?.rawTextWithoutSpace) {
    MessagePlugin.warning({ content: "请先输入文本" });
    return;
  }

  const result = textStore.adapter?.generateAsString();
  if (!result) {
    MessagePlugin.error({ content: "导出失败，请联系开发者" });
    return;
  }

  const mimeType = appStore.usingAdapter?.mimeType ?? 'text/plain'
  const blob = new Blob([result], { type: `${mimeType}; charset=utf-8` });

  const time = new Date().toLocaleString().replace(/\\/g, "-").replace(" ", "_");
  const fileName = `MCG-${appStore.setting.usingAdapterKey}-${time}`;

  saveAs(blob, fileName).then(() => {
    NotifyPlugin.success({
      title: "导出成功",
      content: "请留意浏览器下载提示",
    });
  })
};

defineExpose<ToolBarExpose>({ toggleDisplay });
</script>

<script lang="ts">
export enum ToolBarModule {
  VANILLA_CHAR_CODE = "vanillaCharCode",
  COPY = "copy",
  DOWNLOAD = "download",
}

export interface ToolBarEmit {
  (e: "on-format-change"): void;
}

export interface ToolBarExpose {
  toggleDisplay: (key: ToolBarModule, flag?: boolean) => void;
}
</script>

<style lang="scss" scoped>
.toolbar-container {
  display: flex;
}

.toolbar-box {
  width: 30px;
  height: 30px;
  border: 2px dashed #dcdfe6;
  border-radius: 5px;
  @include flex-vcenter;
  cursor: pointer;
  color: #17233d;
  transition: 0.3s all;
  user-select: none;
  margin-right: 10px;
  display: flex;

  .material-symbols-outlined {
    font-size: 22px;

    &.small-icon {
      font-size: 18px;
    }
  }

  &:last-child.has-divider::after {
    display: none !important;
  }

  &.has-divider {
    position: relative;
    margin-right: 20px;

    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 50%;
      right: -13px;
      transform: translateY(-50%);
      width: 2px;
      height: 80%;
      background: #e7e7e7;
    }
  }

  &.is-active {
    color: #17233d;
    border-color: rgba($color: #000000, $alpha: 0);
    background: #e6e8eb;
  }

  &:hover {
    border-color: #606266;
  }

  &:last-child {
    margin-right: 0px;
  }

  &:active {
    border-color: #cdd0d6;
    background: #f5f7fa;
  }

  .vanilla-char-code {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
