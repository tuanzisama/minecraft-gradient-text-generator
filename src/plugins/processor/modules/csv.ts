import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { parseTemplate, parseTemplateToHTML } from "../utils/parser";

class CSVProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `{color},{char}`;
  }

  getResultByText(): string {
    const list = super.getResult().map((item) => parseTemplate(this.template, item.char, item.color));
    return `color,character\n${list.join("\n")}`;
  }

  getRawResultByHTML(): string {
    return parseTemplateToHTML(this.getResultByText());
  }
}

export const CSVProcessor: GradientProcessorConstructor = CSVProcessorClazz;
