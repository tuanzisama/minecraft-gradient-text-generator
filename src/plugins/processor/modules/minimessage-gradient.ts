import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";
import { parseFullTemplate, parseTemplateToHTML } from "../utils/parser";

class MiniMessageGradientProcessorClazz extends GradientProcessor {
  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    super(text, colors, options);
  }

  get template(): string {
    return "<gradient:{colors}>{text}</gradient>";
  }

  /**
   * 获取结果
   * @example <span>&#FFFFFF文</span>
   */
  getResultByText(): string {
    return parseFullTemplate(this.template, this.text, this.colors, ":");
  }

  /**
   * 获取元结果 HTML 类型
   * @example &#FFFFFF文
   */
  getRawResultByHTML(): string {
    return parseTemplateToHTML(this.getResultByText());
  }
}

export const MiniMessageGradientProcessor: GradientProcessorConstructor = MiniMessageGradientProcessorClazz;
