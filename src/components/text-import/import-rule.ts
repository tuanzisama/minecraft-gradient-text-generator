export const importRules: Record<"label" | "example", string>[] = [
  {
    label: "JSON",
    example: `[<span class="hljs-string" style="color: rgb(221, 17, 68);">"#RRGGBB"</span>, <span class="hljs-string" style="color: rgb(221, 17, 68);">"#RRGGBB"</span>, <span class="hljs-string" style="color: rgb(221, 17, 68);">"#RRGGBB"</span>]`,
  },
  {
    label: "CSS",
    example: `<span class="hljs-attribute" style="color: navy; font-weight: 400;">background</span>: linear-gradient(&lt;side-or-corner|angle&gt;, <span class="hljs-number" style="color: teal;">#RRGGBB</span>, <span class="hljs-number" style="color: teal;">#RRGGBB</span>, <span class="hljs-number" style="color: teal;">#RRGGBB</span>);`,
  },
  {
    label: "以逗号分隔的文本",
    example: `#RRGGBB,#RRGGBB,#RRGGBB`,
  },
];
