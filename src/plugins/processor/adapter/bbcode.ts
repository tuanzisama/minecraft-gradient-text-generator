import { CharacterBuilder, TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class BBCodeAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  override get format(): FormatPresets {
    return {
      bold: ["[b]", "[/b]"],
      italic: ["[i]", "[/i]"],
      underlined: ["[u]", "[/u]"],
      strikethrough: ["[s]", "[/s]"],
      obfuscated: "",
      reset: "",
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
      let color: FormatExpression = "";
      if (char.trim() !== "") {
        color = [`[color=${tag.colors?.[index]}]`, "[/color]"];
        index += 1;
      }

      textBuilder.appendCharacter(new CharacterBuilder(char).withColor(color));
    });

    return textBuilder.build();
  }
}

export const BBCodeAdapter: GradientProcessorConstructor = BBCodeAdapterClazz;