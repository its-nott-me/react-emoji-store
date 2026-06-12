export interface EmojiAssetProvider {
    /**
     * Constructs a URL for the given emoji codepoint and skin tone.
     * @param options Codepoint and optional tone name (light, dark, etc.)
     * @returns The resolved URL or null if it cannot be resolved.
     */
    getUrls(options: 
        { 
            codepoint: string; 
            tone?: string | undefined
        }): string[];
}
