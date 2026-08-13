const OBFUSCATED_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?";

export const randomObfuscatedCharacter = () => {
  return OBFUSCATED_CHARACTERS[Math.floor(Math.random() * OBFUSCATED_CHARACTERS.length)];
};

export const randomObfuscatedText = (length: number) => {
  return Array.from({ length }, randomObfuscatedCharacter).join("");
};
