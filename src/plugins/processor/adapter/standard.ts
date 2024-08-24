import { CharacterBuilder, TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class StandardAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  processor(chunk: Chunk): string {
    const textBuilder = new TextBuilder();

    chunk.tags.forEach((tag) => {
      const characterBuilder = new CharacterBuilder(tag.character);

      if (tag.character !== "") {
        characterBuilder.withColor(tag.color as HexColorString);
      }

      textBuilder.appendCharacter(characterBuilder);
    });

    return textBuilder.build();
  }
}

export const StandardAdapter: GradientProcessorConstructor = StandardAdapterClazz;
