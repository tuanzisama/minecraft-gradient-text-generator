import { FormatParams, parseTemplate, parseTemplateToHTML } from "../utils/parser";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class MotdProcessorClazz extends GradientProcessor {
  private charCode: string;

  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
    this.charCode = "\\u00A7";
  }

  get template(): string {
    return `${this.charCode}x{color}{bold}{italic}{underlined}{strikethrough}{char}`;
  }

  override get format(): FormatParams {
    return {
      bold: `${this.charCode}l`,
      italic: `${this.charCode}o`,
      underlined: `${this.charCode}n`,
      strikethrough: `${this.charCode}m`,
    };
  }

  override getResultText(): string {
    const colors = this.gradientColors;

    return this.splitText
      .map((el, index) => {
        const colorSplit = colors[index]
          .slice(1)
          .split("")
          .reduce((acc, cur) => `${acc}${this.charCode}${cur}`, "");
        return parseTemplate(this.computeTemplate(), el, colorSplit, this.format);
      })
      .join("");
  }

  override getRenderHTML(): string {
    const colors = this.gradientColors;
    return this.splitText
      .map((el, index) => {
        const colorSplit = colors[index]
          .slice(1)
          .split("")
          .reduce((acc, cur) => `${acc}${this.charCode}${cur}`, "");
        return parseTemplateToHTML(parseTemplate(this.computeTemplate(), el, colorSplit, this.format));
      })
      .join("");
  }
}

export const MotdProcessor: GradientProcessorConstructor = MotdProcessorClazz;
