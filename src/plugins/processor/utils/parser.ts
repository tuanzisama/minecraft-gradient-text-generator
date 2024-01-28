import { getTextShadowHsl } from "@/utils/util";
import { mapValues } from "lodash-es";

export type FormatParams = Record<"bold" | "italic" | "underlined" | "strikethrough", string | string[]>;
export type RichColorParam = { colors: HexColorString[]; separator: string };

export function parseTemplate(template: string, char: string, color: string | RichColorParam, format?: FormatParams): string {
  let _temp = template.replaceAll("{char}", char);

  if (typeof color === "string") {
    _temp = _temp.replaceAll("{color}", color);
  } else {
    _temp = _temp.replaceAll("{colors}", color.colors.join(color.separator));
  }

  mapValues(format, (value, key) => {
    if (Array.isArray(value)) {
      _temp = _temp.replaceAll(`{${key}}`, value?.[0] ?? "").replaceAll(`{/${key}}`, value?.[1] ?? "");
    } else {
      _temp = _temp.replaceAll(`{${key}}`, value ?? "");
    }
  });

  return _temp;
}

export function parseFullyTemplate(template: string, text: string, options: { format?: FormatParams; colors?: RichColorParam }): string {
  let _temp = template.replaceAll("{template}", text);

  if (options.colors) {
    _temp = _temp.replaceAll("{colors}", options.colors.colors.join(options.colors.separator));
  }

  mapValues(options.format, (value, key) => {
    if (Array.isArray(value)) {
      _temp = _temp.replaceAll(`{${key}}`, value?.[0] ?? "").replaceAll(`{/${key}}`, value?.[1] ?? "");
    } else {
      _temp = _temp.replaceAll(`{${key}}`, value ?? "");
    }
  });

  return _temp;
}

export function parseHTMLTemplate(char: string, color: HexColorString): string {
  const hsl = getTextShadowHsl(color);
  return `<span style="color: ${color};--text-shadow-hsl: hsl(${hsl.h} ${hsl.s}% ${hsl.l}%);">${char}</span>`;
}

export function parseSpanTemplate(text: string): string {
  return `<span>${replaceHTMLEntity(text)}</span>`;
}

export function parseTemplateToHTML(text: string): string {
  return replaceHTMLEntity(text).replace(/\r|\n/g, "<br />");
}

export function replaceHTMLEntity(text: string): string {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function assertReplace(condition: boolean, text: string, pattern: string | RegExp, replacement: string = ""): string {
  if (condition) return text.replace(pattern, replacement);
  return text;
}
