import { GradientProcessorConstructor } from "./processor-core";

import { VanillaAdapter } from "./adapter/vanilla";
import { VanillaCompatibleAdapter } from "./adapter/vanilla-compatible";
import { StandardAdapter } from "./adapter/standard";
import { CMIAdapter } from "./adapter/cmi";
import { MiniMessageAdapter } from "./adapter/minimessage";
import { MiniMessageGradientAdapter } from "./adapter/minimessage-gradient";
import { MineDownAdapter } from "./adapter/minedown";
import { StringifiedNBTAdapter } from "./adapter/stringified-nbt";
import { TrChatAdapter } from "./adapter/trchat";
import { MotdAdapter } from "./adapter/motd";
import { BBCodeAdapter } from "./adapter/bbcode";
import { HTMLAdapter } from "./adapter/html";
import { CSVAdapter } from "./adapter/csv";

interface AdapterMapValue<T = any> {
  label: string;
  sample: string;
  mimeType?: string;
  hint?: string;
  adapter: GradientProcessorConstructor<T>;
}

export const adapterMap = new Map<KeyOfAdapterMap, AdapterMapValue>([
  ["vanilla", { label: "原版 (1.16+)", sample: "&#RRGGBB", mimeType: "text/plain", adapter: VanillaAdapter }],
  ["vanilla-compatible", { label: "原版(1.16+, 兼容)", sample: "&X&R&R&G&G&B&B", adapter: VanillaCompatibleAdapter }],
  ["standard", { label: "标准", sample: "#RRGGBB", hint: "会丢失格式", adapter: StandardAdapter }],
  ["cmi", { label: "CMI", sample: "{#RRGGBB}", adapter: CMIAdapter }],
  ["minimessage", { label: "MiniMessage (adventure-api)", sample: "<#RRGGBB>", adapter: MiniMessageAdapter }],
  [
    "minimessage-gradient",
    { label: "MiniMessage#Gradient (adventure-api)", sample: "<gradient:[color1]:[color...]>", adapter: MiniMessageGradientAdapter },
  ],
  ["minedown", { label: "MineDown", sample: "&#RRGGBB&", adapter: MineDownAdapter }],
  ["stringified-nbt", { label: "Stringified NBT", sample: '{"text":"T","color":"#RRGGBB"}', hint: "需要改进", adapter: StringifiedNBTAdapter }],
  ["trchat", { label: "TrChat", sample: "&{#RRGGBB}", adapter: TrChatAdapter }],
  ["motd", { label: "MOTD", sample: "\\u00A7X", adapter: MotdAdapter }],
  ["bbcode", { label: "BBCode", sample: "[color=#RRGGBB]", adapter: BBCodeAdapter }],
  ["json", { label: "JSON", sample: '{"text":"T","color":"#RRGGBB"}', mimeType: "application/json", adapter: StringifiedNBTAdapter }],
  ["html", { label: "HTML", sample: '<span style="color: #RRGGBB"/>', mimeType: "text/html", adapter: HTMLAdapter }],
  ["csv", { label: "CSV", sample: "#RRGGBB,T", mimeType: "text/csv", adapter: CSVAdapter }],
]);

export const adapterMapKey = [
  "vanilla",
  "vanilla-compatible",
  "standard",
  "cmi",
  "minimessage",
  "minimessage-gradient",
  "minedown",
  "stringified-nbt",
  "trchat",
  "motd",
  "bbcode",
  "json",
  "html",
  "csv",
] as const;

export type KeyOfAdapterMap = (typeof adapterMapKey)[number];
