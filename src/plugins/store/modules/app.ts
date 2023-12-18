import { defineStore } from "pinia";

export interface AppStoreState {
  processText: string;
  setting: {
    /**
     * 字符模式
     * 客户端发送使用&，服务端发送使用§
     */
    charMode: "&" | "§";
    /**
     * 兼容模式
     * 仅限服务器不支持&amp;&num;前缀发送Hex颜色
     */
    compatibleMode: boolean;
    /**
     * 移除空格
     * 移除空格/换行/制表符
     */
    clearSpaceCharacter: boolean;
  };
}

export const useAppStore = defineStore("app", {
  state: (): AppStoreState => ({
    processText: "",
    setting: {
      charMode: "&",
      compatibleMode: false,
      clearSpaceCharacter: true,
    },
  }),
  actions: {
    saveSetting(data: AppStoreState["setting"]) {
      this.setting.charMode = data.charMode;
      this.setting.compatibleMode = data.compatibleMode;
      this.setting.clearSpaceCharacter = data.clearSpaceCharacter;
    },
  },
  persist: {
    paths: ["setting"],
  },
});
