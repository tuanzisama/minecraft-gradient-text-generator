import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class BBCodeProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `[color={color}]{char}[/color]`;
  }
}

export const BBCodeProcessor: GradientProcessorConstructor = BBCodeProcessorClazz;
