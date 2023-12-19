import { GradientProcessor, GradientProcessorConstructor } from "../processor-helper";

class MiniMessageProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `<{color}>{char}`;
  }
}

export const MiniMessageProcessor: GradientProcessorConstructor = MiniMessageProcessorClazz;
