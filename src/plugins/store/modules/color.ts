import { defineStore } from "pinia";
import { getGradientCss, randomColor } from "@/utils/color";

export interface ColorState {
  selectColorList: HexColorString[];
  selectedIndex: number;
  /**
   * @deprecated
   */
  cacheColorList: HexColorString[][];
  presetsColorList: GradientPresetsRecord[];
}

const PRESET_COLOR: GradientPresetsRecord = { name: "默认渐变色", colors: ["#d9afd9", "#97d9e1"], createTime: null };

export const useColorStore = defineStore("color", {
  state: (): ColorState => ({
    selectColorList: [],
    selectedIndex: 0,
    cacheColorList: [],
    presetsColorList: [],
  }),
  getters: {
    selectColorGradientCss: (state) => {
      return getGradientCss(state.selectColorList);
    },
    colorStopList: (state) => {
      return state.selectColorList.map((item, index, list) => {
        return { hex: item, pos: index === 0 ? 0 : (100 / (list.length - 1)) * index };
      });
    },
    /**
     * @deprecated
     */
    getCacheList: (state): GradientColorItem[] => {
      return state.cacheColorList.map((colors) => {
        return { label: `${colors.length}个颜色`, color: getGradientCss(colors), colors };
      }, [] as GradientColorItem[]);
    },
    getCurrentColor: (state): HexColorString => {
      return state.selectColorList[state.selectedIndex];
    },
  },
  actions: {
    resetSelectColorList() {
      this.selectColorList = [...PRESET_COLOR.colors];
    },
    pullSelectColorListAt(index: number) {
      if (this.selectColorList.length > 2) {
        if (index === this.selectColorList.length - 1) {
          this.selectedIndex = this.selectColorList.length - 2;
        }
        if (this.selectedIndex === this.selectColorList.length - 1) {
          this.selectedIndex = this.selectColorList.length - 2;
        }
        this.selectColorList.splice(index, 1);
      }
    },
    appendToSelectColorList(color?: HexColorString) {
      this.selectColorList.push(color ?? randomColor());
    },
    setSelectColorList(colors: HexColorString[]) {
      this.selectColorList = colors;
    },
    setSelectColorIndex(index: number) {
      this.selectedIndex = index;
    },
    setPresetsColorList(records: GradientPresetsRecord[]) {
      this.presetsColorList = records;
    },
    resetPresetsColorList() {
      this.presetsColorList = [Object.assign(PRESET_COLOR, { isLocked: true })];
    },
    pullPresetsColorListAt(index: number) {
      this.presetsColorList.splice(index, 1);
    },
    /**
     * @deprecated
     */
    pullCacheColorListAt(index: number) {
      this.cacheColorList.splice(index, 1);
    },
    /**
     * @deprecated
     */
    setCacheColorList(colors: HexColorString[]) {
      this.cacheColorList.push(colors);
    },
    /**
     * @deprecated
     */
    setColorsToCacheList(colors?: HexColorString[]) {
      this.cacheColorList.push([...(colors ?? this.selectColorList)]);
    },
    /**
     * @deprecated
     */
    resetCacheColorList() {
      this.cacheColorList = [];
    },
  },
  persist: {
    paths: ["presetsColorList"],
  },
});
