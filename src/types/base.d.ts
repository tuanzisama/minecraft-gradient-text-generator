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

interface GradientPresetsRecord extends BaseGradientPresets {
  createTime: Date | null;
  isLocked?: boolean;
}

interface BaseGradientPresets {
  name: string;
  colors: HexColorString[];
}

type TagFormat = {
  [x in Formats]: boolean;
};

/**
 * Unprocessed tags.
 */
interface RichTag {
  text: string;
  format?: TagFormat;
}
type RichTagChunk = RichTag[][];

/**
 * Processed tags.
 * Tag > Chunk > Chapter
 */
interface Tag {
  character: string;
  /**
   * This value may be null because it is a space.
   */
  color: HexColorString | null;
}

type Chunk = {
  tags: Tag[];
  /**
   * All tags will be inherit this formats.
   */
  format: TagFormat;
};

type Chunks = Chunk[];
type Chapters = Chunks[];
