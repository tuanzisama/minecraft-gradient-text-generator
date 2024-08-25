import { I18nLoader } from "@/plugins/i18n";

export const getImportRules = (): Record<"label" | "example", string>[] => {
  return [
    {
      label: I18nLoader.t("picker.import.rules.json"),
      example: `[<span class="hljs-string" style="color: rgb(136, 0, 0);">"#RRGGBB"</span>, <span class="hljs-string" style="color: rgb(136, 0, 0);">"#RRGGBB"</span>, <span class="hljs-string" style="color: rgb(136, 0, 0);">"#RRGGBB"</span>]
[<span class="hljs-string" style="color: rgb(136, 0, 0);">"rgb(R, G, B)"</span>, <span class="hljs-string" style="color: rgb(136, 0, 0);">"rgb(R, G, B)"</span>, <span class="hljs-string" style="color: rgb(136, 0, 0);">"rgb(R, G, B)"</span>]`,
    },
    {
      label: I18nLoader.t("picker.import.rules.css"),
      example: `<span class="hljs-selector-tag" style="font-weight: 700;">background</span>: <span class="hljs-selector-tag" style="font-weight: 700;">linear-gradient</span>(&lt;<span class="hljs-selector-tag" style="font-weight: 700;">side-or-corner</span>|<span class="hljs-selector-tag" style="font-weight: 700;">angle</span>&gt;, <span class="hljs-selector-id" style="color: rgb(136, 0, 0);">#RRGGBB</span>, <span class="hljs-selector-id" style="color: rgb(136, 0, 0);">#RRGGBB</span>, <span class="hljs-selector-id" style="color: rgb(136, 0, 0);">#RRGGBB</span>);
<span class="hljs-selector-tag" style="font-weight: 700;">background</span>: <span class="hljs-selector-tag" style="font-weight: 700;">linear-gradient</span>(&lt;<span class="hljs-selector-tag" style="font-weight: 700;">side-or-corner</span>|<span class="hljs-selector-tag" style="font-weight: 700;">angle</span>&gt;, <span class="hljs-selector-tag" style="font-weight: 700;">rgb</span>(<span class="hljs-selector-tag" style="font-weight: 700;">R</span>, <span class="hljs-selector-tag" style="font-weight: 700;">G</span>, <span class="hljs-selector-tag" style="font-weight: 700;">B</span>), <span class="hljs-selector-tag" style="font-weight: 700;">rgb</span>(<span class="hljs-selector-tag" style="font-weight: 700;">R</span>, <span class="hljs-selector-tag" style="font-weight: 700;">G</span>, <span class="hljs-selector-tag" style="font-weight: 700;">B</span>), <span class="hljs-selector-tag" style="font-weight: 700;">rgb</span>(<span class="hljs-selector-tag" style="font-weight: 700;">R</span>, <span class="hljs-selector-tag" style="font-weight: 700;">G</span>, <span class="hljs-selector-tag" style="font-weight: 700;">B</span>));`,
    },
    {
      label: I18nLoader.t("picker.import.rules.split_with_comma"),
      example: `#RRGGBB,#RRGGBB,#RRGGBB`,
    },
  ];
};
