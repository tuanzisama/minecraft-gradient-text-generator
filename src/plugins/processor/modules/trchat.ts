import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class TrChatProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `&{{color}}{bold}{italic}{underlined}{strikethrough}{char}`;
  }
}

export const TrChatProcessor: GradientProcessorConstructor = TrChatProcessorClazz;
