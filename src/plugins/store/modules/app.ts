import { defineStore } from "pinia";
import { KeyOfAdapterMap, adapterMap } from "../../../plugins/processor";

export interface AppStoreState {
  processTags: RichTagChunk;
  setting: {
    /**
     * 模拟模式
     */
    simulateMode: "default" | "chat";
    format: {
      /**
       * 字符模式
       */
      vanillaCharCode: "&" | "§";
    };
    usingAdapterKey: KeyOfAdapterMap;
  };
  previewPip: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): AppStoreState => ({
    processTags: [],
    setting: {
      simulateMode: "chat",
      format: {
        vanillaCharCode: "&",
      },
      usingAdapterKey: "vanilla",
    },
    previewPip: false,
  }),
  getters: {
    usingAdapter(state) {
      return adapterMap.get(state.setting.usingAdapterKey);
    },
  },
  actions: {
    setVanillaCharCode(code: AppStoreState["setting"]["format"]["vanillaCharCode"]) {
      this.setting.format.vanillaCharCode = code;
    },
    setSimulateMode(mode: AppStoreState["setting"]["simulateMode"]) {
      this.setting.simulateMode = mode;
    },
  },
  persist: {
    paths: ["setting"],
  },
});
