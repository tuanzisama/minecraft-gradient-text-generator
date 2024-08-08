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

  processor(tag: RichTag): string {
    const textBuilder = new TextBuilder();
    textBuilder.withFormat(tag.format?.bold, this.format.bold);
    textBuilder.withFormat(tag.format?.italic, this.format.italic);
    textBuilder.withFormat(tag.format?.underlined, this.format.underlined);
    textBuilder.withFormat(tag.format?.strikethrough, this.format.strikethrough);

    const colors = tag.colors?.join(":") ?? "";

    const characterBuilder = new CharacterBuilder(tag.text);

    if (tag.colors?.length === 1) {
      textBuilder.appendCharacter(characterBuilder.withColor(`<${colors}>`));
      return textBuilder.build();
    }

    textBuilder.appendCharacter(characterBuilder);
    return `<gradient:${colors}>${textBuilder.build()}</gradient>`;
  }
}

export const MiniMessageGradientAdapter: GradientProcessorConstructor = MiniMessageGradientAdapterClazz;
