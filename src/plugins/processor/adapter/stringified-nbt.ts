import { GradientProcessor, GradientProcessorConstructor } from "../processor-core";

class StringifiedNBTAdapterClazz extends GradientProcessor<SNBTRecord[]> {
  constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
    super(tags, colors, options);
  }

  processor(chunk: Chunk): SNBTRecord[] {
    const list = chunk.tags.map<SNBTRecord>((tag) => {
      let obj: Partial<SNBTRecord> = { text: tag.character, ...chunk.format };
      if (tag.character.trim() !== "") {
        obj.color = tag.color as string;
      }

      return obj as SNBTRecord;
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
