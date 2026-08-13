<template>
  <div class="cg-container" :class="{ 'is-mobile': isMobile }">
    <mcg-header />
    <template v-if="!isMobile">
      <mcg-body>
        <template #colorplate>
          <color-picker @on-change="onColorPickerChangeHandler" />
        </template>
        <template #input>
          <text-input v-model="appStore.processTags" @on-change="onTextInputChangeHandler" />
        </template>
        <template #output>
          <text-output />
        </template>
      </mcg-body>
      <mcg-footer />
    </template>
    <template v-else>
      <mcg-mobile
        v-model="appStore.processTags"
        @on-text-change="onTextInputChangeHandler"
        @on-color-change="onColorPickerChangeHandler"
      />
    </template>
  </div>
  <mcg-guide />
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";

import { useAppStore } from "./plugins/store/modules/app";
import { ColorPicker } from "./components/color-picker";
import { McgHeader, McgFooter, McgBody } from "./components/mcg-layout";
import McgMobile from "./components/mcg-layout/mobile.vue";
import { TextInput } from "./components/text-input";
import { TextOutput } from "./components/text-output";
import { McgGuide } from './components/mcg-guide'
import { useEventBus } from "./plugins/eventbus";
import { useI18n } from "vue-i18n";
import { adapterMapKey, KeyOfAdapterMap } from "./plugins/processor";
import { useTheme } from "./composables/use-theme";

const MOBILE_BREAKPOINT = 768;

const appStore = useAppStore();
const i18n = useI18n()
const eventBus = useEventBus();
const isMobile = ref(window.innerWidth < MOBILE_BREAKPOINT);
useTheme();

const onResize = () => {
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT;
};

onMounted(() => {
  document.title = i18n.t("app.title")
  detectSearchParamAdapter()
  window.addEventListener("resize", onResize);
})

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
})

const detectSearchParamAdapter = () => {
  const params = new URLSearchParams(location.search);
  const adapter = params.get('adapter') as KeyOfAdapterMap;
  if (adapter && adapterMapKey.includes(adapter)) {
    appStore.setting.usingAdapterKey = adapter

    const url = new URL(location.href)
    url.searchParams.delete("adapter")
    history.pushState(null, '', url);
  }
}

const onTextInputChangeHandler = (val: RichTagChunk) => {
  eventBus.emit("generate:invoke", { tags: val });
};

const onColorPickerChangeHandler = (colors: HexColorString[]) => {
  eventBus.emit("generate:invoke", { tags: null, colors });
};
</script>

<style lang="scss" scoped>
.cg-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .cg-header {
    width: 100%;
    flex-shrink: 0;
  }

  .cg-body {
    flex: 1;
    height: 0;
  }

  .cg-footer {
    width: 100%;
    flex-shrink: 0;
  }

  &.is-mobile {
    height: 100dvh;
    overflow: hidden;
  }
}
</style>
