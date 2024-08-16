import { genColorGradients, getTextShadowHex } from "@/utils/color";

export abstract class GradientProcessor<T = string> {
  protected tagChunk: RichTagChunk;
  protected colors: HexColorString[];
  protected options?: GradientProcessAdapterOptions;
  protected gradientColors: HexColorString[];
  protected vanillaCharCode: string;
  private className: string;

  constructor(tagChunk: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    this.tagChunk = tagChunk;
    this.colors = colors;
    this.options = options;
    this.gradientColors = genColorGradients(this.colors, this.rawTextWithoutSpace.length);
    this.vanillaCharCode = this.options?.vanilla?.charCode ?? "&";
    this.className = this.constructor.name;
  }

  public get name(): string {
    return this.className;
  }

  public get tags(): RichTagChunk {
    return this.tagChunk;
  }

  public get format(): FormatPresets {
    return {
      bold: `${this.vanillaCharCode}l`,
      italic: `${this.vanillaCharCode}o`,
      underlined: `${this.vanillaCharCode}n`,
      strikethrough: `${this.vanillaCharCode}m`,
      obfuscated: `${this.vanillaCharCode}k`,
      reset: `${this.vanillaCharCode}r`,
    };
  }

  public get rawText(): string {
    return this.tagChunk.reduce((prevChunk, chunk, index, list) => {
      const enterCode = index !== list.length - 1 ? "\n" : "";
      return prevChunk.concat(chunk.reduce((prev, tag) => `${prev}${tag.text}${enterCode}`, ""));
    }, "");
  }

  public get rawTextWithoutSpace(): string {
    return this.rawText.replace(/\t|\s|\r|\n/g, "");
  }

  /**
   * 处理器
   */
  abstract processor(tag: RichTag): T;

  public chunker(): FlattenTag[][][] {
    let startIndex = 0;

    return this.tagChunk.reduce<FlattenTag[][][]>((acc, chapter) => {
      // chapter
      const result = chapter.map<FlattenTag[]>((richTag) => {
        const length = richTag.text.replace(/\t|\s|\r|\n/g, "").length;
        const tagColors = this.gradientColors.slice(startIndex, startIndex + length);
        startIndex = startIndex + length;

        let index = -1;
        const insideTag = richTag.text.split("").map((char) => {
          if (char.trim() !== "") index += 1;

          const tag: FlattenTag = { char, color: char.trim() === "" ? null : (tagColors?.[index] as HexColorString) };
          if (richTag.format) tag.format = richTag.format;

          return tag;
        });

        return insideTag;
      });

      return acc.concat([result]);
    }, []);
  }

  public generate(): T[][] {
    let startIndex = 0;
    return this.tagChunk.map<T[]>((chunk) => {
      const result = chunk.map<T>((tag) => {
        const length = tag.text.replace(/\t|\s|\r|\n/g, "").length;
        const tagColors = this.gradientColors.slice(startIndex, startIndex + length);
        startIndex = startIndex + length;
        tag.colors = tagColors;
        return this.processor(tag);
      });
      return result;
    });
  }

  /**
   * 生成 Minecraft 格式
   */
  public generateAsString(): string {
    const result = this.generate();
    return result.reduce((acc, cur, index, list) => {
      if (index === list.length - 1) {
        return acc + cur.join("");
      }
      return acc + cur + "\n";
    }, "");
  }

  public generateAsHTML(): string {
    let startIndex = 0;
    const doc = document.createElement("p");
    this.tagChunk.forEach((chunk) => {
      const chapterEl = document.createElement("p");

      chunk.forEach((tag) => {
        const length = tag.text.replace(/\t|\s|\r|\n/g, "").length;
        const tagColors = this.gradientColors.slice(startIndex, startIndex + length);
        startIndex = startIndex + length;

        let colorIndex = 0;

        tag.text.split("").forEach((char) => {
          const spanEl = document.createElement("span");
          // class="is-bold is-italic is-underlined is-strikethrough" style="--text-color: #55ffa4; --text-shadow-color: #156a3d;"
          if (char.trim() !== "") {
            tag.format?.bold && spanEl.classList.add("is-bold");
            tag.format?.italic && spanEl.classList.add("is-italic");
            tag.format?.underlined && spanEl.classList.add("is-underlined");
            tag.format?.strikethrough && spanEl.classList.add("is-strikethrough");

            const color = tagColors[colorIndex];
            spanEl.style.setProperty("--text-color", color);
            spanEl.style.setProperty("--text-shadow-color", getTextShadowHex(color));
            colorIndex += 1;
          }
          spanEl.textContent = char;
          chapterEl.append(spanEl);
        });

        doc.append(chapterEl);
      }, "");
    }, "");

    return doc.innerHTML;
  }
}

export interface GradientProcessorConstructor<T = string> {
  new (text: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions): GradientProcessor<T>;
}
