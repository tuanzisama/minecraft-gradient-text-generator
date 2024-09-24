import { CharacterBuilder, TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class MiniMessageGradientAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
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

    const characterBuilder = new CharacterBuilder(texts.join(""));

    if (colors.length === 1) {
      textBuilder.appendCharacter(characterBuilder.withColor(colors.join(":"), `<{color}>`));
      return textBuilder.build();
    }

    textBuilder.appendCharacter(characterBuilder);
    return `<gradient:${colors.join(":")}>${textBuilder.build()}</gradient>`;
  }
}

export const MiniMessageGradientAdapter: GradientProcessorConstructor = MiniMessageGradientAdapterClazz;
