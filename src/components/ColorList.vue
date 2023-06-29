<template>
  <div class="color-container">
    <Poptip confirm title="是否删除所有颜色配置？" @on-ok="onDeleteAllHandler" placement="right" transfer>
      <div class="color-item is-delete">
        <div class="color-item--cube delete">
          <Icon type="md-trash" />
          <span>全部删除</span>
        </div>
      </div>
    </Poptip>
    <div class="color-item is-add">
      <div class="color-item--cube add">
        <Icon type="md-add" />
        <span>新增</span>
        <div class="color-picker">
          <ColorPicker size="large" recommend @on-change="onColorPickerChangeHandler" transfer-class-name="color-container__color-picker-popover" transfer />
        </div>
      </div>
    </div>
    <draggable v-model="privateValue" tag="ul" class="color-list">
      <template #item="{ element, index }">
        <Dropdown class="color-item" trigger="contextMenu" placement="right" transfer>
          <li class="color-item--cube" :style="`--cube-color: ${element}`">
            <span class="hex">{{ element }}</span>
            <section class="edit">
              <ColorPicker v-model="privateValue[index]" transfer-class-name="color-container__color-picker-popover" transfer />
            </section>
          </li>
          <template #list>
            <DropdownMenu>
              <DropdownItem style="color: #ed4014" @click="onDeleteColorHandler(index)">删除</DropdownItem>
            </DropdownMenu>
          </template>
        </Dropdown>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import { Message } from "view-ui-plus";
import { computed } from "vue";
import draggable from "vuedraggable";

const props = withDefaults(defineProps<ColorListProps>(), {
  modelValue: () => [],
});
const emit = defineEmits(["update:modelValue"]);

const privateValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const onDeleteColorHandler = (index: number) => {
  props.modelValue.splice(index, 1);
};

const onDeleteAllHandler = () => {
  Message.success("已删除所有颜色配置");
  emit("update:modelValue", []);
};

const onColorPickerChangeHandler = (val: string) => {
  if (props.modelValue.includes(val)) {
    Message.warning("已存在相同颜色");
    return;
  }
  props.modelValue.push(val.toUpperCase());
};
</script>
<script lang="ts">
interface ColorListProps {
  modelValue: string[];
}
</script>

<style lang="less" scoped>
@import url("../assets/styles/mixins.less");

.color-container {
  display: flex;
  flex-direction: column;
  max-height: 800px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  .custom-scrollbar();
  .color-list {
    display: flex;
    flex-direction: column;
    .ivu-poptip {
      width: 100%;
      &:deep(.ivu-poptip-rel) {
        width: 100%;
      }
    }
  }
}
.color-item {
  width: 200px;
  margin: 0 10px 16px 10px;
  &--cube {
    width: 100%;
    height: 60px;
    border: 1px dashed #dcdee2;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    background-color: #fff;
    cursor: default;
    &:hover {
      box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;
      .edit {
        opacity: 1;
      }
    }
    &::before {
      content: "";
      background-color: var(--cube-color);
      display: block;
      width: 10px;
      height: 100%;
    }
    .hex {
      color: #17233d;
      font-size: 20px;
      font-weight: 400;
      margin-left: 10px;
    }
    .edit {
      width: 60px;
      height: 100%;
      margin-left: auto;
      transition: all 0.3s;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 25px;
      cursor: pointer;
      &:deep(.ivu-color-picker) {
        .ivu-icon.ivu-icon-ios-arrow-down {
          display: none;
        }
        .ivu-input-icon-normal + .ivu-input {
          padding-right: 7px;
        }
        .ivu-color-picker-input {
          cursor: pointer;
        }
      }
    }
  }
  &.is-delete {
    user-select: none;
    .color-item--cube {
      height: 40px !important;
      background-color: #f56c6c;
      border: none;
      color: #fff;
      cursor: pointer;
      display: flex;
      justify-content: center;
      &::before {
        display: none;
      }
      .ivu-icon {
        margin-right: 5px;
      }
    }
  }
  &.is-add {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
    user-select: none;
    .color-item--cube {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 25px;
      color: #17233d;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      &::before {
        display: none;
      }
      .color-picker {
        margin-left: 20px;
      }
    }
  }
}
</style>
