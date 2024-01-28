import { genColorGradients, getTextShadowHex } from "@/utils/util";
import { FormatParams, assertReplace, parseFullyTemplate, parseHTMLTemplate, parseTemplate, parseTemplateToHTML } from "./utils/parser";

export abstract class GradientProcessor {
  protected text: string;
  protected colors: HexColorString[];
  protected options?: GradientProcessorOptions;
  protected gradientColors: HexColorString[];
  protected vanillaCharCode: string;
  private className: string;

  constructor(text: string, colors: HexColorString[], options?: GradientProcessorOptions) {
    this.text = text;
    this.colors = colors;
    this.options = options;
    this.gradientColors = genColorGradients(this.colors, this.splitText.length);
    this.vanillaCharCode = this.options?.vanilla?.charCode ?? "&";
    this.className = this.constructor.name
  }

  get name(): string {
    return this.className;
  }

  get splitText(): string[] {
    const $text = this.options?.clearWhiteSpace ? this.text.replace(/\t|\s|\r|\n/g, "") : this.text;
    return $text.split("");
  }

  /**
   * 单字个体模板
   */
  abstract get template(): string;

  /**
   * 联合模板
   *
   * {template}: template#get
   */
  get fullyTemplate(): string {
    return "{template}";
  }

  get format(): FormatParams {
    return {
      bold: `${this.vanillaCharCode}l`,
      italic: `${this.vanillaCharCode}o`,
      underlined: `${this.vanillaCharCode}n`,
      strikethrough: `${this.vanillaCharCode}m`,
    };
  }

  /**
   * 根据配置处理模板
   * 在处理模板时，应当使用此方法
   *
   * @returns 断言处理后的模板
   */
  protected computeTemplate(): string {
    let _template = this.template;
    _template = assertReplace(!this.options?.format?.bold, _template, /{bold}|{\/bold}/g);
    _template = assertReplace(!this.options?.format?.italic, _template, /{italic}|{\/italic}/g);
    _template = assertReplace(!this.options?.format?.underlined, _template, /{underlined}|{\/underlined}/g);
    _template = assertReplace(!this.options?.format?.strikethrough, _template, /{strikethrough}|{\/strikethrough}/g);
    return _template;
  }

  /**
   * 根据配置处理模板
   * 在处理模板时，应当使用此方法
   *
   * @returns 断言处理后的模板
   */
  protected computeFullyTemplate(): string {
    let _template = this.fullyTemplate;
    _template = assertReplace(!this.options?.format?.bold, _template, /{bold}|{\/bold}/g);
    _template = assertReplace(!this.options?.format?.italic, _template, /{italic}|{\/italic}/g);
    _template = assertReplace(!this.options?.format?.underlined, _template, /{underlined}|{\/underlined}/g);
    _template = assertReplace(!this.options?.format?.strikethrough, _template, /{strikethrough}|{\/strikethrough}/g);
    return _template;
  }

  /**
   * 渐变结构
   */
  getResult(): ProcessorResultItem[] {
    const colors = this.gradientColors;
    return this.splitText.map((char, index) => {
      const color = colors[index];
      return {
        color,
        char,
        shadow: getTextShadowHex(color),
        format: this.options?.format ?? null,
      };
    });
  }

  /**
   * 单字个体处理器
   */
  protected charProcessor(char: string, color: HexColorString, template: string, format?: FormatParams): string {
    return parseTemplate(template, char, color, format);
  }

  public getResultText(): string {
    const result = this.getResult()
      .map((item) => this.charProcessor(item.char, item.color, this.computeTemplate(), this.format))
      .join("");
    return parseFullyTemplate(this.computeFullyTemplate(), result, { format: this.format });
  }

  /**
   * 获取元结果 HTML 类型
   * @example &#FFFFFF文
   */
  public getRenderHTML(): string {
    return parseTemplateToHTML(this.getResultText());
  }
}

export interface GradientProcessorConstructor {
  new (text: string, colors: HexColorString[], options?: GradientProcessorOptions): GradientProcessor;
}

export interface ProcessorResultItem {
  color: HexColorString;
  char: string;
  /**
   * 文字阴影
   */
  shadow: HexColorString;
  format: {
    bold: boolean;
    italic: boolean;
    underlined: boolean;
    strikethrough: boolean;
  } | null;
}
