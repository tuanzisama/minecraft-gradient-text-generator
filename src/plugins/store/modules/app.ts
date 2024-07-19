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
  }),
  getters: {
    usingAdapter(state) {
      return adapterMap.get(state.setting.usingAdapterKey);
    },
  },
  persist: {
    paths: ["setting"],
  },
});
