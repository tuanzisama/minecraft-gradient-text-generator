import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class StringifiedNBTAdapterClazz extends GradientProcessor<JSONRecord[]> {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  processor(chunk: Chunk): JSONRecord[] {
    const list = chunk.tags.map<JSONRecord>((tag) => {
      let obj: Partial<JSONRecord> = { text: tag.character, ...chunk.format };
      if (tag.character.trim() !== "") {
        obj.color = tag.color as string;
      }

      return obj as JSONRecord;
    });
    return list;
  }

  override generateAsString(): string {
    const result = this.generate().reduce((acc, cur, index, list) => {
      if (index === list.length - 1) return acc.concat(...cur);
      return acc.concat(...cur.concat([{ text: "\n", color: "" }]));
    }, [] as JSONRecord[]);
    return JSON.stringify(result);
  }
}

export const StringifiedNBTAdapter: GradientProcessorConstructor<JSONRecord[]> = StringifiedNBTAdapterClazz;

export type JSONRecord = { text: string; color: string } & { [x in Formats]?: boolean };
