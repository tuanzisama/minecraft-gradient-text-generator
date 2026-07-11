<template>
  <section class="cg-mobile">
    <div class="cg-mobile__panel">
      <keep-alive>
        <component :is="panelComponent" v-bind="panelProps" v-on="panelEvents" />
      </keep-alive>
    </div>
    <nav class="cg-mobile__tabbar">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ 'tab-item--active': activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span class="material-symbols-outlined tab-item__icon">{{ tab.icon }}</span>
        <span class="tab-item__label">{{ $t(tab.labelKey) }}</span>
      </button>
    </nav>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref, markRaw } from "vue";
import TextInput from "../text-input/text-input.vue";
import ColorPicker from "../color-picker/color-picker.vue";
import TextOutput from "../text-output/text-output.vue";
import McgSettings from "../mcg-settings/mcg-settings.vue";

type TabKey = "editor" | "color" | "preview" | "settings";

const props = defineProps<{
  modelValue: RichTagChunk;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: RichTagChunk): void;
  (e: "on-text-change", value: RichTagChunk): void;
  (e: "on-color-change", value: HexColorString[]): void;
}>();

const activeTab = ref<TabKey>("editor");

const tabs: { key: TabKey; icon: string; labelKey: string }[] = [
  { key: "editor", icon: "edit_note", labelKey: "mobile.tab.editor" },
  { key: "color", icon: "palette", labelKey: "mobile.tab.color" },
  { key: "preview", icon: "visibility", labelKey: "mobile.tab.preview" },
  { key: "settings", icon: "settings", labelKey: "mobile.tab.settings" },
];

const panelComponents: Record<TabKey, unknown> = {
  editor: markRaw(TextInput),
  color: markRaw(ColorPicker),
  preview: markRaw(TextOutput),
  settings: markRaw(McgSettings),
};

const panelComponent = computed(() => panelComponents[activeTab.value]);

const panelProps = computed(() => {
  if (activeTab.value === "editor") {
    return { modelValue: props.modelValue };
  }
  return {};
});

const panelEvents = computed(() => {
  if (activeTab.value === "editor") {
    return {
      "update:modelValue": (val: RichTagChunk) => emit("update:modelValue", val),
      "on-change": (val: RichTagChunk) => emit("on-text-change", val),
    };
  }
  if (activeTab.value === "color") {
    return {
      "on-change": (colors: HexColorString[]) => emit("on-color-change", colors),
    };
  }
  return {};
});
</script>

<style lang="scss" scoped>
.cg-mobile {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 0;
  overflow: hidden;

  &__panel {
    flex: 1;
    overflow-y: auto;
    @include custom-scrollbar;
  }

  &__tabbar {
    display: flex;
    flex-shrink: 0;
    height: 56px;
    border-top: 1px solid var(--td-component-border);
    background: var(--td-bg-color-container);
  }
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #909399;
  transition: color 0.2s;
  -webkit-tap-highlight-color: transparent;

  &--active {
    color: var(--td-brand-color);
  }

  &__icon {
    font-size: 22px;
  }

  &__label {
    font-size: 11px;
    line-height: 1;
  }
}
</style>
