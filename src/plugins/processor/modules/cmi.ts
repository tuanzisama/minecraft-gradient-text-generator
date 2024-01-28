import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class CMIProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `{{color}}{bold}{italic}{underlined}{strikethrough}{char}`;
  }
}

export const CMIProcessor: GradientProcessorConstructor = CMIProcessorClazz;
