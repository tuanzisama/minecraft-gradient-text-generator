<template>
  <t-dialog v-model:visible="dialogVisible" header="渐变色预设管理" width="800px" :footer="false">
    <div class="button-group">
      <t-button theme="primary" variant="outline" @click="onImportPresetsClickHandler">
        <template #icon>
          <span class="material-symbols-outlined">download</span>
        </template>
        导入
      </t-button>
      <t-button theme="primary" variant="outline" @click="onExportPresetsClickHandler">
        <template #icon>
          <span class="material-symbols-outlined">upload</span>
        </template>
        导出
      </t-button>
      <t-popconfirm content="确认清空预设吗" placement="left-top" theme="danger" @confirm="onClearPresetsClickHandler">
        <t-button theme="danger" variant="outline">
          <template #icon>
            <span class="material-symbols-outlined">delete_forever</span>
          </template>
          清空
        </t-button>
      </t-popconfirm>
    </div>

    <t-table class="mcg-presets-table" :data="colorStore.presetsColorList" :columns="tableColumns" :loading="isLoading"
      height="450px" lazy-load hover />
  </t-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, useCssModule } from 'vue'
import { BaseTableCellParams, BaseTableCol, Button, MessagePlugin, NotifyPlugin, Space, Popconfirm } from 'tdesign-vue-next';
import { pick } from 'lodash-es';
import { saveAs } from '@/utils/file';
import { randomString } from '@/utils/random';
import { isHexColor } from '@/utils/color';
import { useColorStore } from '@/plugins/store/modules/color';

const props = withDefaults(defineProps<McgPresetsProps>(), {});
const emit = defineEmits<McgPresetsEmit>();
const cssModule = useCssModule();
const colorStore = useColorStore();

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const isLoading = ref<boolean>(false)

const tableColumns = ref<BaseTableCol<GradientPresetsRecord>[]>([
  { colKey: 'name', title: '名称', ellipsis: true, width: '140' },
  {
    colKey: 'gradient', title: '渐变色',
    className: cssModule['table-gradient-column'],
    cell: (h, props) => {
      return h('div', {
        class: cssModule['presets-gradient-bar'],
        style: { background: `linear-gradient(to right, ${props.row.colors.join(', ')})` }
      })
    },
  },
  {
    colKey: 'operate', title: '操作', fixed: 'right', width: '120',
    cell: (h, props) => {
      return h('div', {
        class: cssModule['table-operate-column'],
      }, {
        default: () => [h(Space, { size: 6 }, {
          default: () => [
            h(Button, { shape: "square", variant: "text", class: cssModule['table-operate-button'], onClick: () => onApplyClickHandler(props) }, {
              icon: () => h('span', { class: ['material-symbols-outlined', cssModule['table-operate-button-icon']] }, 'check')
            }),
            h(Popconfirm, { content: '确认删除吗', theme: "danger", onConfirm: () => onDeleteClickHandler(props) }, {
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
  emit('on-apply', props.row.colors)
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
        return { name: item.name ?? `预设 ${randomString(6)}`, colors: item.colors as HexColorString[], createTime }
      })

      colorStore.setPresetsColorList(filteredData)
      MessagePlugin.success({ content: `已导入 ${filteredData.length} 条渐变色预设` });
    } catch (error) {
      console.error(error);
      MessagePlugin.error({ content: "无法识别此文件，请重试或联系开发者" });
    } finally {
      isLoading.value = false
    }
  })

  fileEl.click()
}

const onExportPresetsClickHandler = () => {
  const exportData = colorStore.presetsColorList.map(item => pick(item, ['name', 'colors']))
  const blob = new Blob([JSON.stringify(exportData)], { type: `application/json; charset=utf-8` });

  const fileName = `mcg-userdata`;

  saveAs(blob, fileName).then(() => {
    NotifyPlugin.success({
      title: "预设导出成功",
      content: "请留意浏览器下载提示",
    });
  })
}

const onClearPresetsClickHandler = () => {
  colorStore.resetPresetsColorList()
  MessagePlugin.success({ content: "已清空所有预设" });
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
    background-color: rgba(243, 243, 243, 0.6);
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
