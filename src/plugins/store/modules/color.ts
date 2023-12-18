import { defineStore } from "pinia";
import { includes } from "lodash";

export interface ColorState {
  selectColorList: HexColorString[];
  selectedIndex: number;
  cacheColorList: HexColorString[][];
}

export const useColorStore = defineStore("color", {
  state: (): ColorState => ({
    selectColorList: [],
    selectedIndex: 0,
    cacheColorList: [],
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
    getCacheList: (state): GradientColorItem[] => {
      return state.cacheColorList.map((colors) => {
        return { label: `${colors.length}个颜色`, color: getGradientCss(colors), colors };
      }, [] as GradientColorItem[]);
    },
  },
  actions: {
    resetSelectColorList() {
      this.selectColorList = ["#A8ABB2", "#303133"];
    },
    resetCacheColorList() {
      this.cacheColorList = [];
    },
    pullSelectColorListAt(index: number) {
      if (this.selectColorList.length > 2) {
        this.selectColorList.splice(index, 1);
      }
    },
    pullCacheColorListAt(index: number) {
      this.cacheColorList.splice(index, 1);
    },
    addSelectColorList(color?: HexColorString) {
      this.selectColorList.push(color ?? randomColor());
    },
    setCacheColorList(colors: HexColorString[]) {
      this.cacheColorList.push(colors);
    },
    setColorsToCacheList(colors?: HexColorString[]) {
      this.cacheColorList.push([...(colors ?? this.selectColorList)]);
    },
  },
  persist: {
    paths: ["cacheColorList"],
  },
});

function randomColor(): HexColorString {
  return ("#" + ((Math.random() * 0xffffff) << 0).toString(16)) as HexColorString;
}

function getGradientCss(list: string[]): GradientCSS {
  const stops = list.map((item, index, list) => `${item} ${((100 / list.length) * index).toFixed(2)}%`);
  return `linear-gradient(to right, ${stops.join(", ")})`;
}
