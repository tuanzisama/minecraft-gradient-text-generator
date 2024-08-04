<template>
  <mcg-card class="color-picker-wrapper" body-class="color-pickercard-body">
    <div class="color-picker-header">
      <color-bar ref="colorBarRef" @on-select="onColorBarSelectHandler" />
    </div>
    <div class="color-picker-body">
      <picker ref="pickerRef" v-if="colorStore.selectColorList.length !== 0"
        v-model="colorStore.selectColorList[colorStore.selectedIndex]" @on-change="onPickerChangeHandler">
      </picker>
      <div class="color-list-wrapper">
        <draggable ref="draggableRef" v-model="colorStore.selectColorList" handle=".color-cell" tag="ul" row-key="index"
          item-key="item" class="color-list" :delay="100" :delay-on-touch-only="true" :touch-start-threshold="35"
          filter='input,select,textarea,label,button,fieldset,legend,datalist,output,option,optgroup'
          :prevent-on-filter="false" @change="onDraggableChangeHandler">
          <template #item="{ element, index }">
            <li class="color-cell" :style="`--color-hex: ${element}`" :data-index="index + 1"
              :class="{ 'color-cell--active': colorStore.selectedIndex === index }"
              @click="onColorCellClickHandler(element, index)">
              <div class="color-cell__cube"></div>
              <hex-input v-model="colorStore.selectColorList[index]" style="width: 80px"
                @on-change="onHexInputChangeHandler" theme="ghost" />
              <span class="color-cell__delete" @click.stop="onColorCellDeleteHandler(element, index)">×</span>
            </li>
          </template>
        </draggable>
        <div class="color-operator">
          <t-button theme="success" size="small" @click="onAddColorClickHandler">
            <span class="material-symbols-outlined" style="font-size: 18px;line-height: normal;margin-right: 2px;"
              slot="icon">
              casino
            </span>
            试试手气
          </t-button>
          <t-popconfirm content="确认重置颜色吗？" placement="bottom" theme="warning" @confirm="onResetClickHandler">
            <t-button theme="danger" size="small" variant="outline">重置</t-button>
          </t-popconfirm>
          <t-button theme="primary" size="small" variant="outline"
            @click="isMcgPresetsDialogVisible = true">预设</t-button>
          <t-button theme="warning" size="small" variant="outline"
            @click="isTextImportDialogVisible = true">导入</t-button>
        </div>
      </div>
    </div>
  </mcg-card>
  <text-import v-model="isTextImportDialogVisible" @on-change="onTextImportChangeHandler" />
  <mcg-presets v-model="isMcgPresetsDialogVisible" @on-apply="onMcgPresetsApplyHandler" />
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";
import picker, { PickerExpose } from "./picker.vue";
import { useColorStore } from "../../plugins/store/modules/color";
import HexInput from "./hex-input.vue";
import draggable from "vuedraggable-es";
import { MessagePlugin } from "tdesign-vue-next";
import { McgCard } from "../mcg-card";
import ColorBar, { ColorBarExpose } from "./color-bar.vue";
import { isHexColor } from "@/utils/color";
import { TextImport } from "../text-import";
import { McgPresets } from "../mcg-presets";

const emit = defineEmits<ColorPickerEmit>();
const colorBarRef = ref<ColorBarExpose>();
const pickerRef = ref<PickerExpose>();
const draggableRef = ref<typeof draggable>();
const colorStore = useColorStore();

const isTextImportDialogVisible = ref<boolean>(false)
const isMcgPresetsDialogVisible = ref<boolean>(false)

onMounted(() => {
  colorStore.resetSelectColorList();
  colorBarRef.value?.reDraw();
});

const onHexInputChangeHandler = (hexColor: HexColorString) => {
  if (colorAssertion(hexColor)) {
    pickerRef.value?.setColor(hexColor);
    pickerChangeBroadcaster();
  }
};

const onColorCellClickHandler = (hexColor: HexColorString, index: number) => {
  if (colorAssertion(hexColor)) {
    colorStore.selectedIndex = index;
    pickerRef.value?.setColor(hexColor);
  }
};

const onColorCellDeleteHandler = (hexColor: HexColorString, index: number) => {
  if (colorAssertion(hexColor)) {
    colorStore.pullSelectColorListAt(index);
    pickerChangeBroadcaster();
  }
};

const onAddColorClickHandler = () => {
  if (colorStore.selectColorList.length >= 50) {
    MessagePlugin.warning({ content: "色彩数量超出阈值" });
    return;
  }

  colorStore.appendToSelectColorList();
  colorStore.selectedIndex = colorStore.selectColorList.length - 1;
  pickerChangeBroadcaster();

  nextTick(() => {
    const ulElement = draggableRef.value?.$el as HTMLUListElement;
    if (ulElement) {
      ulElement.scrollTo(0, ulElement.scrollHeight);
    }
  });
};

const onDraggableChangeHandler = (event: { moved: { newIndex: number } }) => {
  colorStore.selectedIndex = event.moved.newIndex;
  pickerChangeBroadcaster();
};

const onPickerChangeHandler = () => {
  pickerChangeBroadcaster();
};

const onColorBarSelectHandler = (colorStopHex: HexColorString) => {
  if (colorAssertion(colorStore.getCurrentColor)) {
    colorStore.appendToSelectColorList(colorStopHex);

    colorStore.selectedIndex = colorStore.selectColorList.length - 1;
    pickerRef.value?.setColor(colorStore.selectColorList[colorStore.selectedIndex]);

    setTimeout(() => {
      const ulElement = draggableRef.value?.$el as HTMLUListElement;
      if (ulElement) {
        ulElement.scrollTo({ top: ulElement.scrollHeight, behavior: "smooth", });
      }
    }, 100);
    pickerChangeBroadcaster();
  }
};


const onResetClickHandler = () => {
  colorStore.resetSelectColorList();
  colorStore.setSelectColorIndex(0)
  pickerRef.value?.setColor(colorStore.getCurrentColor)
  pickerChangeBroadcaster();
};

const onTextImportChangeHandler = (hexColors: HexColorString[]) => {
  colorStore.setSelectColorList(hexColors)
  pickerChangeBroadcaster();
}

const onMcgPresetsApplyHandler = (hexColors: HexColorString[]) => {
  colorStore.setSelectColorList(hexColors)
  isMcgPresetsDialogVisible.value = false
  colorStore.setSelectColorIndex(0)
  pickerRef.value?.setColor(colorStore.getCurrentColor)
  pickerChangeBroadcaster();
}

const colorAssertion = (hexColor: HexColorString) => {
  const flag = isHexColor(hexColor);
  if (!flag) {
    MessagePlugin.warning({ content: "当前颜色格式不正确" });
  }
  return flag
};

const pickerChangeBroadcaster = () => {
  emit("on-change", [...colorStore.selectColorList]);
  colorBarRef.value?.reDraw();
};
</script>

<script lang="ts">
export interface ColorPickerEmit {
  (e: "on-change", colors: HexColorString[]): void;
}
</script>

<style lang="scss" scoped>
.color-picker-wrapper {
  width: 100%;
  height: 100%;

  .color-picker-header {
    width: 100%;
    height: 30px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;

    .colorhex-input {
      width: 120px;
      height: 100%;
      margin-left: 10px;
    }
  }

  .color-picker-body {
    width: 100%;
    height: 240px;
    display: flex;
  }
}

.color-list-wrapper {
  display: flex;
  flex-direction: column;

  .color-operator {
    height: 28px;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    .t-button {
      height: 100%;
    }
  }
}

.color-list {
  width: 240px;
  height: 100%;
  overflow-y: auto;
  @include custom-scrollbar();

  .color-cell {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 6px 10px 6px 10px;
    @include flex-center;
    transition: all 0.3s;
    border: 1px solid #EEEEEE;
    position: relative;

    &.sortable-ghost {
      background-color: #dbdcdd;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:last-child,
    &--active {
      &::after {
        opacity: 0;
      }
    }

    &::before {
      content: "#" attr(data-index);
      position: absolute;
      top: 50%;
      right: 70px;
      transform: translateY(-50%) skewX(-10deg);
      font-size: 35px;
      font-family: "Barlow";
      font-weight: 700;
      color: #f0f1f2;
      user-select: none;
      pointer-events: none;
      transition: color 0.3s;
      display: none !important;
    }

    &::after {
      content: "";
      position: absolute;
      display: block;
      width: 95%;
      height: 1px;
      background-color: #ebeef5;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }

    &--active {
      background: #f0f1f2;
      border: 1px solid #d9dcdf;

      .color-cell__cube {
        border: 3px solid #ffffff;
        outline: 2px solid #17233d;
      }

      .color-cell__delete {
        color: #a7aeb9;
      }

      &::before {
        color: #ffffff;
      }
    }

    &__cube {
      width: 25px;
      height: 25px;
      background-color: var(--color-hex);
      border-radius: 5px;
      cursor: pointer;
      margin-right: 15px;
      flex-shrink: 0;
      border: 3px solid #e4e7ed;
      outline: 2px solid transparent;
      transition: all 0.3s;
    }

    &__text {
      font-weight: 700;
      font-size: 18px;
      transition: all 0.3s;
    }

    &__delete {
      color: #dfe1e6;
      cursor: pointer;
      font-weight: 700;
      font-size: 30px;
      padding-right: 5px;
      transition: color 0.3s;
      user-select: none;
      margin-left: auto;
      transform: translateY(-2px);

      &:hover {
        color: #17233d;
      }
    }
  }
}
</style>

<style lang="scss">
.color-pickercard-body {
  height: 100%;
  display: flex !important;
  flex-direction: column;
}
</style>
