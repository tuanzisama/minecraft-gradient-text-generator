<template>
  <t-dialog v-model:visible="dialogVisible" :header="$t('picker.presets.title')" width="800px"
    class="mcg-presets-dialog" :footer="false">
    <div class="button-group">
      <t-button theme="primary" variant="outline" @click="onImportPresetsClickHandler">
        <template #icon>
          <span class="material-symbols-outlined">download</span>
        </template>
        {{ $t('picker.presets.button.import') }}
      </t-button>
      <t-button theme="primary" variant="outline" @click="onExportPresetsClickHandler">
        <template #icon>
          <span class="material-symbols-outlined">upload</span>
        </template>
        {{ $t('picker.presets.button.export') }}
      </t-button>
      <t-popconfirm :content="$t('picker.presets.clear_confirm')" placement="left-top" theme="danger"
        @confirm="onClearPresetsClickHandler">
        <t-button theme="danger" variant="outline">
          <template #icon>
            <span class="material-symbols-outlined">delete_forever</span>
          </template>
          {{ $t('picker.presets.button.clear') }}
        </t-button>
      </t-popconfirm>
    </div>

    <t-table class="mcg-presets-table" :data="colorStore.presetsColorList" :columns="tableColumns" :loading="isLoading"
      height="450px" lazy-load hover />
  </t-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, useCssModule } from 'vue'
import { BaseTableCellParams, BaseTableCol, Button, MessagePlugin, NotifyPlugin, Space, Popconfirm, Tooltip } from 'tdesign-vue-next';
import { pick } from 'lodash-es';
import { saveAs } from '@/utils/file';
import { randomString } from '@/utils/random';
import { isHexColor } from '@/utils/color';
import { useColorStore } from '@/plugins/store/modules/color';
import { format as timeAgoFormat } from 'timeago.js';
import { useI18n } from 'vue-i18n';

const props = withDefaults(defineProps<McgPresetsProps>(), {});
const emit = defineEmits<McgPresetsEmit>();
const cssModule = useCssModule();
const colorStore = useColorStore();
const i18n = useI18n();

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const isLoading = ref<boolean>(false)

const tableColumns = ref<BaseTableCol<GradientPresetsRecord>[]>([
  { colKey: 'name', title: i18n.t("picker.presets.table.column.name"), ellipsis: true, width: '140' },
  {
    colKey: 'gradient', title: i18n.t("picker.presets.table.column.gradient"),
    className: cssModule['table-gradient-column'],
    minWidth: '200',
    cell: (h, props) => {
      return h(Tooltip, { content: i18n.t("picker.presets.table.gradient_count", { count: props.row.colors.length }), theme: 'light' }, {
        default: () => [h('div', {
          class: cssModule['presets-gradient-bar'],
          style: { background: `linear-gradient(to right, ${props.row.colors.join(', ')})` }
        })]
      })
    },
  },
  {
    colKey: 'createTime', title: i18n.t("picker.presets.table.column.create_time"), ellipsis: true, width: '120',
    cell: (h, props) => {
      if (props.row.createTime === null) {
        return h('span', null, "N/A");
      }

      const date = new Date(props.row.createTime);
      return h(Tooltip, { content: date.toLocaleString(), theme: 'light' }, {
        default: () => [h('span', null, timeAgoFormat(date, i18n.t('app.timeago_locale')))]
      })
    }
  },
  {
    colKey: 'operate', title: i18n.t("picker.presets.table.column.operate"), fixed: 'right', width: '100',
    cell: (h, props) => {
      return h('div', {
        class: cssModule['table-operate-column'],
      }, {
        default: () => [h(Space, { size: 6 }, {
          default: () => [
            h(Button, { shape: "square", variant: "text", class: cssModule['table-operate-button'], onClick: () => onApplyClickHandler(props) }, {
              icon: () => h('span', { class: ['material-symbols-outlined', cssModule['table-operate-button-icon']] }, 'check')
            }),
            h(Popconfirm, { content: i18n.t("picker.presets.table.delete_confirm"), theme: "danger", onConfirm: () => onDeleteClickHandler(props) }, {
              default: () => [
                h(Button, { shape: "square", variant: "text", disabled: props.row.isLocked, class: cssModule['table-operate-button'] }, {
                  icon: () => h('span', { class: ['material-symbols-outlined', cssModule['table-operate-button-icon']] }, 'delete')
                })
              ]
            })
          ]
        })
        ]
      })
    },
  },
]);

const onApplyClickHandler = (props: BaseTableCellParams<GradientPresetsRecord>) => {
  emit('on-apply', [...props.row.colors])
}

const onDeleteClickHandler = (props: BaseTableCellParams<GradientPresetsRecord>) => {
  colorStore.pullPresetsColorListAt(props.rowIndex)
}

const onImportPresetsClickHandler = () => {
  const fileEl: HTMLInputElement = document.createElement('input');
  fileEl.setAttribute('type', 'file')
  fileEl.setAttribute('accept', 'application/json')

  fileEl.addEventListener('change', async (event: Event) => {
    const file = fileEl.files?.[0];
    if (!file) return;

    try {
      isLoading.value = true
      const fileContent = await file.text()
      const parsedData = JSON.parse(fileContent) as Partial<BaseGradientPresets>[]
      const createTime = new Date();

      // checking...
      const filteredData = parsedData.filter(item => {
        return item.hasOwnProperty('colors') && item.colors?.every(color => isHexColor(color));
      }).map<GradientPresetsRecord>(item => {
        return { name: item.name ?? randomString(6), colors: item.colors as HexColorString[], createTime }
      })

      colorStore.appendPresetsColorList(filteredData)
      MessagePlugin.success({ content: i18n.t('picker.presets.import_success', { count: filteredData.length }) });
    } catch (error) {
      console.error(error);
      MessagePlugin.error({ content: i18n.t('picker.presets.import_failed') });
    } finally {
      isLoading.value = false
    }
  })

  fileEl.click()
}

const onExportPresetsClickHandler = () => {
  const exportData = colorStore.presetsColorList.filter(item => !item.isLocked).map(item => pick(item, ['name', 'colors']))
  const blob = new Blob([JSON.stringify(exportData)], { type: `application/json; charset=utf-8` });

  const fileName = `mcg-userdata`;

  saveAs(blob, fileName).then(() => {
    NotifyPlugin.success({
      title: i18n.t('picker.presets.export_success'),
      content: i18n.t('common.download_tip'),
    });
  })
}

const onClearPresetsClickHandler = () => {
  colorStore.resetPresetsColorList()
  MessagePlugin.success({ content: i18n.t('picker.presets.clear_success') });
}
</script>

<script lang="ts">
export interface McgPresetsProps {
  modelValue: boolean;
}

export interface McgPresetsEmit {
  (e: "update:modelValue", value: McgPresetsProps["modelValue"]): void;
  (e: "on-apply", value: HexColorString[]): void;
}
</script>


<style lang="scss" scoped>
.mcg-presets-table {
  :deep(tr>th) {
    background-color: #ffffff;
    border-bottom: none !important;
  }

  :deep(.t-table__header) {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 8px 16px 0px, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset;
  }
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

  :last-child {
    margin-left: auto;
  }

}
</style>

<style module>
.presets-gradient-bar {
  width: 100%;
  height: 16px;
  border-radius: 4px;
}

.table-gradient-column {
  vertical-align: middle;
  padding-right: 0 !important;
}

.table-operate-column {
  vertical-align: middle;
}

.table-operate-button {
  color: #777777;
}

.table-operate-button-icon {
  font-variation-settings:
    'FILL' 0,
    'wght' 300,
    'GRAD' 0,
    'opsz' 24;
  font-size: 20px;
}
</style>
