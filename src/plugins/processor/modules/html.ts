import { GradientProcessor, GradientProcessorConstructor } from "../processor-helper";

class HTMLProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `<span style="color: {color}>{char}</span>`;
  }
}

export const HTMLProcessor: GradientProcessorConstructor = HTMLProcessorClazz;
