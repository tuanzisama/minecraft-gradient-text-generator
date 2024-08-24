import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class CSVAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  processor(chunk: Chunk): string {
    const bold = !!chunk.format?.bold;
    const italic = !!chunk.format?.italic;
    const underlined = !!chunk.format?.underlined;
    const strikethrough = !!chunk.format?.strikethrough;

    const result = chunk.tags.map((tag) => {
      return [tag.color, tag.character, bold, italic, underlined, strikethrough].join(",");
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
