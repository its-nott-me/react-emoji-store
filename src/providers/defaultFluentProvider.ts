import { EmojiAssetProvider } from "../types/EmojiAssetProvider";

const BASE = "https://cdn.jsdelivr.net/gh/its-nott-me/react-emoji-assets@v1.0.1";

export const defaultFluentProvider: EmojiAssetProvider = {
    getUrls({ codepoint, tone }) {
        const suffix = tone
        ? `${codepoint}_${tone}`
        : `${codepoint}`;

        return [
            `${BASE}/animated/${suffix}.webp`,
            `${BASE}/3D/${suffix}.png`,
        ]
    },
};
