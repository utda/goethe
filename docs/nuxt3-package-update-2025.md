# Nuxt 3 プロジェクトのパッケージ更新まとめ

## 概要

Nuxt 3.2.3 から 3.20.2 へのメジャーアップデートを含む、依存パッケージの大規模更新を実施しました。

## 主要なパッケージ更新

| パッケージ | 更新前 | 更新後 |
|-----------|--------|--------|
| nuxt | 3.2.3 | 3.20.2 |
| @nuxt/content | 2.5.2 | 3.11.0 |
| @nuxtjs/i18n | 8.0.0-beta.10 | 10.2.1 |
| vuetify | 3.1.8 | 3.7.6 |
| sass | 1.58.3 | 1.83.4 |
| @mdi/js | 7.1.96 | 7.4.47 |

## 新規追加パッケージ

- `better-sqlite3: ^12.5.0` - @nuxt/content v3 の依存
- `vue-i18n: ^11.0.0` - i18n モジュールの依存

---

## 対応が必要だった変更点

### 1. @nuxt/content v3 への移行

`content.config.ts` の新規作成が必要になりました。

```ts
// content.config.ts
import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    })
  }
})
```

### 2. @nuxtjs/i18n v10 への移行

#### nuxt.config.ts の変更点

```ts
// Before
i18n: {
  locales: [
    { code: "ja", iso: "ja_JP", file: "ja.js" },
    { code: "en", iso: "en-US", file: "en.js" },
  ],
  langDir: "locales/",
  vueI18n: {
    fallbackLocale: lang,
  },
}

// After
i18n: {
  locales: [
    { code: "ja", language: "ja-JP", file: "ja.js" },  // iso → language
    { code: "en", language: "en-US", file: "en.js" },
  ],
  bundle: {
    optimizeTranslationDirective: false,
    runtimeOnly: true,
  },
  langDir: "locales",  // 末尾スラッシュ削除
  vueI18n: "./i18n.config.ts",  // 外部ファイル化
}
```

#### i18n.config.ts の新規作成

```ts
export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: "ja",
}));
```

#### localesフォルダの移動

`locales/` → `i18n/locales/`

### 3. runtimeConfig のアクセス方法変更

```ts
// Before
runtimeConfig.app_baseURL
runtimeConfig.menus
$config.title

// After
runtimeConfig.app.baseURL
runtimeConfig.public.menus
$config.public.title
```

### 4. TypeScript の型インポート

```ts
// Before
import { Menu } from "@/types/Menu";

// After
import type { Menu } from "@/types/Menu";
```

---

## 参考リンク

- [Nuxt 3 Migration Guide](https://nuxt.com/docs/migration)
- [@nuxt/content v3 Release Notes](https://content.nuxt.com/)
- [@nuxtjs/i18n v10 Migration](https://i18n.nuxtjs.org/docs/migration)
