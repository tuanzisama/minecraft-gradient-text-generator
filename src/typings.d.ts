/**
 * Representation of color in Hex format.
 */
type HexColorString = `#${string}`;
/**
 * Representation of color in HSL (hue, saturation, value) format.
 */
type HslColor = Record<"h" | "s" | "l", number>;

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
  format?: {
    bold: boolean;
    italic: boolean;
    underlined: boolean;
    strikethrough: boolean;
  };
  /**
   * 移除空格/换行/制表符
   */
  clearWhiteSpace?: boolean;
}
