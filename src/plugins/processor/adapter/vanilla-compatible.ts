import { CharacterBuilder, TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class VanillaCompatibleAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
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
        color = (tag.colors?.[index] ?? "")
          .replace("#", "")
          .split("")
          .reduce((acc, char) => `${acc}${this.vanillaCharCode}${char}`, "");
        index += 1;
      }

      textBuilder.appendCharacter(new CharacterBuilder(char).withColor("&x" + color));
    }, "");

    return textBuilder.build();
  }
}

export const VanillaCompatibleAdapter: GradientProcessorConstructor = VanillaCompatibleAdapterClazz;
