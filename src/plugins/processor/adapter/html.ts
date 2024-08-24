import { CharacterBuilder, TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class HTMLAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  override get format(): FormatPresets {
    return {
      bold: ["<b>", "</b>"],
      italic: ["<i>", "</i>"],
      underlined: ["<u>", "</u>"],
      strikethrough: ["<s>", "</s>"],
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
      textBuilder.appendCharacter(
        new CharacterBuilder(tag.character.trim() === "" ? "&nbsp;" : tag.character).withColor(tag.color, [
          `<span style="color: {color};">`,
          "</span>",
        ])
      );
    });

    return textBuilder.build();
  }

  override generateAsString(): string {
    return this.generate().reduce((acc, cur) => {
      return `${acc}<p>${cur.join("")}</p>`;
    }, "");
  }
}

export const HTMLAdapter: GradientProcessorConstructor = HTMLAdapterClazz;
