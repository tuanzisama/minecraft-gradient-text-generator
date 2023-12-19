import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class JSONProcessorClazz extends GradientProcessor {
  private charCode: string;
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
    this.charCode = this.options?.vanilla?.charCode ?? "&";
  }

  get template(): string {
    return `{color: \"{color}\", char: \"{char}\"}`;
  }

  getResultByText(): string {
    return this.getRawResultByHTML();
  }

  getRawResultByHTML(): string {
    return JSON.stringify(super.getResult());
  }
}

export const JSONProcessor: GradientProcessorConstructor = JSONProcessorClazz;
