import { getTextShadowHsl } from "@/utils/util";

export function parseTemplate(template: string, char: string, color: string): string {
  return template.replaceAll("{color}", color).replaceAll("{char}", char);
}

export function parseFullTemplate(template: string, text: string, colors: HexColorString[], separator: string): string {
  return template.replaceAll("{colors}", colors.join(separator)).replaceAll("{text}", text);
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
