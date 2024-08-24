import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { CharacterBuilder, TextBuilder } from "../builder/text";

class MiniMessageAdapterClazz extends GradientProcessor {
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

    chunk.tags.forEach((tag) => {
      textBuilder.appendCharacter(new CharacterBuilder(tag.character).withColor(tag.color, `<{color}>`));
    });

    return textBuilder.build();
  }
}

export const MiniMessageAdapter: GradientProcessorConstructor = MiniMessageAdapterClazz;
