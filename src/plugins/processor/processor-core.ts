import { genColorGradients } from "@/utils/util";
import { parseHTMLTemplate, parseTemplate, parseTemplateToHTML } from "./utils/parser";

export abstract class GradientProcessor {
  protected text: string;
  protected colors: HexColorString[];
  protected options?: GradientProcessorOptions;
  protected gradientColors: HexColorString[];

  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    this.text = text;
    this.colors = colors;
    this.options = options;
    this.gradientColors = genColorGradients(this.colors, this.splitText.length);
  }

  get splitText(): string[] {
    const $text = this.options?.clearWhiteSpace ? this.text.replace(/\t|\s|\r|\n/g, "") : this.text;
    return $text.split("");
  }

  abstract get template(): string;

  getResult(): GradientProcessorResultItem[] {
    const colors = this.gradientColors;
    return this.splitText.map((char, index) => {
      return { color: colors[index], char };
    });
  }

  /**
   * 获取结果
   * @example <span>&#FFFFFF文</span>
   */
  getResultByText(): string {
    return this.getResult()
      .map((item) => parseTemplate(this.template, item.char, item.color))
      .join("");
  }

  /**
   * 获取结果
   * 通常用作预览
   * @example <span>&#FFFFFF文</span>
   */
  getResultByHTML(): string {
    return this.getResult()
      .map((item) => parseHTMLTemplate(item.char, item.color))
      .join("");
  }

  /**
   * 获取元结果 HTML 类型
   * @example &#FFFFFF文
   */
  getRawResultByHTML(): string {
    return this.getResult()
      .map((item) => parseTemplateToHTML(parseTemplate(this.template, item.char, item.color)))
      .join("");
  }
}

export interface GradientProcessorConstructor {
  new (text: string, colors: HexColorString[], options?: GradientProcessorOptions): GradientProcessor;
}

export interface GradientProcessorResultItem {
  color: HexColorString;
  char: string;
}
