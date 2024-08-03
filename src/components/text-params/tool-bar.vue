<template>
  <div class="toolbar-container">
    <template v-for="(item, index) in toolbars" :key="index">
      <t-popup v-if="item?.isDisplay ?? true" :content="item.label">
        <t-button class="tool-button" shape="square" variant="outline"
          :class="{ 'is-active': item.isActive, 'has-divider': item.divider }" @click="onToolbarItemClickHandler(item)">
          <component :is="item.render(item)" />
        </t-button>
      </t-popup>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { VNode, h, onMounted, reactive } from "vue";
import { useAppStore } from "../../plugins/store/modules/app";
import { MessagePlugin, NotifyPlugin } from "tdesign-vue-next";
import { useTextStore } from "@/plugins/store/modules/text";
import { saveAs } from "@/utils/file";
import { previewPip } from '../preview-pip'

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
  },
  {
    key: ToolBarModule.PREVIEW_PIP,
    label: "新窗口预览",
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "picture_in_picture_alt")
  },
  {
    key: ToolBarModule.DOWNLOAD,
    label: "下载",
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "download")
  },
  {
    key: ToolBarModule.COPY,
    label: "复制",
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
    case "preview_pip":
      previewPip()
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
  PREVIEW_PIP = "preview_pip",
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
  gap: 10px;
}

.tool-button {
  .material-symbols-outlined {
    font-size: 22px;

    &.small-icon {
      font-size: 18px;
    }
  }

  .vanilla-char-code {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
