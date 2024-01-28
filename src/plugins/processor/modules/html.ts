import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { FormatParams, parseTemplate } from "../utils/parser";

class HTMLProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `<span style="color: {color};">{char}</span>`;
  }

  override get fullyTemplate(): string {
    return '<p style="{bold}{italic}{underlined}{strikethrough}">{template}</p>';
  }

  override get format(): FormatParams {
    return {
      bold: "font-weight: bold;",
      italic: "font-style: italic;",
      underlined: "text-decoration: underlined;",
      strikethrough: "text-decoration: line-through;",
    };
  }
}

export const HTMLProcessor: GradientProcessorConstructor = HTMLProcessorClazz;
