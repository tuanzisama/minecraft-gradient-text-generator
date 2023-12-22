import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class NBTJSONProcessorClazz extends GradientProcessor {
  private charCode: string;
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
    this.charCode = this.options?.vanilla?.charCode ?? "&";
  }

  get template(): string {
    return `{\"text\":\"{char}\",\"color\":\"{color}\"}`;
  }

  getResultByText(): string {
    return this.getRawResultByHTML();
  }

  getRawResultByHTML(): string {
    const list = super.getResult().map((item) => {
      return { text: item.char, color: item.color };
    });
    return JSON.stringify(list);
  }
}

export const NBTJSONProcessor: GradientProcessorConstructor = NBTJSONProcessorClazz;
