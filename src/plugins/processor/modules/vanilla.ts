import { GradientProcessor, GradientProcessorConstructor } from "../processor-helper";

class VanillaProcessorClazz extends GradientProcessor {
  private charCode: string;
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
    this.charCode = this.options?.vanilla?.charCode ?? "&";
  }

  get template(): string {
    return `${this.charCode}{color}{char}`;
  }
}

export const VanillaProcessor: GradientProcessorConstructor = VanillaProcessorClazz;
