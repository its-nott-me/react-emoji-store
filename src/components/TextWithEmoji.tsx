import React from "react";
import emojiRegex from "emoji-regex";
import { Emoji } from "./Emoji";

export interface TextWithEmojiProps {
    children: string;
    size?: number | undefined;
    className?: string | undefined;
}

export const TextWithEmoji: React.FC<TextWithEmojiProps> = ({
    children,
    size,
    className,
}) => {
    const regex = emojiRegex();
    const segments = children.split(regex);
    const matches = children.match(regex) || [];

    return (
        <span className={className}>
            {segments.map((segment, index) => (
                <React.Fragment key={index}>
                    {segment}
                    {matches[index] && (
                        <Emoji
                            emoji={matches[index]!}
                            size={size ?? undefined}
                        />
                    )}
                </React.Fragment>
            ))}
        </span>
    );
};
