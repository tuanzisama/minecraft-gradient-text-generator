<template>
  <div class="toolbar-container">
    <template v-for="(item, index) in toolbars" :key="index">
      <t-popup v-if="item?.isDisplay ?? true" :content="$t(item.label)">
        <t-button class="tool-button" shape="square" variant="outline"
          :class="{ 'is-active': item.isActive, 'has-divider': item.divider }" @click="onToolbarItemClickHandler(item)">
          <component :is="item.render(item)" />
        </t-button>
      </t-popup>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { VNode, h, onMounted, reactive, ref } from "vue";
import { useAppStore } from "../../plugins/store/modules/app";
import { MessagePlugin, NotifyPlugin } from "tdesign-vue-next";
import { useTextStore } from "@/plugins/store/modules/text";
import { saveAs } from "@/utils/file";
import { PreviewPip, requestPreviewPip } from '../preview-pip'
import { useI18n } from "vue-i18n";

const appStore = useAppStore();
const textStore = useTextStore();
const i18n = useI18n()

const emit = defineEmits<ToolBarEmit>();
type ToolBarItem = {
  key: string;
  label: string;
  isDisplay?: boolean;
  isActive?: boolean;
  divider?: boolean;
  render: (item: ToolBarItem) => VNode;
};

const previewPip = ref<PreviewPip>()
const toolbars = reactive<ToolBarItem[]>([
  {
    key: ToolBarModule.VANILLA_CHAR_CODE,
    label: "processor.toolbar.vanilla_char_code",
    isActive: false,
    render: (item: ToolBarItem) => h("span", { class: "vanilla-char-code" }, item.isActive ? "§" : "&"),
  },
  {
    key: ToolBarModule.SHARE,
    label: "processor.toolbar.share",
    isActive: false,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "share_windows"),
  },
  {
    key: ToolBarModule.PREVIEW,
    label: "processor.toolbar.preview",
    isActive: true,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, item.isActive ? "preview" : "preview_off")
  },
  {
    key: ToolBarModule.PREVIEW_PIP,
    label: "processor.toolbar.preview_pip",
    isDisplay: false,
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, item.isActive ? "picture_in_picture_alt" : "pip")
  },
  {
    key: ToolBarModule.DOWNLOAD,
    label: "processor.toolbar.download",
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined" }, "download")
  },
  {
    key: ToolBarModule.COPY,
    label: "processor.toolbar.copy",
    render: (item: ToolBarItem) => h("span", { class: "material-symbols-outlined small-icon" }, "content_copy"),
  },
]);

onMounted(() => {
  for (let i = 0; i < toolbars.length; i++) {
    const element = toolbars[i];
    const key = element.key;

    if (key === ToolBarModule.VANILLA_CHAR_CODE) {
      element.isActive = appStore.setting.format.vanillaCharCode === '§';
    }

    if (key === ToolBarModule.PREVIEW) {
      element.isActive = appStore.setting.simulateMode === "chat";
    }

    if (key === ToolBarModule.PREVIEW_PIP) {
      element.isDisplay = window.hasOwnProperty('documentPictureInPicture')
    }
  }
});

const onToolbarItemClickHandler = async (item: ToolBarItem) => {
  switch (item.key) {
    case "vanillaCharCode":
      item.isActive = !item.isActive;
      appStore.setVanillaCharCode(item.isActive ? "§" : "&");
      emit("on-format-change");
      break;
    case "copy":
      copyProcessText();
      break;
    case "download":
      onDownloadClickHandler();
      break;
    case "preview":
      item.isActive = !item.isActive
      appStore.setSimulateMode(item.isActive ? "chat" : "default")
      break;
    case "share":
      copyAdapterURL()
      break;
    case "preview_pip":
      if (item.isActive) {
        item.isActive = false
        previewPip.value?.close?.()
      } else {
        item.isActive = true
        previewPip.value = await requestPreviewPip({
          onClose: () => {
            item.isActive = false
          }
        })
      }
      break;
  }
};

const copyProcessText = () => {
  if (!textStore.adapter?.rawTextWithoutSpace) {
    MessagePlugin.warning({ content: i18n.t("output.input_is_empty") });
    return;
  }

  const result = textStore.adapter?.generateAsString();
  if (!result) {
    MessagePlugin.error({ content: i18n.t("output.copy_failed") });
    return;
  }

  navigator.clipboard
    .writeText(result)
    .then(() => MessagePlugin.success({ content: i18n.t("output.copy_success") }))
    .catch((err) => {
      MessagePlugin.error({ content: i18n.t("output.copy_failed") });
      console.error(err);
    });
};

const copyAdapterURL = () => {
  const url = new URL(location.href)
  if (appStore.setting.usingAdapterKey) {
    url.searchParams.set("adapter", appStore.setting.usingAdapterKey)
  }
  navigator.clipboard
    .writeText(url.toString())
    .then(() => MessagePlugin.success({ content: i18n.t("output.copy_success") }))
    .catch((err) => {
      MessagePlugin.error({ content: i18n.t("output.copy_failed") });
      console.error(err);
    });
}

const toggleDisplay = (key: ToolBarModule, flag?: boolean) => {
  const tool = toolbars.find((el) => el.key === key);
  if (tool) {
    // @ts-ignore
    tool.isDisplay = arguments.length == 2 ? flag : !tool.isDisplay;
  }
};

const onDownloadClickHandler = () => {
  if (!textStore.adapter?.rawTextWithoutSpace) {
    MessagePlugin.warning({ content: i18n.t("output.input_is_empty") });
    return;
  }

  const result = textStore.adapter?.generateAsString();
  if (!result) {
    MessagePlugin.error({ content: i18n.t("output.download_failed") });
    return;
  }

  const mimeType = appStore.usingAdapter?.mimeType ?? 'text/plain'
  const blob = new Blob([result], { type: `${mimeType}; charset=utf-8` });

  const time = new Date().toLocaleString().replace(/\\/g, "-").replace(" ", "_");
  const fileName = `MCG-${appStore.setting.usingAdapterKey}-${time}`;

  saveAs(blob, fileName).then(() => {
    NotifyPlugin.success({
      title: i18n.t('output.download_success'),
      content: i18n.t('common.download_tip'),
    });
  })
};

defineExpose<ToolBarExpose>({ toggleDisplay });
</script>

<script lang="ts">
export enum ToolBarModule {
  SHARE = "share",
  VANILLA_CHAR_CODE = "vanillaCharCode",
  COPY = "copy",
  DOWNLOAD = "download",
  PREVIEW = "preview",
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
