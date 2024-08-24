import { CharacterBuilder, TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class MotdAdapterClazz extends GradientProcessor {
  private charCode: string;

  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
    this.charCode = "\\u00A7";
  }

  override get format(): FormatPresets {
    return {
      bold: `${this.charCode}l`,
      italic: `${this.charCode}o`,
      underlined: `${this.charCode}n`,
      strikethrough: `${this.charCode}m`,
      obfuscated: `${this.charCode}m`,
      reset: `${this.charCode}m`,
    };
  }

  processor(chunk: Chunk): string {
    const textBuilder = new TextBuilder();
    textBuilder.withFormat(chunk.format?.bold, this.format.bold);
    textBuilder.withFormat(chunk.format?.italic, this.format.italic);
    textBuilder.withFormat(chunk.format?.underlined, this.format.underlined);
    textBuilder.withFormat(chunk.format?.strikethrough, this.format.strikethrough);

    chunk.tags.forEach((tag) => {
      let color = tag.color as string | null;

      if (color !== null) {
        color = (color as HexColorString)
          .replace("#", "")
          .split("")
          .reduce((acc, char) => `${acc}${this.charCode}${char}`, "") as string;
      }

      textBuilder.appendCharacter(new CharacterBuilder(tag.character).withColor(color, `${this.charCode}x{color}`));
    });

    return textBuilder.build();
  }
}

export const MotdAdapter: GradientProcessorConstructor = MotdAdapterClazz;
