import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class VanillaProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `${this.vanillaCharCode}{color}{bold}{italic}{underlined}{strikethrough}{char}`;
  }
}

export const VanillaProcessor: GradientProcessorConstructor = VanillaProcessorClazz;
