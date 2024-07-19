import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { CharacterBuilder, TextBuilder } from "../builder/text";

class MineDownAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  override get format(): FormatPresets {
    return {
      bold: ["**", "**"],
      italic: ["##", "##"],
      underlined: ["__", "__"],
      strikethrough: ["~~", "~~"],
      obfuscated: ["??", "??"],
      reset: `${this.vanillaCharCode}r`,
    };
  }

  processor(tag: RichTag): string {
    const textBuilder = new TextBuilder();
    textBuilder.withFormat(tag.format?.bold, this.format.bold);
    textBuilder.withFormat(tag.format?.italic, this.format.italic);
    textBuilder.withFormat(tag.format?.underlined, this.format.underlined);
    textBuilder.withFormat(tag.format?.strikethrough, this.format.strikethrough);

    let index = 0;
    tag.text.split("").forEach((char) => {
      let color = "";
      if (char.trim() !== "") {
        color = `&${tag.colors?.[index]}&`;
        index += 1;
      }

      textBuilder.appendCharacter(new CharacterBuilder(char).withColor(color));
    });

    return textBuilder.build();
  }
}

export const MineDownAdapter: GradientProcessorConstructor = MineDownAdapterClazz;
