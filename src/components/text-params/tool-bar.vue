<template>
  <ul class="toolbar-container">
    <template v-for="(item, index) in toolbars" :key="index">
      <t-popup v-if="item?.isDisplay ?? true" :content="item.label">
        <li class="toolbar-box" :class="{ 'is-active': item.isActive, 'has-divider': item.divider }" @click="onToolbarItemClickHandler(item)">
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
import { KeyOfProcessorMap } from "@/plugins/processor";

const appStore = useAppStore();
const props = withDefaults(defineProps<ToolBarProps>(), {
  resultRawText: "",
});

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
  {
    key: ToolBarModule.BOLD,
    label: "粗体",
    isActive: false,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "format_bold"),
  },
  {
    key: ToolBarModule.ITALIC,
    label: "斜体",
    isActive: false,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "format_italic"),
  },
  {
    key: ToolBarModule.UNDERLINED,
    label: "下划线",
    isActive: false,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "format_underlined"),
  },
  {
    key: ToolBarModule.STRIKETHROUGH,
    label: "删除线",
    isActive: false,
    divider: true,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "format_strikethrough"),
  },
  {
    key: ToolBarModule.SIMULATE_MODE,
    label: "模拟模式",
    isActive: false,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "videogame_asset"),
  },
  {
    key: ToolBarModule.CLEAR_SPACE,
    label: "移除空格/换行/制表符",
    isActive: false,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "backspace"),
  },
  { key: ToolBarModule.DOWNLOAD, label: "下载", render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "download") },
  {
    key: ToolBarModule.COPY,
    label: "复制",
    divider: true,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "content_copy"),
  },
]);

onMounted(() => {
  for (let i = 0; i < toolbars.length; i++) {
    const element = toolbars[i];
    const key = element.key;

    if (element.hasOwnProperty("isActive")) {
      if (key === "simulateMode") {
        element.isActive = appStore.setting.simulateMode === "chat";
        return;
      }
      element.isActive = appStore.setting.format[key as never] as boolean;
    }
  }
});

const onToolbarItemClickHandler = (item: ToolBarItem) => {
  switch (item.key) {
    case "bold":
    case "italic":
    case "underlined":
    case "strikethrough":
      item.isActive = !item.isActive;
      appStore.setting.format[item.key] = item.isActive;
      emit("on-format-change");
      break;
    case "simulateMode":
      appStore.switchSimulateMode();
      item.isActive = appStore.setting.simulateMode === "chat";
      break;
    case "clearSpace":
      appStore.switchClearWhiteSpace();
      item.isActive = appStore.setting.clearWhiteSpace;
      emit("on-format-change");
      break;
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
  if (appStore.processText.length === 0) {
    MessagePlugin.warning({ content: "请先输入文本", placement: "bottom" });
    return;
  }
  navigator.clipboard
    .writeText(props.resultRawText)
    .then(() => MessagePlugin.success({ content: "复制成功 (ノ￣▽￣)", placement: "bottom" }))
    .catch((err) => {
      MessagePlugin.error({ content: "复制失败，请尝试更新您的浏览器", placement: "bottom" });
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
  if (appStore.processText.length === 0) {
    MessagePlugin.warning({ content: "请先输入文本", placement: "bottom" });
    return;
  }

  const blob = new Blob([props.resultRawText], { type: "text/csv; charset=utf-8" });
  const downloadUrl = window.URL.createObjectURL(blob);

  const time = new Date().toLocaleString().replace(/\\/g, "-").replace(" ", "_");

  const linkEl = document.createElement("a");
  linkEl.setAttribute("href", downloadUrl);
  linkEl.setAttribute("download", `MCG-${time}`);
  linkEl.click();
  window.URL.revokeObjectURL(downloadUrl);

  NotifyPlugin.success({
    title: "导出成功",
    content: "请留意浏览器下载提示。Excel 打开可能会乱码，请使用导入打开。",
    placement: "bottom-right",
  });
};

defineExpose<ToolBarExpose>({ toggleDisplay });
</script>

<script lang="ts">
export enum ToolBarModule {
  VANILLA_CHAR_CODE = "vanillaCharCode",
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINED = "underlined",
  STRIKETHROUGH = "strikethrough",
  SIMULATE_MODE = "simulateMode",
  CLEAR_SPACE = "clearSpace",
  COPY = "copy",
  DOWNLOAD = "download",
}

export interface ToolBarProps {
  resultRawText: string;
  processorKey: KeyOfProcessorMap;
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
