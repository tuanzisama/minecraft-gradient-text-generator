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

  processor(tag: RichTag): string {
    const textBuilder = new TextBuilder();
    textBuilder.withFormat(tag.format?.bold, this.format.bold);
    textBuilder.withFormat(tag.format?.italic, this.format.italic);
    textBuilder.withFormat(tag.format?.underlined, this.format.underlined);
    textBuilder.withFormat(tag.format?.strikethrough, this.format.strikethrough);

    let index = 0;
    tag.text.split("").forEach((char) => {
      let color = "";

      const charBuilder = new CharacterBuilder(char);
      if (char.trim() !== "") {
        color = (tag.colors?.[index] ?? "")
          .slice(1)
          .split("")
          .reduce((acc, cur) => `${acc}${this.charCode}${cur}`, "");
        index += 1;
        charBuilder.withColor(`${this.charCode}x${color}`);
      }
      textBuilder.appendCharacter(charBuilder);
    });

    return textBuilder.build();
  }
}

export const MotdAdapter: GradientProcessorConstructor = MotdAdapterClazz;
