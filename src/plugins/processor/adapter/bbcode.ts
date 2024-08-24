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

  processor(chunk: Chunk): string {
    const textBuilder = new TextBuilder();
    textBuilder.withFormat(chunk.format?.bold, this.format.bold);
    textBuilder.withFormat(chunk.format?.italic, this.format.italic);
    textBuilder.withFormat(chunk.format?.underlined, this.format.underlined);
    textBuilder.withFormat(chunk.format?.strikethrough, this.format.strikethrough);

    chunk.tags.forEach((tag) => {
      textBuilder.appendCharacter(new CharacterBuilder(tag.character).withColor(tag.color, [`[color={color}]`, "[/color]"]));
    });

    return textBuilder.build();
  }
}

export const BBCodeAdapter: GradientProcessorConstructor = BBCodeAdapterClazz;
