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
  public colorExpression: FormatExpression | null = null;

  constructor(character: string) {
    this.character = character;
  }

  public withColor(colorExpression: FormatExpression | null) {
    this.colorExpression = colorExpression;
    return this;
  }

  public build(template: string) {
    const char = template.replace("{text}", this.character);
    if (Array.isArray(this.colorExpression)) {
      return `${this.colorExpression[0]}${char}${this.colorExpression[1]}`;
    } else if (!isEmpty(this.colorExpression)) {
      return this.colorExpression + char;
    }
    return char;
  }
}
