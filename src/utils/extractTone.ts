/**
 * Skin tone modifiers range: U+1F3FB – U+1F3FF
 */
const TONE_MAP: Record<number, string> = {
    0x1f3fb: "light",
    0x1f3fc: "medium_light",
    0x1f3fd: "medium",
    0x1f3fe: "medium_dark",
    0x1f3ff: "dark",
};

/**
 * Detects skin tone modifiers in an emoji string.
 * Returns the mapped tone name and the emoji without the modifier.
 */
export const extractTone = (emoji: string): { baseEmoji: string; tone?: string } => {
    const chars = Array.from(emoji);
    let tone: string | undefined;

    const filteredChars = chars.filter((char) => {
        const cp = char.codePointAt(0)!;
        if (TONE_MAP[cp]) {
            tone = TONE_MAP[cp];
            return false;
        }
        return true;
    });

    return {
        baseEmoji: filteredChars.join(""),
        ...(tone !== undefined ? { tone } : {}),
    };
};
