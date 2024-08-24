import { isEmpty } from "lodash-es";

export class TextBuilder {
  private formatPresets!: FormatPresets;
  private usingFormats: FormatExpression[] = [];
  private characters: CharacterBuilder[] = [];

  public appendCharacter(builder: CharacterBuilder) {
    this.characters.push(builder);
  }

  public withFormat(condition: boolean | undefined, formatExpression: FormatExpression, fallback: string = "") {
    if (condition) {
      this.usingFormats.push(formatExpression);
    }
  }

  public build(options?: { withReset: boolean }): string {
    const formatTemplate = this.usingFormats.reduce<string>((acc, format) => {
      if (Array.isArray(format)) {
        return `${format[0]}${acc}${format[1]}`;
      } else {
        return format + acc;
      }
    }, "{text}");

    let text = this.characters.reduce((acc, builder) => acc.concat(builder.build(formatTemplate)), "");

    return text + (options?.withReset ? this.formatPresets.reset : "");
  }
}

export class CharacterBuilder {
  public character: string;
  public colorExpression!: FormatExpression;
  public colorValue!: string | HexColorString | null;

  constructor(character: string) {
    this.character = character;
  }

  public withColor(value: string | HexColorString | null, colorExpression: FormatExpression = "{color}") {
    this.colorExpression = colorExpression;
    this.colorValue = value;
    return this;
  }

  public build(template: string) {
    const char = template.replace("{text}", this.character);

    if (this.colorValue !== null) {
      const expression = this.colorConvert();

      if (Array.isArray(expression)) {
        return `${expression[0]}${char}${expression[1]}`;
      } else {
        return expression + char;
      }
    }
    return char;
  }

  private colorConvert() {
    if (Array.isArray(this.colorExpression)) {
      return this.colorExpression.map((exp) => exp.replace("{color}", this.colorValue as string));
    } else {
      return this.colorExpression.replace("{color}", this.colorValue as string);
    }
  }
}
