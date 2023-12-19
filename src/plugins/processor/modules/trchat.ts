import { GradientProcessor, GradientProcessorConstructor } from "../processor-helper";

class TrChatProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `&{{color}}{char}`;
  }
}

export const TrChatProcessor: GradientProcessorConstructor = TrChatProcessorClazz;
