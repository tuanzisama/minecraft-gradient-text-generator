import * as cs from "color-stepper";

export const strHexTo16Bit = (hexStr: string): number => {
  return (parseInt(hexStr.substr(1), 16) << 8) / 256;
};

export const genColorGradients = (gradients: string[], size: number): HexColorString[] => {
  if (gradients.length === 0 || size === 0) return [];
  return cs.generateSteps(
    gradients.map((c) => c.slice(1)),
    size
  );
};
