import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class CSVAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  processor(tag: RichTag): string {
    let index = 0;
    const result = tag.text.split("").map((char) => {
      let color: FormatExpression = "";
      if (char.trim() !== "") {
        color = tag.colors?.[index] ?? "";
        index += 1;
      }

      const bold = !!tag.format?.bold;
      const italic = !!tag.format?.italic;
      const underlined = !!tag.format?.underlined;
      const strikethrough = !!tag.format?.strikethrough;

      return [color, char, bold, italic, underlined, strikethrough].join(",");
    });

    return result.join("\n");
  }

  override generateAsString(): string {
    return this.generate().reduce((acc, cur) => {
      return `${acc}${cur.join("\n")}\n`;
    }, "color,char,bold,italic,underlined,strikethrough\n");
  }
}

export const CSVAdapter: GradientProcessorConstructor = CSVAdapterClazz;
