# React Emoji Store

A lightweight React library for rendering Microsoft Fluent Animated Emojis with zero-dependency on asset bundling. Assets are hosted externally and resolved dynamically via a provider pattern.

## Features

- 🎨 **Fluent Emojis**: Beautiful animated WebP assets.
- 🧴 **Skin Tone Support**: Automatically detects and extracts skin tone modifiers (light to dark).
- 🧩 **Declarative API**: Simple components for single emojis or inline text replacement.
- 🌐 **Provider Pattern**: Decouple rendering from asset resolution.
- 🚀 **Lightweight**: Assets are loaded on demand and fall back to native emojis on error.

## Installation

```bash
npm install react-emoji-store
```

## Quick Start

```tsx
import { Emoji, TextWithEmoji, EmojiProvider } from 'react-emoji-store';

function App() {
  return (
    <EmojiProvider>
      {/* Renders a single animated emoji */}
      <Emoji emoji="😂" size={48} />

      {/* Renders text and replaces emojis inline */}
      <TextWithEmoji size={24}>
        Hello world! 🚀 This is 🚴‍♂️ awesome!
      </TextWithEmoji>
    </EmojiProvider>
  );
}
```

## Components

### `<Emoji />`
Renders a single emoji as an animated WebP.

**Props:**
- `emoji`: The raw emoji string (e.g., "😂" or "👍🏾").
- `size`: Width and height in pixels (default: 32).
- `className`: Custom CSS classes.
- `style`: Inline CSS styles.

### `<TextWithEmoji />`
Parses a string and replaces all emojis with the `<Emoji />` component.

**Props:**
- `children`: The text containing emojis.
- `size`: The size of the emojis (passed to `<Emoji />`).
- `className`: Custom CSS classes.

### `<EmojiProvider />`
Wraps your application to provide asset resolution logic.

**Props:**
- `provider`: (Optional) A custom `EmojiAssetProvider` implementation.
- `children`: React content.

## Architecture

The library uses a `Provider Abstraction` to resolve asset URLs. By default, it points to a CDN hosting the Fluent Emoji assets.

```typescript
interface EmojiAssetProvider {
  getUrl(options: {
    codepoint: string;
    tone?: string;
  }): string | null;
}
```
## Emoji Coverage

This library only renders emojis that exist in the official Microsoft Fluent Animated Emoji repository.

If an emoji does not exist in the dataset, it will automatically fall back to the native system emoji.

Example:
👨‍👩‍👧‍👦 (Family) is not currently available in the animated set and will render as a native emoji.

## Custom Providers

Custom providers can be used to host your own assets or use a different CDN.