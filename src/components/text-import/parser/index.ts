import { colorToHex, isHexColor, isRGBColor } from "@/utils/color";
import { isEmpty, isString } from "lodash-es";

type ParserResult = HexColorString[] | null;

export const hexColorRegExp = /&?#?[a-fA-F0-9]{6}/g;
export const rgbColorRegExp =
  /rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*\)/g;

export const parseText = (value: string): ParserResult => {
  const parsers = [JSONParser, CommaSeparatedParser, CSSParser];
  return parsers.reduce<ParserResult>((prev, func) => (prev === null ? func(value.trim()) : prev), null);
};

function JSONParser(value: string): ParserResult {
  try {
    const parsed = JSON.parse(value) as unknown[];
    return parsed
      .filter((item: unknown) => isString(item))
      .reduce((acc, value) => {
        if (isHexColor(value)) {
          return acc.concat(value as HexColorString);
        } else if (isRGBColor(value)) {
          return acc.concat(colorToHex(value));
        }
        return acc;
      }, [] as HexColorString[]);
  } catch {
    return null;
  }
}

function CSSParser(value: string): ParserResult {
  const reg = /background(\-image)?:(.?)linear-gradient\((?<value>.*)\)/;

  const gradientValue = value.match(reg)?.groups?.value ?? "";

  const hexMatchResult = (gradientValue.match(hexColorRegExp) as HexColorString[]) ?? [];
  const rgbMatchResult = gradientValue.match(rgbColorRegExp) ?? [];

  const rgbResult = rgbMatchResult.map((rgb) => colorToHex(rgb));

  const finalResult = [...hexMatchResult, ...rgbResult];

  return !isEmpty(finalResult) ? finalResult : null;
}

/**
 * Only Hex color.
 */
function CommaSeparatedParser(value: string): ParserResult {
  const splited = value.split(",");

  const result = splited.filter((color) => isHexColor(color));

  return isEmpty(result) || result.length !== splited.length ? null : (result as HexColorString[]);
}
