type HexColorString = `#${string}`;
type GradientCSS = `linear-gradient${string}`;

interface ColorStop {
  hex: HexColorString;
  stop: number;
}

interface ColorItem<T = HexColorString> {
  label?: string;
  color: T;
}

interface GradientColorItem extends ColorItem<GradientCSS> {
  colors: HexColorString[];
}
