import { isHexColor } from "@/utils/color";
import { isEmpty, isString } from "lodash-es";

type ParserResult = HexColorString[] | null;

export const parseText = (value: string): ParserResult => {
  const parsers = [JSONParser, CommaSeparatedParser, CSSParser];
  return parsers.reduce<ParserResult>((prev, func) => (prev === null ? func(value.trim()) : prev), null);
};

function JSONParser(value: string): ParserResult {
  try {
    const parsed = JSON.parse(value);
    return parsed.filter((item: unknown) => isString(item) && isHexColor(item));
  } catch {
    return null;
  }
}

function CSSParser(value: string): ParserResult {
  const reg = /background(\-image)?:(.?)linear-gradient\((?<value>.*)\)/;

  const colorStop = value.match(reg)?.groups?.value ?? "";

  const result = colorStop.split(/\,./).reduce<HexColorString[]>((prev, item) => {
    const color = item.replace(/.[0-9]{1,3}\%/, "");
    return isHexColor(color) ? prev.concat(color as HexColorString) : prev;
  }, []);

  return !isEmpty(result) ? result : null;
}

function CommaSeparatedParser(value: string): ParserResult {
  const splited = value.split(",");

  const result = splited.filter((color) => isHexColor(color));

  return isEmpty(result) || result.length !== splited.length ? null : (result as HexColorString[]);
}
