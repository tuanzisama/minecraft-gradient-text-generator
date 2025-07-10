import { CharacterBuilder, TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

/**
 * TabooLib Gradient
 *
 * @see https://taboolib.feishu.cn/wiki/Gp8ywJfMEi7UIgkUFLZc1mi5nvh
 * @example [||||||||||||||||||||](gradient=#f6d365,#fda085)
 */
class TabooLibGradientAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  override get format(): FormatPresets {
    return {
      bold: "b",
      italic: "i",
      underlined: "u",
      strikethrough: "s",
      obfuscated: "o",
      reset: "r", // Probably an incorrect value.
    };
  }

  processor(chunk: Chunk): string {
    const textBuilder = new TextBuilder();
    textBuilder.withFormat(chunk.format?.bold, this.format.bold);
    textBuilder.withFormat(chunk.format?.italic, this.format.italic);
    textBuilder.withFormat(chunk.format?.underlined, this.format.underlined);
    textBuilder.withFormat(chunk.format?.strikethrough, this.format.strikethrough);

    const colors: HexColorString[] = [];
    const texts: string[] = [];

    chunk.tags.forEach((tag) => {
      if (tag.color !== null) {
        colors.push(tag.color);
      }
      texts.push(tag.character);
    });

    const formats = textBuilder.availableFormats.length === 0 ? "" : ";" + textBuilder.availableFormats.join(";");

    return `[${texts.join("")}](gradient=${colors.join(",")}${formats})`;
  }
}

export const TabooLibGradientAdapter: GradientProcessorConstructor = TabooLibGradientAdapterClazz;
