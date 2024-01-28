import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { FormatParams } from "../utils/parser";

class BBCodeProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return `[color={color}]{char}[/color]`;
  }

  override get fullyTemplate(): string {
    return `{bold}{italic}{underlined}{strikethrough}{template}{/bold}{/italic}{/underlined}{/strikethrough}`;
  }

  override get format(): FormatParams {
    return {
      bold: ["[b]", "[/b]"],
      italic: ["[i]", "[/i]"],
      underlined: ["[u]", "[/u]"],
      strikethrough: ["[s]", "[/s]"],
    };
  }
}

export const BBCodeProcessor: GradientProcessorConstructor = BBCodeProcessorClazz;
