import { EmojiAssetProvider } from "../types/EmojiAssetProvider";

const BASE = "https://cdn.jsdelivr.net/gh/its-nott-me/react-emoji-assets@v1.0.0";

export const defaultFluentProvider: EmojiAssetProvider = {
    getUrl({ codepoint, tone }) {
        if (!tone) {
            return `${BASE}/animated/${codepoint}.webp`;
        }
        return `${BASE}/animated/${codepoint}_${tone}.webp`;
    },
};
