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
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false);
    }, [emoji]);

    const assetUrl = useMemo(() => {
        try {
            const { baseEmoji, tone } = extractTone(emoji);
            const codepoint = getCodepoint(baseEmoji);
            return provider.getUrl({ codepoint, tone: tone ?? undefined });
        } catch (error) {
            // console.error("Failed to resolve emoji asset:", error);
            return null;
        }
    }, [emoji, provider]);

    if (hasError || !assetUrl) {
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
            src={assetUrl}
            alt={emoji}
            width={size}
            height={size}
            className={className}
            loading="lazy"
            aria-label={emoji}
            draggable={false}
            onError={() => setHasError(true)}
            style={{
                verticalAlign: "middle",
                display: "inline-block",
                ...style,
            }}
        />
    );
};
