/**
 * Converts an emoji string to its hyphen-separated hex codepoint representation.
 * Handles ZWJ sequences and multi-codepoint emojis.
 */
export const getCodepoint = (emoji: string): string => {
  return Array.from(emoji)
    .map((char) => char.codePointAt(0)!.toString(16))
    .join("-");
};
