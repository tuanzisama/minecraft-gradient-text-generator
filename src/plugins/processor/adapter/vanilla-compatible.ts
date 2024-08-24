import { CharacterBuilder, TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class VanillaCompatibleAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  processor(chunk: Chunk): string {
    const textBuilder = new TextBuilder();
    textBuilder.withFormat(chunk.format?.bold, this.format.bold);
    textBuilder.withFormat(chunk.format?.italic, this.format.italic);
    textBuilder.withFormat(chunk.format?.underlined, this.format.underlined);
    textBuilder.withFormat(chunk.format?.strikethrough, this.format.strikethrough);

    chunk.tags.forEach((tag) => {
      let color = tag.color as string | null;

      if (color !== null) {
        color = (color as HexColorString)
          .replace("#", "")
          .split("")
          .reduce((acc, char) => `${acc}${this.vanillaCharCode}${char}`, "") as string;
      }

      textBuilder.appendCharacter(new CharacterBuilder(tag.character).withColor(color, `${this.vanillaCharCode}x{color}`));
    });

    return textBuilder.build();
  }
}

export const VanillaCompatibleAdapter: GradientProcessorConstructor = VanillaCompatibleAdapterClazz;
