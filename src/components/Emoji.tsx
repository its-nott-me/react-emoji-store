import React, { useEffect, useMemo, useState } from "react";
import { useEmojiProvider } from "../context/EmojiContext";
import { extractTone } from "../utils/extractTone";
import { getCodepoint } from "../utils/getCodepoint";

export interface EmojiProps {
    emoji: string;
    size?: number | undefined;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
}

export const Emoji: React.FC<EmojiProps> = ({
    emoji,
    size = 32,
    className,
    style,
}) => {
    const provider = useEmojiProvider();

    /**
     * Tracks which fallback URL we're currently trying.
     *
     * Example:
     * 0 = animated
     * 1 = 3D
     *
     * If all URLs fail, we'll render the native emoji.
     */
    const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

    /**
     * Reset fallback state whenever the emoji changes.
     */
    useEffect(() => {
        setCurrentUrlIndex(0);
    }, [emoji]);

    /**
     * Generate all candidate URLs for this emoji.
     *
     * Example:
     * [
     *   ".../animated/1f600.webp",
     *   ".../3d/1f600.webp"
     * ]
     */
    const assetUrls = useMemo(() => {
        try {
            const { baseEmoji, tone } = extractTone(emoji);
            const codepoint = getCodepoint(baseEmoji);

            return provider.getUrls({
                codepoint,
                tone: tone ?? undefined,
            });
        } catch (error) {
            return null;
        }
    }, [emoji, provider]);

    /**
     * If URL generation failed,
     * render the native emoji.
     */
    if (!assetUrls) {
        return (
            <span
                className={className}
                style={{
                    fontSize: size,
                    lineHeight: 1,
                    verticalAlign: "middle",
                    display: "inline-block",
                    ...style,
                }}
                title={emoji}
            >
                {emoji}
            </span>
        );
    }

    /**
     * If we've exhausted every fallback URL,
     * render the native emoji.
     */
    if (currentUrlIndex >= assetUrls.length) {
        return (
            <span
                className={className}
                style={{
                    fontSize: size,
                    lineHeight: 1,
                    verticalAlign: "middle",
                    display: "inline-block",
                    ...style,
                }}
                title={emoji}
            >
                {emoji}
            </span>
        );
    }

    return (
        <img
            src={assetUrls[currentUrlIndex]}
            alt={emoji}
            width={size}
            height={size}
            className={className}
            loading="lazy"
            aria-label={emoji}
            draggable={false}
            onError={() => {
                /**
                 * Current asset failed.
                 * Try the next fallback URL.
                 */
                console.log(assetUrls[currentUrlIndex]);
                setCurrentUrlIndex((prev) => prev + 1);
            }}
            style={{
                verticalAlign: "middle",
                display: "inline-block",
                ...style,
            }}
        />
    );
};