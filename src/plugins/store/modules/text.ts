import { defineStore } from "pinia";
import { GradientProcessor, ProcessorResultItem } from "@/plugins/processor/processor-core";
import { shallowRef } from "vue";

export interface TextStoreState {
  // /**
  //  * 预览体结构
  //  */
  // preview?: ProcessorResultItem[];
  // /**
  //  * 主要复制用
  //  */
  // text?: string;
  // /**
  //  * 适用于渲染页面
  //  */
  // renderHTML?: string;
  /**
   * 适用于渲染页面
   */
  processor?: GradientProcessor;
}

export const useTextStore = defineStore("text", {
  state: (): TextStoreState => ({}),
  getters: {
    preview: (state): ProcessorResultItem[] => {
      return state.processor?.getResult() ?? [];
    },
    text: (state): string => {
      return state.processor?.getResultText() ?? "";
    },
    renderHTML: (state): string => {
      return state.processor?.getRenderHTML() ?? "";
    },
  },
  persist: {
    paths: ["preview", "text", "renderHTML"],
  },
});
