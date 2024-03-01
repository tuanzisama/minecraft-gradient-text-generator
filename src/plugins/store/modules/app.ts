import { defineStore } from "pinia";
import { KeyOfProcessorMap } from "../../../plugins/processor";

export interface AppStoreState {
  processText: string;
  setting: {
    /**
     * 移除空格/换行/制表符
     */
    clearWhiteSpace: boolean;
    /**
     * 模拟模式
     */
    simulateMode: "default" | "chat";
    format: {
      bold: boolean;
      italic: boolean;
      underlined: boolean;
      strikethrough: boolean;
      /**
       * 字符模式
       */
      vanillaCharCode: "&" | "§";
    };
    usingProcessor: KeyOfProcessorMap;
  };
}

export const useAppStore = defineStore("app", {
  state: (): AppStoreState => ({
    processText: "",
    setting: {
      clearWhiteSpace: true,
      simulateMode: "chat",
      format: {
        bold: false,
        italic: false,
        underlined: false,
        strikethrough: false,
        vanillaCharCode: "&",
      },
      usingProcessor: "vanilla",
    },
  }),
  actions: {
    switchSimulateMode() {
      this.setting.simulateMode = this.setting.simulateMode === "chat" ? "default" : "chat";
    },
    switchClearWhiteSpace() {
      this.setting.clearWhiteSpace = !this.setting.clearWhiteSpace;
    },
  },
  persist: {
    paths: ["setting"],
  },
});
