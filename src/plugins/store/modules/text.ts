import { defineStore } from "pinia";
import { GradientProcessor } from "@/plugins/processor/processor-core";

export interface TextStoreState {
  /**
   * 适用于渲染页面
   */
  adapter: GradientProcessor | null;
}

export const useTextStore = defineStore("text", {
  state: (): TextStoreState => ({
    adapter: null,
  }),
  getters: {},
  persist: {
    paths: [],
  },
});
