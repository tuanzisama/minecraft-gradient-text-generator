import { FormatParams, parseTemplate, parseTemplateToHTML } from "../utils/parser";
import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class VanillaCompatibleProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `${this.vanillaCharCode}x{color}{bold}{italic}{underlined}{strikethrough}{char}`;
  }

  override charProcessor(char: string, color: HexColorString, template: string, format?: FormatParams): string {
    const colorSplit = color
      .slice(1)
      .split("")
      .reduce((acc, cur) => `${acc}${this.vanillaCharCode}${cur}`, "");
    return parseTemplate(template, char, colorSplit, format);
  }
}

export const VanillaCompatibleProcessor: GradientProcessorConstructor = VanillaCompatibleProcessorClazz;
