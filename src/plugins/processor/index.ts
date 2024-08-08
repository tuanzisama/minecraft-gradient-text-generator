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
  label: `processor.adapter.${string}.label`;
  sample: string;
  mimeType?: string;
  hint?: `processor.adapter.${string}.hint`;
  adapter: GradientProcessorConstructor<T>;
}

export const adapterMap = new Map<KeyOfAdapterMap, AdapterMapValue>([
  ["vanilla", { label: "processor.adapter.vanilla.label", sample: "&#RRGGBB", mimeType: "text/plain", adapter: VanillaAdapter }],
  ["vanilla-compatible", { label: "processor.adapter.vanilla_compatible.label", sample: "&X&R&R&G&G&B&B", adapter: VanillaCompatibleAdapter }],
  ["standard", { label: "processor.adapter.standard.label", sample: "#RRGGBB", hint: "processor.adapter.standard.hint", adapter: StandardAdapter }],
  ["cmi", { label: "processor.adapter.cmi.label", sample: "{#RRGGBB}", adapter: CMIAdapter }],
  ["minimessage", { label: "processor.adapter.minimessage.label", sample: "<#RRGGBB>", adapter: MiniMessageAdapter }],
  [
    "minimessage-gradient",
    { label: "processor.adapter.minimessage_gradient.label", sample: "<gradient:[color1]:[color...]>", adapter: MiniMessageGradientAdapter },
  ],
  ["minedown", { label: "processor.adapter.minedown.label", sample: "&#RRGGBB&", adapter: MineDownAdapter }],
  [
    "stringified-nbt",
    {
      label: "processor.adapter.stringified_nbt.label",
      sample: '{"text":"T","color":"#RRGGBB"}',
      hint: "processor.adapter.stringified_nbt.hint",
      adapter: StringifiedNBTAdapter,
    },
  ],
  ["trchat", { label: "processor.adapter.trchat.label", sample: "&{#RRGGBB}", adapter: TrChatAdapter }],
  ["motd", { label: "processor.adapter.motd.label", sample: "\\u00A7X", adapter: MotdAdapter }],
  ["bbcode", { label: "processor.adapter.bbcode.label", sample: "[color=#RRGGBB]", adapter: BBCodeAdapter }],
  [
    "json",
    {
      label: "processor.adapter.json.label",
      sample: '{"text":"T","color":"#RRGGBB"}',
      mimeType: "application/json",
      adapter: StringifiedNBTAdapter,
    },
  ],
  ["html", { label: "processor.adapter.html.label", sample: '<span style="color: #RRGGBB"/>', mimeType: "text/html", adapter: HTMLAdapter }],
  ["csv", { label: "processor.adapter.csv.label", sample: "#RRGGBB,T", mimeType: "text/csv", adapter: CSVAdapter }],
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
