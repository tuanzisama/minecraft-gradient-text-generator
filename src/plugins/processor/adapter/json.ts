import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class StringifiedNBTAdapterClazz extends GradientProcessor<SNBTRecord[]> {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  processor(tag: RichTag): JSONRecord[] {
    let index = 0;
    const list = tag.text.split("").map<JSONRecord>((char) => {
      let obj: Partial<JSONRecord> = { text: char, ...tag.format };
      if (char.trim() !== "") {
        obj.color = tag.colors?.[index] as HexColorString;
        index += 1;
      }
      return obj as JSONRecord;
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

export const StringifiedNBTAdapter: GradientProcessorConstructor<JSONRecord[]> = StringifiedNBTAdapterClazz;

export type JSONRecord = { text: string; color: string } & { [x in Formats]?: boolean };
