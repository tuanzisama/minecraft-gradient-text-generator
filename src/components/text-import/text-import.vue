<template>
  <t-dialog v-model:visible="dialogVisible" :header="$t('picker.import.title')" width="600px"
    :confirm-btn="$t('picker.import.confirm_button')" :cancel-btn="$t('common.close')" @confirm="onDialogConfirmHandler"
    destroy-on-close>

    <div class="dialog-container">
      <t-textarea v-model="textValue" :placeholder="$t('picker.import.placeholder')" name="description"
        :autosize="{ minRows: 3, maxRows: 12 }" />

      <div class="collapse-wrapper">
        <t-collapse>
          <t-collapse-panel :header="$t('picker.import.support_format')">
            <section class="rule-box" v-for="(item, index) in getImportRules()" :key="index">
              <span class="rule-box__label">{{ item.label }}</span>
              <div class="rule-box__example">
                <pre v-html="item.example"></pre>
              </div>
            </section>
            <p>
              <span>{{ $t("common.support_request") }}</span>
              <t-link theme="primary" href="https://github.com/tuanzisama/minecraft-gradient-text-generator/issues"
                target="_blank">
                {{ $t("common.contact_developer") }}
              </t-link>
            </p>
          </t-collapse-panel>
        </t-collapse>
      </div>
    </div>
  </t-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { getImportRules } from './import-rule'
import { parseText } from './parser';
import { MessagePlugin } from 'tdesign-vue-next';
import { useI18n } from 'vue-i18n';

const props = withDefaults(defineProps<TextImportProps>(), {});
const emit = defineEmits<TextImportEmit>();
const i18n = useI18n()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const textValue = ref<string>("")

const onDialogConfirmHandler = () => {
  if (textValue.value.trim() !== '') {
    const result = parseText(textValue.value)

    if (result.length < 2) {
      MessagePlugin.warning({ content: i18n.t("picker.import.import_failed") });
      return
    }

    emit('on-change', result)
    textValue.value = ''
    dialogVisible.value = false
  }
}
</script>

<script lang="ts">
export interface TextImportProps {
  modelValue: boolean;
}

export interface TextImportEmit {
  (e: "update:modelValue", value: TextImportProps["modelValue"]): void;
  (e: "on-change", value: HexColorString[]): void;
}
</script>

<style lang="scss" scoped>
.dialog-container {
  :deep(.t-textarea__inner) {
    border-radius: 6px;
  }
}

.collapse-wrapper {
  margin-top: 10px;

  .t-collapse {
    border-radius: 6px;

    .t-collapse-panel:last-child {
      :deep(.t-collapse-panel__header) {
        user-select: none;
      }

      :deep(.t-collapse-panel__body) {
        border-radius: 6px;
        background: #ffffff;

        .t-collapse-panel__content {
          padding: 16px;
        }
      }
    }
  }

  .rule-box {
    margin-bottom: 10px;

    &__label {
      font-weight: 700;
      font-family: DIN;
    }

    &__example {
      margin-bottom: 5px;

      pre {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        color: rgb(51, 51, 51);
        background: rgb(248, 248, 248);

        @include custom-scrollbar();
      }
    }
  }

}
</style>
