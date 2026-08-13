import { CharacterBuilder, TextBuilder } from "../builder/text";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

/**
 * TabooLib (include TrChat/TrMenu or )
 *
 * @see https://taboolib.feishu.cn/wiki/Gp8ywJfMEi7UIgkUFLZc1mi5nvh
 * @see https://trchat.trixey.cc/guide/colors#hex%E9%A2%9C%E8%89%B2
 *
 * @example &{#FFFFFF}
 */
class TabooLibAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  processor(chunk: Chunk): string {
    const textBuilder = new TextBuilder();
    textBuilder.withFormat(chunk.format?.bold, this.format.bold);
    textBuilder.withFormat(chunk.format?.italic, this.format.italic);
    textBuilder.withFormat(chunk.format?.underlined, this.format.underlined);
    textBuilder.withFormat(chunk.format?.strikethrough, this.format.strikethrough);
    textBuilder.withFormat(chunk.format?.obfuscated, this.format.obfuscated);

    chunk.tags.forEach((tag) => {
      textBuilder.appendCharacter(new CharacterBuilder(tag.character).withColor(tag.color, `&{{color}}`));
    });

    return textBuilder.build();
  }
}

export const TabooLibAdapter: GradientProcessorConstructor = TabooLibAdapterClazz;
