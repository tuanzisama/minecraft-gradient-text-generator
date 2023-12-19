export function parseTemplate(template: string, char: string, color: string): string {
  return template.replaceAll("{color}", color).replaceAll("{char}", char);
}

export function parseHTMLTemplate(char: string, color: HexColorString): string {
  return `<span style="color: ${color}">${char}</span>`;
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
