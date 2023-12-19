import { VanillaProcessor } from "./modules/vanilla";
import { GradientProcessorConstructor } from "./processor-core";

import { VanillaCompatibleProcessor } from "./modules/vanilla-compatible";
import { MotdProcessor } from "./modules/motd";
import { BBCodeProcessor } from "./modules/bbcode";
import { HTMLProcessor } from "./modules/html";
import { MineDownProcessor } from "./modules/minedown";
import { CMIProcessor } from "./modules/cmi";
import { MiniMessageProcessor } from "./modules/minimessage";
import { TrChatProcessor } from "./modules/trchat";
import { JSONProcessor } from "./modules/json";
import { CSVProcessor } from "./modules/csv";
import { StandardProcessor } from "./modules/standard";

interface ProcessorMapValue {
  label: string;
  sample: string;
  processor: GradientProcessorConstructor;
}

export const processorMap = new Map<KeyOfProcessorMap, ProcessorMapValue>([
  ["vanilla", { label: "原版 (1.16+)", sample: "&#RRGGBB", processor: VanillaProcessor }],
  ["vanilla-compatible", { label: "原版(1.16+, 兼容)", sample: "&X&R&R&G&G&B&B", processor: VanillaCompatibleProcessor }],
  ["standard", { label: "标准", sample: "#RRGGBB", processor: StandardProcessor }],
  ["cmi", { label: "CMI", sample: "{#RRGGBB}", processor: CMIProcessor }],
  ["minimessage", { label: "MiniMessage (adventure-api)", sample: "<#RRGGBB>", processor: MiniMessageProcessor }],
  ["minedown", { label: "MineDown", sample: "&#RRGGBB&", processor: MineDownProcessor }],
  ["trchat", { label: "TrChat", sample: "&{#RRGGBB}", processor: TrChatProcessor }],
  ["motd", { label: "MOTD", sample: "\\u00A7X", processor: MotdProcessor }],
  ["bbcode", { label: "BBCode", sample: "[color=#RRGGBB]", processor: BBCodeProcessor }],
  ["html", { label: "HTML", sample: '<span style="color: #RRGGBB"/>', processor: HTMLProcessor }],
  ["json", { label: "JSON", sample: '{ color: "#RRGGBB" }', processor: JSONProcessor }],
  ["csv", { label: "CSV", sample: "#RRGGBB,Text", processor: CSVProcessor }],
]);

export const processorMapKey = [
  "vanilla",
  "vanilla-compatible",
  "motd",
  "bbcode",
  "html",
  "minedown",
  "cmi",
  "minimessage",
  "trchat",
  "json",
  "csv",
  "standard",
] as const;

export type KeyOfProcessorMap = (typeof processorMapKey)[number];
