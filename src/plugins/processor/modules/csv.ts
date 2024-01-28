import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { parseTemplate, parseTemplateToHTML } from "../utils/parser";
import { forIn } from "lodash-es";

class CSVProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `{color},{char},{bold},{italic},{underlined},{strikethrough}`;
  }

  override getResultText(): string {
    const list = super.getResult().map((item) => {
      let result = parseTemplate(this.template, item.char, item.color);

      forIn(this.format, (value, key) => {
        result = result.replace(`{${key}}`, `${this.options?.format?.[key as keyof GradientProcessorOptions["format"]]}`);
      });
      return result;
    });
    return `color,character,bold,italic,underlined,strikethrough\n${list.join("\n")}`;
  }

  override getRenderHTML(): string {
    return parseTemplateToHTML(this.getResultText());
  }
}

export const CSVProcessor: GradientProcessorConstructor = CSVProcessorClazz;
