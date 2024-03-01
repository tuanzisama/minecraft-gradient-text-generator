import mitt from "mitt";

const emitter = mitt<MittEvents>();

export const useEventBus = () => emitter;

type MittEvents = {
  "generate:invoke": { text?: string; colors?: HexColorString[] };
  "generate:change": null;
};
