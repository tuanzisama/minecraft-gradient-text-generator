import { TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { genColorGradients } from "@/utils/color";

/**
 * TabooLib Gradient
 *
 * @see https://taboolib.feishu.cn/wiki/Gp8ywJfMEi7UIgkUFLZc1mi5nvh
 * @example [||||||||||||||||||||](gradient=#f6d365,#fda085)
 */
class TabooLibGradientAdapterClazz extends GradientProcessor {
  private simplifyColors: HexColorString[] = [];

  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);

    if (options?.processSimplify) {
      this.simplifyColors = genColorGradients(colors, this.chunkSize);
    }
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

  processor(chunk: Chunk, chunkIndex: number): string {
    const textBuilder = new TextBuilder();
    textBuilder.withFormat(chunk.format?.bold, this.format.bold);
    textBuilder.withFormat(chunk.format?.italic, this.format.italic);
    textBuilder.withFormat(chunk.format?.underlined, this.format.underlined);
    textBuilder.withFormat(chunk.format?.strikethrough, this.format.strikethrough);

    let pcolors: HexColorString[] = [];
    const texts: string[] = [];
    
    if (this.options?.processSimplify) {
      pcolors = [
        this.simplifyColors[chunkIndex],
        this.simplifyColors[chunkIndex + 1] || this.simplifyColors[0]
      ];

      chunk.tags.forEach((tag) => {
        texts.push(tag.character);
      });
    } else {
      chunk.tags.forEach((tag) => {
        if (tag.color !== null) {
          pcolors.push(tag.color);
        }
        texts.push(tag.character);
      });
    }

    const formats = textBuilder.availableFormats.length === 0 ? "" : ";" + textBuilder.availableFormats.join(";");

    return `[${texts.join("")}](gradient=${pcolors.join(",")}${formats})`;
  }
}

export const TabooLibGradientAdapter: GradientProcessorConstructor = TabooLibGradientAdapterClazz;
