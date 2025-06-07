import {GradientProcessor, GradientProcessorConstructor} from "../processor-core";

class TerrariaAdapterClazz extends GradientProcessor {
    constructor(tags: RichTagChunk, colors: HexColorString[], options?: GradientProcessAdapterOptions) {
        super(tags, colors, options);
    }
    processor(chunk: Chunk): string {
        return chunk.tags
            .map(tag => tag.character === "" || !tag.color ? "" : `[c/${tag.color.replace(/^#/, "")}:${tag.character}]`)
            .join("");
    }
}
export const TerrariaAdapter: GradientProcessorConstructor = TerrariaAdapterClazz;
