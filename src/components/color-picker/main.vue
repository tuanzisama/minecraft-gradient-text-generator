<template>
  <t-card bordered class="color-picker-wrapper">
    <div class="color-picker-header">
      <color-bar />
      <picker ref="pickerRef" v-model="colorStore.selectColorList[colorStore.selectedIndex]" @on-change="onPickerChangeHandler">
        <draggable ref="draggableRef" v-model="colorStore.selectColorList" tag="ul" class="color-list" @change="onDraggableChangeHandler">
          <template #item="{ element, index }">
            <li
              class="color-cell"
              :style="`--color-hex: ${element}`"
              :data-index="index + 1"
              :class="{ 'color-cell--active': colorStore.selectedIndex === index }"
              @click="onColorCellClickHandler(element, index)"
            >
              <div class="color-cell__cube"></div>
              <hex-input v-model="colorStore.selectColorList[index]" style="width: 150px" @on-change="onHexInputChangeHandler" />
              <span class="color-cell__delete" @click.stop="onColorCellDeleteHandler(element, index)">×</span>
            </li>
          </template>
        </draggable>
      </picker>
    </div>
    <div class="color-picker-footer">
      <div class="color-setting" size="10px">
        <color-quickslot
          :list="colorStore.getCacheList"
          @on-select="onColorQuickSlotSelectHandler"
          @on-rightclick="onColorQuickSlotRightClickHandler"
        />
      </div>
      <t-space class="list-setting" size="10px">
        <t-button variant="dashed" @click="onSaveColorsClickHandler">保存</t-button>
        <t-button @click="onAddColorClickHandler">新增</t-button>
        <t-popconfirm content="确认重置吗" @confirm="onResetClickHandler">
          <t-button theme="danger">重置</t-button>
        </t-popconfirm>
        <slot name="list-setting"> </slot>
      </t-space>
    </div>
  </t-card>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";
import picker, { PickerExpose } from "./picker.vue";
import { useColorStore } from "../../plugins/store/modules/color";
import HexInput from "./hex-input.vue";
import draggable from "vuedraggable";
import { DialogPlugin, MessagePlugin } from "tdesign-vue-next";

const emit = defineEmits<ColorPickerEmit>();
const pickerRef = ref<PickerExpose>();
const draggableRef = ref<typeof draggable>();
const colorStore = useColorStore();

onMounted(() => {
  colorStore.resetSelectColorList();
});

const onHexInputChangeHandler = (item: HexColorString) => {
  pickerRef.value?.setColor(item);
  emit("on-change", [...colorStore.selectColorList]);
};

const onColorCellClickHandler = (item: HexColorString, index: number) => {
  colorStore.selectedIndex = index;
  pickerRef.value?.setColor(item);
};

const onColorCellDeleteHandler = (item: HexColorString, index: number) => {
  colorStore.pullSelectColorListAt(index);
  emit("on-change", [...colorStore.selectColorList]);
};

const onAddColorClickHandler = () => {
  if (colorStore.selectColorList.length >= 50) {
    MessagePlugin.warning({ content: "色彩数量超出阈值", placement: "bottom" });
    return;
  }

  colorStore.addSelectColorList();
  emit("on-change", [...colorStore.selectColorList]);

  nextTick(() => {
    const ulElement = draggableRef.value?.$el as HTMLUListElement;
    if (ulElement) {
      ulElement.scrollTo(0, ulElement.scrollHeight);
    }
  });
};

const onResetClickHandler = () => {
  colorStore.resetSelectColorList();
  emit("on-change", [...colorStore.selectColorList]);
};

const onDraggableChangeHandler = () => {
  emit("on-change", [...colorStore.selectColorList]);
};

const onPickerChangeHandler = () => {
  emit("on-change", [...colorStore.selectColorList]);
};

const onSaveColorsClickHandler = () => {
  colorStore.setColorsToCacheList();
  MessagePlugin.success({ content: "已加入色彩列表", placement: "bottom" });
};

const onColorQuickSlotSelectHandler = (item: GradientColorItem) => {
  if (colorStore.selectColorList === item.colors) {
    return;
  }
  colorStore.setSelectColor(item.colors);
  colorStore.selectedIndex = 0;
  MessagePlugin.success({ content: "已应用此渐变色", placement: "bottom" });
  emit("on-change", [...colorStore.selectColorList]);
};

const onColorQuickSlotRightClickHandler = (event: PointerEvent, item: GradientColorItem, index: number) => {
  event.preventDefault();
  const dialogNode = DialogPlugin.confirm({
    header: "是否删除此渐变色？",
    onConfirm: () => {
      colorStore.pullCacheColorListAt(index);
      MessagePlugin.success({ content: "已删除此渐变色", placement: "bottom" });
      dialogNode.hide();
    },
  });
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
  .color-picker-header {
    width: 100%;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid #d4d7de;
    display: flex;
    flex-direction: column;
  }
  .color-picker-footer {
    display: flex;
    align-items: center;
    .color-setting {
      width: 0;
      flex: 1;
      margin-right: 20px;
      .color-cube-box {
        flex-wrap: nowrap;
        overflow-y: auto;
        padding: 4px;
        justify-content: flex-start;
        @include custom-scrollbar();
        &:deep(.color-cube) {
          margin-bottom: 0 !important;
        }
      }
    }
    .list-setting {
      margin-left: auto;
      flex-shrink: 0;
    }
  }
}

.color-list {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  @include custom-scrollbar();
  .color-cell {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px 10px 10px 20px;
    @include flex-center;
    transition: all 0.3s;
    border: 1px solid transparent;
    position: relative;
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
      width: 35px;
      height: 35px;
      background-color: var(--color-hex);
      border-radius: 5px;
      cursor: pointer;
      margin-right: 20px;
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
      margin-left: auto;
      font-weight: 700;
      font-size: 30px;
      padding-right: 5px;
      transition: color 0.3s;
      user-select: none;
      &:hover {
        color: #17233d;
      }
    }
  }
}
</style>
