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
      /**
       * 过程简化
       */
      processSimplify: boolean;
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
        processSimplify: false,
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
    setProcessSimplify(status: AppStoreState["setting"]['format']['processSimplify']) {
      this.setting.format.processSimplify = status;
    },
  },
  persist: {
    paths: ["setting"],
  },
});
