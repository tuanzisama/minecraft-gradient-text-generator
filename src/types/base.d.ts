declare module "@editorjs/underline";
declare module "@sotaproject/strikethrough";

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

interface GradientProcessAdapterOptions {
  vanilla?: {
    charCode: "&" | "§";
  };
}

type Formats = "bold" | "italic" | "underlined" | "strikethrough";
type RichFormats = "reset" | "obfuscated";
type FormatPresets = Record<Formats | RichFormats, FormatExpression>;
type FormatExpression = string | [string, string];

interface RichTag {
  text: string;
  /**
   * Each color is character of the `text` field.
   * **ignore empty space.**
   */
  colors?: HexColorString[];
  format?: {
    [x in Formats]: boolean;
  };
}

type RichTagChunk = RichTag[][];

interface GradientPresetsRecord extends BaseGradientPresets {
  createTime: Date | null;
  isLocked?: boolean;
}

interface FlattenTag {
  tags: {
    char: string;
    /**
     * This value may be null because it is a space.
     */
    color: HexColorString | null;
  }[];
  format?: RichTag["format"];
}

interface BaseGradientPresets {
  name: string;
  colors: HexColorString[];
}
