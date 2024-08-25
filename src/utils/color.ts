import * as cs from "color-stepper";
import iro from "@jaames/iro";
import { IroColorValue } from "@irojs/iro-core";

export const hexColorRegExp = /^&?#?[a-fA-F0-9]{6}$/;
export const rgbColorRegExp =
  /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*\)$/;
export const rgbaColorRegExp =
  /^rgba\(\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*,\s*(0|0?\.\d+|1(\.0+)?)\s*\)$/;

export const genColorGradients = (gradients: string[], size: number): HexColorString[] => {
  if (gradients.length === 0 || size === 0) return [];
  return cs.generateSteps(
    gradients.map((c) => c.slice(1)),
    size
  );
};

export function randomColor(): HexColorString {
  const color = ("#" + ((Math.random() * 0xffffff) << 0).toString(16)) as HexColorString;
  return color.length !== 7 ? randomColor() : color;
}

export function getGradientCss(list: string[]): GradientCSS {
  const stops = list.map((item, index, list) => `${item} ${((100 / list.length) * index).toFixed(2)}%`);
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

export function getTextShadowHsl(hex: HexColorString): HslColor {
  const color = new iro.Color(hex);
  const hsv = { h: color.hsv.h ?? 0, s: color.hsv.s ?? 0, v: color.hsv.v ?? 0 };

  const h = Math.round(hsv.h);
  const s = Math.round(hsv.s);
  const l = Math.round(hsv.v / 4);

  return { h, s, l };
}

export function getTextShadowHex(hex: HexColorString): HexColorString {
  return new iro.Color(getTextShadowHsl(hex)).hexString as HexColorString;
}

export function colorToHex(value: IroColorValue): HexColorString {
  const color = new iro.Color(value);
  return color.hexString as HexColorString;
}

export function rgbToHex(rgb: Record<"r" | "g" | "b", number>): HexColorString {
  return colorToHex(rgb);
}

export function isHexColor(value: HexColorString | string): boolean {
  return hexColorRegExp.test(value);
}

export function isRGBColor(value: string): boolean {
  return rgbColorRegExp.test(value);
}

export function isRGBAColor(value: string): boolean {
  return rgbaColorRegExp.test(value);
}

export function rgbStringToObject(value: RGBColorString | string): RGBColor {
  const color = new iro.Color(value);
  return color.rgb as RGBColor;
}

export function rgbaStringToObject(value: RGBAColorString | string): RGBAColor {
  const color = new iro.Color(value);
  return color.rgba as RGBAColor;
}
