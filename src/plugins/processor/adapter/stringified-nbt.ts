import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class StringifiedNBTAdapterClazz extends GradientProcessor<SNBTRecord[]> {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  override get format(): FormatPresets {
    return {
      bold: "<b>",
      italic: "<i>",
      underlined: "<u>",
      strikethrough: "<st>",
      obfuscated: "<obf>",
      reset: "<r>",
    };
  }

  processor(tag: RichTag): SNBTRecord[] {
    let index = 0;
    const list = tag.text.split("").map<SNBTRecord>((char) => {
      let color = "";
      if (char.trim() !== "") {
        color = `${this.vanillaCharCode}${tag.colors?.[index]}`;
        index += 1;
      }
      return { text: char, color, ...tag.format } as SNBTRecord;
    });
    return list;
  }

  override generateAsString(): string {
    const result = this.generate().reduce((acc, cur, index, list) => {
      if (index === list.length - 1) return acc.concat(...cur);
      return acc.concat(...cur.concat([{ text: "\n", color: "" }]));
    }, [] as SNBTRecord[]);
    return JSON.stringify(result);
  }
}

export const StringifiedNBTAdapter: GradientProcessorConstructor<SNBTRecord[]> = StringifiedNBTAdapterClazz;

export type SNBTRecord = { text: string; color: string } & { [x in Formats]?: boolean };
