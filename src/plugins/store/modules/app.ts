import { defineStore } from "pinia";
import { KeyOfProcessorMap } from "../../../plugins/processor";

export interface AppStoreState {
  processText: string;
  setting: {
    /**
     * 字符模式
     */
    vanillaCharCode: "&" | "§";
    /**
     * 移除空格/换行/制表符
     */
    clearWhiteSpace: boolean;
    processor: KeyOfProcessorMap;
  };
}

export const useAppStore = defineStore("app", {
  state: (): AppStoreState => ({
    processText: "",
    setting: {
      vanillaCharCode: "&",
      clearWhiteSpace: true,
      processor: "vanilla",
    },
  }),
  persist: {
    paths: ["setting"],
  },
});
