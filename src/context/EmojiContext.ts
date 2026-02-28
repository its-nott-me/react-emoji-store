import { createContext, useContext } from "react";
import { EmojiAssetProvider } from "../types/EmojiAssetProvider";
import { defaultFluentProvider } from "../providers/defaultFluentProvider";

export const EmojiContext = createContext<EmojiAssetProvider>(defaultFluentProvider);

export const useEmojiProvider = () => useContext(EmojiContext);
