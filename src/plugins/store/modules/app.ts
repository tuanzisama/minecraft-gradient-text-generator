import { defineStore } from "pinia";
import { KeyOfAdapterMap, adapterMap } from "../../../plugins/processor";

export interface AppStoreState {
  processTags: RichTagChunk;
  setting: {
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
  },
  persist: {
    paths: ["setting"],
  },
});
