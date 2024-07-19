import mitt from "mitt";

const emitter = mitt<MittEvents>();

export const useEventBus = () => emitter;

type MittEvents = {
  "generate:invoke": { tags: RichTagChunk | null; colors?: HexColorString[] };
  "generate:change": null;
};
