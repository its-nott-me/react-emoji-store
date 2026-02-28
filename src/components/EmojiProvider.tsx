import React, { ReactNode } from "react";
import { EmojiContext } from "../context/EmojiContext";
import { EmojiAssetProvider } from "../types/EmojiAssetProvider";
import { defaultFluentProvider } from "../providers/defaultFluentProvider";

export interface EmojiProviderProps {
    provider?: EmojiAssetProvider;
    children: ReactNode;
}

export const EmojiProvider: React.FC<EmojiProviderProps> = ({
    provider = defaultFluentProvider,
    children,
}) => {
    return (
        <EmojiContext.Provider value={provider}>
            {children}
        </EmojiContext.Provider>
    );
};
