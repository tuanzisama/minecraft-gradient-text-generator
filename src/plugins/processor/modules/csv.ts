import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { parseTemplate, parseTemplateToHTML } from "../utils/parser";

class CSVProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `{color},{char}`;
  }

  getRawResultByHTML(): string {
    const list = super.getResult().map((item) => parseTemplate(this.template, item.char, item.color));
    return parseTemplateToHTML(`color,character\n${list.join("\n")}`);
  }
}

export const CSVProcessor: GradientProcessorConstructor = CSVProcessorClazz;
