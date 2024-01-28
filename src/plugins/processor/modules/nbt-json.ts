import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { FormatParams } from "../utils/parser";
import { pickBy, isBoolean } from "lodash-es";

class NBTJSONProcessorClazz extends GradientProcessor {
  private charCode: string;
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
    this.charCode = this.options?.vanilla?.charCode ?? "&";
  }

  get template(): string {
    return `{\"text\":\"{char}\",\"color\":\"{color}\"}`;
  }

  override get format(): FormatParams {
    return {
      bold: "<bold>",
      italic: "<i>",
      underlined: "<u>",
      strikethrough: "<st>",
    };
  }

  override getResultText(): string {
    const list = super.getResult().map((item) => {
      const format = pickBy(item.format, (v) => v === true);
      return { text: item.char, color: item.color, ...format };
    });
    return JSON.stringify(list);
  }

  override getRenderHTML(): string {
    return this.getResultText();
  }
}

export const NBTJSONProcessor: GradientProcessorConstructor = NBTJSONProcessorClazz;
