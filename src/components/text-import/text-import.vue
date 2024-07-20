<template>
  <t-dialog v-model:visible="dialogVisible" header="导入渐变色" width="600px" confirm-btn="识别并导入"
    @confirm="onDialogConfirmHandler" destroy-on-close>

    <div class="dialog-container">
      <t-textarea v-model="textValue" placeholder="输入受支持的格式文本..." name="description"
        :autosize="{ minRows: 3, maxRows: 12 }" />

      <div class="collapse-wrapper">
        <t-collapse>
          <t-collapse-panel header="支持格式">
            <section class="rule-box" v-for="(item, index) in importRules" :key="index">
              <span class="rule-box__label">{{ item.label }}</span>
              <div class="rule-box__example">
                <pre v-html="item.example"></pre>
              </div>
            </section>
            <p>
              <span>希望支持其它插件/格式？</span>
              <t-link theme="primary" href="https://github.com/tuanzisama/minecraft-gradient-text-generator/issues"
                target="_blank">
                联系开发者！
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
import { importRules } from './import-rule'
import { parseText } from './parser';
import { MessagePlugin } from 'tdesign-vue-next';

const props = withDefaults(defineProps<TextImportProps>(), {});
const emit = defineEmits<TextImportEmit>();

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const textValue = ref<string>("")

const onDialogConfirmHandler = () => {
  if (textValue.value.trim() !== '') {
    const result = parseText(textValue.value)

    if (result === null) {
      MessagePlugin.warning({ content: "识别失败" });
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
