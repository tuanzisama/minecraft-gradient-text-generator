import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class StandardAdapterClazz extends GradientProcessor {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  processor(tag: RichTag): string {
    let index = 0;
    return tag.text.split("").reduce((acc, char) => {
      let color = "";
      if (char.trim() !== "") {
        color = tag.colors?.[index] ?? "";
        index += 1;
      }
      return `${acc}${color}${char}`;
    }, "");
  }
}

export const StandardAdapter: GradientProcessorConstructor = StandardAdapterClazz;
