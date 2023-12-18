import { defineStore } from "pinia";

export interface ColorState {
  selectColorList: HexColorString[];
  selectedIndex: number;
}

export const useColorStore = defineStore("color", {
  state: (): ColorState => ({
    selectColorList: [],
    selectedIndex: 0,
  }),
  getters: {
    getGradientCss: (state) => {
      const stops = state.selectColorList.map((item, index, list) => `${item} ${(100 / list.length) * index}%`);
      return `linear-gradient(to right, ${stops.join(", ")})`;
    },
    colorStopList: (state) => {
      return state.selectColorList.map((item, index, list) => {
        return { hex: item, pos: index === 0 ? 0 : (100 / (list.length - 1)) * index };
      });
    },
  },
  actions: {
    resetSelectColorList() {
      this.selectColorList = ["#A8ABB2", "#303133"];
    },
    pullColorListAt(index: number) {
      if (this.selectColorList.length > 2) {
        this.selectColorList.splice(index, 1);
      }
    },
    addSelectColorList(color?: HexColorString) {
      this.selectColorList.push(color ?? randomColor());
    },
  },
  persist: {
    paths: [],
  },
});

function randomColor(): HexColorString {
  return ("#" + ((Math.random() * 0xffffff) << 0).toString(16)) as HexColorString;
}
