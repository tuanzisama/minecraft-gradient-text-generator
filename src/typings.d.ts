type HexColorString = `#${string}`;
type GradientCSS = `linear-gradient${string}`;

interface ColorStop {
  hex: HexColorString;
  stop: number;
}

interface ColorItem<T = HexColorString> {
  label?: string;
  color: T;
}

interface GradientColorItem extends ColorItem<GradientCSS> {
  colors: HexColorString[];
}

interface GradientProcessorOptions {
  vanilla?: {
    charCode: "&" | "§";
  };
  /**
   * 移除空格/换行/制表符
   */
  clearWhiteSpace?: boolean;
}
