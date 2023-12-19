import { parseTemplate, parseTemplateToHTML } from "../utils/parser";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class VanillaCompatibleProcessorClazz extends GradientProcessor {
  private charCode: string;
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
    this.charCode = this.options?.vanilla?.charCode ?? "&";
  }

  get template(): string {
    return `${this.charCode}x{color}{char}`;
  }

  override getResultByText(): string {
    const colors = this.gradientColors;

    return this.splitText
      .map((el, index) => {
        const colorSplit = colors[index]
          .slice(1)
          .split("")
          .reduce((acc, cur) => `${acc}${this.charCode}${cur}`, "");
        return parseTemplate(this.template, el, colorSplit);
      })
      .join("");
  }

  getRawResultByHTML(): string {
    const colors = this.gradientColors;
    return this.splitText
      .map((el, index) => {
        const colorSplit = colors[index]
          .slice(1)
          .split("")
          .reduce((acc, cur) => `${acc}${this.charCode}${cur}`, "");
        return parseTemplateToHTML(parseTemplate(this.template, el, colorSplit));
      })
      .join("");
  }
}

export const VanillaCompatibleProcessor: GradientProcessorConstructor = VanillaCompatibleProcessorClazz;
