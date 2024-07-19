import { defineStore } from "pinia";
import { GradientProcessor } from "@/plugins/processor/processor-core";

export interface TextStoreState {
  /**
   * 适用于渲染页面
   */
  adapter?: GradientProcessor;
}

export const useTextStore = defineStore("text", {
  state: (): TextStoreState => ({}),
  getters: {},
  persist: {
    paths: [],
  },
});
