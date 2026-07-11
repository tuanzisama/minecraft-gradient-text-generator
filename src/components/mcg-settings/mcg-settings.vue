<template>
  <div class="mcg-settings">
    <div class="settings-group">
      <h3 class="settings-group__title">{{ $t("settings.format") }}</h3>
      <div class="settings-item">
        <span class="settings-item__label">{{ $t("settings.adapter") }}</span>
        <t-select
          v-model="appStore.setting.usingAdapterKey"
          :placeholder="$t('processor.placeholder')"
          filterable
          size="small"
          @change="onAdapterChange"
        >
          <t-option v-for="[key, value] in adapterMap" :key="key" :value="key" :label="$t(value.label)" />
        </t-select>
      </div>
      <div class="settings-item" v-if="showVanillaCharCode">
        <span class="settings-item__label">{{ $t("processor.toolbar.vanilla_char_code") }}</span>
        <t-switch
          :label="['&', '§']"
          :value="appStore.setting.format.vanillaCharCode === '§'"
          @change="onVanillaCharCodeChange"
        />
      </div>
      <div class="settings-item" v-if="showProcessSimplify">
        <span class="settings-item__label">{{ $t("processor.toolbar.process_simplify") }}</span>
        <t-switch
          :value="appStore.setting.format.processSimplify"
          @change="onProcessSimplifyChange"
        />
      </div>
    </div>

    <div class="settings-group">
      <h3 class="settings-group__title">{{ $t("settings.display") }}</h3>
      <div class="settings-item">
        <span class="settings-item__label">{{ $t("settings.simulate_mode") }}</span>
        <t-select v-model="appStore.setting.simulateMode" size="small" @change="onSimulateModeChange">
          <t-option value="default" :label="$t('settings.mode_default')" />
          <t-option value="chat" :label="$t('settings.mode_chat')" />
        </t-select>
      </div>
      <div class="settings-item">
        <span class="settings-item__label">{{ $t("settings.language") }}</span>
        <t-select v-model="currentLocale" size="small" @change="onLocaleChange">
          <t-option value="zh-CN" label="简体中文" />
          <t-option value="zh-TW" label="繁體中文" />
          <t-option value="en-US" label="English" />
          <t-option value="ja-JP" label="日本語" />
        </t-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useAppStore } from "@/plugins/store/modules/app";
import { adapterMap, KeyOfAdapterMap } from "@/plugins/processor";
import { useEventBus } from "@/plugins/eventbus";
import { useI18n } from "vue-i18n";

const appStore = useAppStore();
const eventBus = useEventBus();
const i18n = useI18n();

const currentLocale = ref(i18n.locale.value);

const showVanillaCharCode = computed(() =>
  ["vanilla", "vanilla-compatible"].includes(appStore.setting.usingAdapterKey)
);

const showProcessSimplify = computed(() =>
  ["minimessage-gradient", "taboolib-gradient", "rosegarden-gradient"].includes(appStore.setting.usingAdapterKey)
);

const onAdapterChange = () => {
  eventBus.emit("generate:invoke", { tags: null });
};

const onVanillaCharCodeChange = (val: boolean) => {
  appStore.setVanillaCharCode(val ? "§" : "&");
  eventBus.emit("generate:invoke", { tags: null });
};

const onProcessSimplifyChange = (val: boolean) => {
  appStore.setProcessSimplify(val);
  eventBus.emit("generate:invoke", { tags: null });
};

const onSimulateModeChange = () => {
  // simulateMode is already updated via v-model
};

const onLocaleChange = (val: string) => {
  i18n.locale.value = val;
  document.title = i18n.t("app.title");
};
</script>

<style lang="scss" scoped>
.mcg-settings {
  padding: 16px;
}

.settings-group {
  margin-bottom: 24px;

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: #909399;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &__label {
    font-size: 14px;
    color: #303133;
    flex-shrink: 0;
    margin-right: 12px;
  }

  .t-select,
  .t-switch {
    flex-shrink: 0;
  }

  .t-select {
    width: 180px;
  }
}
</style>
