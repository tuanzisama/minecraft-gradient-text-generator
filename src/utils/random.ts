export function randomString(length?: number): string {
  function generator(): string {
    const rand = Math.random().toString(36).substring(2);
    return rand === "" ? generator() : rand;
  }

  if (length) {
    let builder = "";
    while (builder.length <= length) {
      builder += generator();
    }
    return builder.slice(0, length);
  } else {
    return generator();
  }
}
