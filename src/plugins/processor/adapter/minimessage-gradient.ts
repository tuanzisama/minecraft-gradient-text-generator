import { CharacterBuilder, TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { genColorGradients } from "@/utils/color";

class MiniMessageGradientAdapterClazz extends GradientProcessor {
  private simplifyColors: HexColorString[] = [];

  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);

    if (options?.processSimplify) {
      if (colors.length === 2 && this.chunkSize === 1) {
        this.simplifyColors = colors;
      } else {
        this.simplifyColors = genColorGradients(colors, this.chunkSize);
      }
    }
  }

  override get format(): FormatPresets {
    return {
      bold: ["<b>", "</b>"],
      italic: ["<i>", "</i>"],
      underlined: ["<u>", "</u>"],
      strikethrough: ["<st>", "</st>"],
      obfuscated: ["<obf>", "</obf>"],
      reset: ["<r>", "</r>"],
    };
  }

  processor(chunk: Chunk, chunkIndex: number): string {
    const textBuilder = new TextBuilder();
    textBuilder.withFormat(chunk.format?.bold, this.format.bold);
    textBuilder.withFormat(chunk.format?.italic, this.format.italic);
    textBuilder.withFormat(chunk.format?.underlined, this.format.underlined);
    textBuilder.withFormat(chunk.format?.strikethrough, this.format.strikethrough);
    textBuilder.withFormat(chunk.format?.obfuscated, this.format.obfuscated);

    let pcolors: HexColorString[] = [];
    const texts: string[] = [];

    if (this.options?.processSimplify) {
      pcolors = [this.simplifyColors[chunkIndex], this.simplifyColors[chunkIndex + 1] || this.simplifyColors[0]];

      console.info(this.simplifyColors, pcolors);
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

    const characterBuilder = new CharacterBuilder(texts.join(""));

    if (pcolors.length === 1) {
      textBuilder.appendCharacter(characterBuilder.withColor(pcolors.join(":"), `<{color}>`));
      return textBuilder.build();
    }

    textBuilder.appendCharacter(characterBuilder);
    return `<gradient:${pcolors.join(":")}>${textBuilder.build()}</gradient>`;
  }
}

export const MiniMessageGradientAdapter: GradientProcessorConstructor = MiniMessageGradientAdapterClazz;
