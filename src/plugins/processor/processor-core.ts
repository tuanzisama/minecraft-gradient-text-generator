import { genColorGradients, getTextShadowHex } from "@/utils/color";
import { split } from "lodash-es";

export abstract class GradientProcessor<T = string> {
  protected richTagChunk: RichTagChunk;
  protected colors: HexColorString[];
  protected options?: GradientProcessAdapterOptions;
  protected gradientColors: HexColorString[];
  protected vanillaCharCode: string;
  private className: string;

  constructor(richTagChunk: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    this.richTagChunk = richTagChunk;
    this.colors = colors;
    this.options = options;
    this.gradientColors = genColorGradients(this.colors, this.rawTextWithoutSpace.length);
    this.vanillaCharCode = this.options?.vanilla?.charCode ?? "&";
    this.className = this.constructor.name;
  }

  public get name(): string {
    return this.className;
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
    return this.richTagChunk.reduce((prevChunk, chunk, index, list) => {
      const enterCode = index !== list.length - 1 ? "\n" : "";
      return prevChunk.concat(chunk.reduce((prev, tag) => `${prev}${tag.text}${enterCode}`, ""));
    }, "");
  }

  public get rawTextWithoutSpace(): string {
    return this.rawText.replace(/\t|\s|\r|\n/g, "");
  }

  /**
   * the processor.
   */
  abstract processor(tag: Chunk): T;

  public get chapters(): Chapters {
    let startIndex = 0;

    const chapters = this.richTagChunk.map<Chunks>((chapter) => {
      const chunks = chapter.map<Chunk>((richTag) => {
        const length = richTag.text.replace(/\t|\s|\r|\n/g, "").length;
        const tagColors = this.gradientColors.slice(startIndex, startIndex + length);
        startIndex = startIndex + length;

        let index = -1;
        const tags = split(richTag.text, "").map((character) => {
          if (character.trim() !== "") index += 1;

          const tag: Tag = {
            character,
            color: character.trim() === "" ? null : (tagColors?.[index] as HexColorString),
          };
          return tag;
        });

        const chunk = { tags } as Chunk;
        if (richTag.format) chunk.format = richTag.format;
        return chunk;
      });
      return chunks;
    });
    return chapters;
  }

  public generate(): T[][] {
    return this.chapters.map<T[]>((chunks) => {
      const result = chunks.map<T>((chunk) => {
        return this.processor(chunk);
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
    this.chapters.forEach((chunks) => {
      const chapterEl = document.createElement("p");

      chunks.forEach((chunk) => {
        chunk.tags.forEach((tag) => {
          const spanEl = document.createElement("span");
          // class="is-bold is-italic is-underlined is-strikethrough" style="--text-color: #55ffa4; --text-shadow-color: #156a3d;"
          if (tag.character.trim() !== "") {
            chunk.format?.bold && spanEl.classList.add("is-bold");
            chunk.format?.italic && spanEl.classList.add("is-italic");
            chunk.format?.underlined && spanEl.classList.add("is-underlined");
            chunk.format?.strikethrough && spanEl.classList.add("is-strikethrough");

            spanEl.style.setProperty("--text-color", tag.color);
            spanEl.style.setProperty("--text-shadow-color", getTextShadowHex(tag.color as HexColorString));
          }

          spanEl.textContent = tag.character;
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
