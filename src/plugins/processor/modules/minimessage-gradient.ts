import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { FormatParams, parseFullyTemplate } from "../utils/parser";

class MiniMessageGradientProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return "{char}";
  }

  override get fullyTemplate(): string {
    return "<gradient:{colors}>{bold}{italic}{underlined}{strikethrough}{template}</gradient>";
  }

  override get format(): FormatParams {
    return {
      bold: "<b>",
      italic: "<i>",
      underlined: "<u>",
      strikethrough: "<st>",
    };
  }

  override getResultText(): string {
    const result = this.getResult()
      .map((item) => this.charProcessor(item.char, item.color, this.computeTemplate(), this.format))
      .join("");
    return parseFullyTemplate(this.computeFullyTemplate(), result, { format: this.format, colors: { colors: this.colors, separator: ":" } });
  }
}

export const MiniMessageGradientProcessor: GradientProcessorConstructor = MiniMessageGradientProcessorClazz;
