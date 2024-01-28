import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { FormatParams } from "../utils/parser";

class MiniMessageProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `<{color}>{bold}{italic}{underlined}{strikethrough}{char}`;
  }

  override get format(): FormatParams {
    return {
      bold: "<b>",
      italic: "<i>",
      underlined: "<u>",
      strikethrough: "<st>",
    };
  }
}

export const MiniMessageProcessor: GradientProcessorConstructor = MiniMessageProcessorClazz;
