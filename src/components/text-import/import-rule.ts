import { I18nLoader } from "@/plugins/i18n";

export const getImportRules = (): Record<"label" | "example", string>[] => {
  return [
    {
      label: I18nLoader.t("picker.import.rules.json"),
      example: `[<span class="hljs-string" style="color: rgb(221, 17, 68);">"#RRGGBB"</span>, <span class="hljs-string" style="color: rgb(221, 17, 68);">"#RRGGBB"</span>, <span class="hljs-string" style="color: rgb(221, 17, 68);">"#RRGGBB"</span>]`,
    },
    {
      label: I18nLoader.t("picker.import.rules.css"),
      example: `<span class="hljs-attribute" style="color: navy; font-weight: 400;">background</span>: linear-gradient(&lt;side-or-corner|angle&gt;, <span class="hljs-number" style="color: teal;">#RRGGBB</span>, <span class="hljs-number" style="color: teal;">#RRGGBB</span>, <span class="hljs-number" style="color: teal;">#RRGGBB</span>);`,
    },
    {
      label: I18nLoader.t("picker.import.rules.split_with_comma"),
      example: `#RRGGBB,#RRGGBB,#RRGGBB`,
    },
  ];
};
