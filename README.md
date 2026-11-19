# @tatsuyamiura2667/akane-lib

[![CI (Type Check & Build)](https://github.com/tatsuyamiura2667/akane-lib/actions/workflows/ci.yml/badge.svg)](https://github.com/tatsuyamiura2667/akane-lib/actions/workflows/ci.yml)
[![Publish Package](https://github.com/tatsuyamiura2667/akane-lib/actions/workflows/publish.yml/badge.svg)](https://github.com/tatsuyamiura2667/akane-lib/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/@tatsuyamiura2667/akane-lib.svg)](https://www.npmjs.com/package/@tatsuyamiura2667/akane-lib)

ヨルシカの楽曲・物語（『エルマ』『エイミー』『第一夜』など）の情景から着想を得た、詩的な React UI コンポーネントライブラリです。  
茜さす夕暮れから群青の深夜へと移ろう空の配色、便箋の質感、カセットテープ、夜列車の車窓、万年筆の手帳などを宣言的なコンポーネントとして提供します。

---

## インストール

### npm 公式レジストリからインストール

```bash
npm install @tatsuyamiura2667/akane-lib

```

### GitHub Packages からインストールする場合

プロジェクトルートに `.npmrc` を作成してレジストリを指定したうえでインストールします。

```bash
echo "@tatsuyamiura2667:registry=[https://npm.pkg.github.com](https://npm.pkg.github.com)" >> .npmrc
npm install @tatsuyamiura2667/akane-lib

```

### 推奨フォントの設定

明朝体フォント（`Shippori Mincho`）を推奨しています。利用側アプリの `index.html` の `<head>` 内に以下を追加すると、設計通りのタイポグラフィが適用されます。

```html
<link
  href="[https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600&display=swap](https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600&display=swap)"
  rel="stylesheet"
/>
```

---

## 基本の使い方

アプリケーションのルートで `@tatsuyamiura2667/akane-lib/style.css` を1回インポートし、`AkaneThemeProvider` と `TwilightSky` で画面を囲みます。

```tsx
import { useState } from 'react';
import '@tatsuyamiura2667/akane-lib/style.css';
import {
  AkaneThemeProvider,
  useAkaneTheme,
  TwilightSky,
  BookmarkRibbon,
  CassettePlayer,
  LetterCard,
  LyricLines,
  WhiteLilySeal,
  TrainWindowFrame,
  NotebookMemo,
  type LyricLine,
} from '@tatsuyamiura2667/akane-lib';

const LYRICS: LyricLine[] = [
  { time: 0, text: 'あなただけを覚えている' },
  { time: 3, text: '雲の影が流れていく' },
  { time: 6, text: '白い百合を一輪持って、隣の街から帰ります' },
  { time: 9, text: '列車の窓を少し開いて、夜風が頬を撫でていく' },
];

function StoryView() {
  const theme = useAkaneTheme();
  const [elapsed, setElapsed] = useState(0);

  return (
    <TwilightSky ambient fireworks>
      <nav style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <BookmarkRibbon chapter="一" onClick="{()" title="夕凪"> theme?.setPhase('dusk')} />
        <BookmarkRibbon chapter="二" onClick="{()" title="茜さす"> theme?.setPhase('twilight')} />
        <BookmarkRibbon chapter="三" onClick="{()" title="第一夜"> theme?.setPhase('night')} />
        <BookmarkRibbon chapter="四" onClick="{()" title="夜明け"> theme?.setPhase('dawn')} />
      </nav>

      <NotebookMemo date="朝の手帳" onSave="{(entry)"> console.log('書き留めた内容:', entry)}
      />

      <CassettePlayer durationSec="{14}" onTimeUpdate="{setElapsed}" side="A" title="第一夜 — 夢の記憶"/>

      <TrainWindowFrame>
        <LetterCard date="第一夜" signature="ずっと待っていました">
          <LyricLines currentTime="{elapsed}" lines="{LYRICS}"/>
          <WhiteLilySeal caption="白い百合を一輪"/>
        </LetterCard>
      </TrainWindowFrame>
    </TwilightSky>
  );
}

export function App() {
  return (
    <AkaneThemeProvider syncWithSystemTime>
      <StoryView/>
    </AkaneThemeProvider>
  );
}

```

---

## コンポーネント & API リファレンス

### 1. `AkaneThemeProvider` / `useAkaneTheme`

時間帯（`SkyPhase`: `'dusk' | 'twilight' | 'night' | 'dawn'`）をコンテキストで管理し、配下の全コンポーネントの紙色・インク色・アクセントカラーを一括で切り替えます。`night` 指定時は深夜の群青・月明かり配色（ダークテーマ）になります。

| Prop                 | 型                          | デフォルト   | 説明                                                       |
| -------------------- | --------------------------- | ------------ | ---------------------------------------------------------- |
| `children`           | `ReactNode`                 | (必須)       | 配下の要素                                                 |
| `phase`              | `SkyPhase`                  | -            | 外部から時間帯を直接制御する場合に指定                     |
| `defaultPhase`       | `SkyPhase`                  | `'twilight'` | 非制御モード時の初期時間帯                                 |
| `onPhaseChange`      | `(phase: SkyPhase) => void` | -            | 時間帯が切り替わったときのコールバック                     |
| `syncWithSystemTime` | `boolean`                   | `false`      | ユーザーの現在時刻（朝・昼夕・黄昏・深夜）に応じて自動同期 |
| `autoCycle`          | `boolean`                   | `false`      | 一定間隔で4つの時間帯を自動循環                            |
| `intervalMs`         | `number`                    | `8000`       | `autoCycle` 時の切り替え間隔（ミリ秒）                     |
| `className`          | `string`                    | `''`         | ラッパー要素の追加クラス名                                 |

**`useAkaneTheme()` の戻り値:**

- `phase`: 現在の `SkyPhase`
- `setPhase(phase)`: 任意の時間帯へ切り替え
- `nextPhase()`: 次の時間帯へ進める
- `isSystemSynced`: システム時刻と同期中かどうか
- `resetToSystemTime()`: 手動切り替えを解除して現在時刻の空へ戻す

---

### 2. `TwilightSky`

夕凪・茜空・深夜・夜明けのグラデーション空と、時間帯に応じた控えめな環境アニメーション（通り雨・光塵・星屑と蛍火・朝霧・遠花火）を描画する背景コンテナです。

| Prop         | 型          | デフォルト | 説明                                                             |
| ------------ | ----------- | ---------- | ---------------------------------------------------------------- |
| `children`   | `ReactNode` | (必須)     | 前面に配置するコンテンツ                                         |
| `phase`      | `SkyPhase`  | -          | 単独使用時の時間帯指定（`AkaneThemeProvider` 内では自動継承）    |
| `ambient`    | `boolean`   | `false`    | 時間帯に応じた環境アニメーション（雨粒・光塵・星屑・朝霧）を表示 |
| `fireworks`  | `boolean`   | `false`    | `phase="night"` 時に遠くで開く夜花火の演出を追加                 |
| `autoCycle`  | `boolean`   | `false`    | 単独使用時の自動時間帯循環                                       |
| `intervalMs` | `number`    | `8000`     | 自動循環の切り替え間隔（ミリ秒）                                 |
| `className`  | `string`    | `''`       | 追加クラス名                                                     |

---

### 3. `LetterCard`

便箋の質感と詩的な行間・字間を備えた手紙コンテナです。縦書きレイアウトにも対応しています。

| Prop        | 型          | デフォルト | 説明                                               |
| ----------- | ----------- | ---------- | -------------------------------------------------- |
| `children`  | `ReactNode` | (必須)     | 本文                                               |
| `date`      | `string`    | -          | 冒頭に表示する日付や章題                           |
| `signature` | `string`    | -          | 末尾に表示する署名・差出人                         |
| `vertical`  | `boolean`   | `false`    | `true` で縦書き（`writing-mode: vertical-rl`）表示 |
| `className` | `string`    | `''`       | 追加クラス名                                       |

---

### 4. `CassettePlayer`

再生中にリールが回転し、テープの進行バーが伸びるアナログ風カセットテーププレイヤーです。`audioSrc` を省略した場合はタイマー駆動のビジュアルプレイヤーとして動作します。

| Prop           | 型                             | デフォルト | 説明                                           |
| -------------- | ------------------------------ | ---------- | ---------------------------------------------- |
| `title`        | `string`                       | (必須)     | ラベルに表示するタイトル                       |
| `side`         | `'A'                           | 'B'`       | `'A'`                                          | テープの面表示 |
| `audioSrc`     | `string`                       | -          | 再生する音声ファイルのURL（任意）              |
| `durationSec`  | `number`                       | `180`      | `audioSrc` 未指定時の擬似再生時間（秒）        |
| `onTimeUpdate` | `(elapsedSec: number) => void` | -          | 経過秒数が更新されるたびに呼ばれるコールバック |
| `className`    | `string`                       | `''`       | 追加クラス名                                   |

---

### 5. `BookmarkRibbon`

本や手紙に挟む栞（しおり）をモチーフにした縦書きのボタン／ナビゲーションパーツです。

| Prop        | 型           | デフォルト | 説明                               |
| ----------- | ------------ | ---------- | ---------------------------------- |
| `title`     | `string`     | (必須)     | 栞に縦書きで表示するタイトル       |
| `chapter`   | `string`     | -          | タイトルの横に添える章番号・漢数字 |
| `onClick`   | `() => void` | -          | クリック時のハンドラ               |
| `className` | `string`     | `''`       | 追加クラス名                       |

---

### 6. `LyricLines`

再生時間や自動タイマーに合わせて、紙にインクが滲むように一節ずつ浮かび上がる歌詞・詩節表示コンポーネントです。

| Prop           | 型                       | デフォルト | 説明                                                                    |
| -------------- | ------------------------ | ---------- | ----------------------------------------------------------------------- |
| `lines`        | `LyricLine[]`            | (必須)     | `{ time: number; text: string }[]` 形式のタイムスタンプ付きテキスト配列 |
| `currentTime`  | `number`                 | -          | 外部から同期する現在の経過秒数                                          |
| `autoPlay`     | `boolean`                | `false`    | `currentTime` 未指定時に内部タイマーで自動進行                          |
| `loop`         | `boolean`                | `true`     | `autoPlay` 時に最後まで到達したら最初に戻るか                           |
| `vertical`     | `boolean`                | `false`    | 縦書きレイアウトに切り替え                                              |
| `onLineSelect` | `(time: number) => void` | -          | 行をクリックしたときにその開始秒数を返すコールバック                    |
| `className`    | `string`                 | `''`       | 追加クラス名                                                            |

---

### 7. `WhiteLilySeal`

『第一夜』の白い百合をモチーフにした封蝋（シーリングワックス）風の紋章ボタンです。

| Prop        | 型           | デフォルト | 説明                                 |
| ----------- | ------------ | ---------- | ------------------------------------ |
| `caption`   | `string`     | -          | 封蝋の横に添えるキャプションテキスト |
| `onClick`   | `() => void` | -          | クリック時のハンドラ                 |
| `className` | `string`     | `''`       | 追加クラス名                         |

---

### 8. `TrainWindowFrame`

少し開いた夜列車の車窓を模したフレームコンテナです。背景で遠くの街灯りが後ろへ流れ去ります。

| Prop        | 型          | デフォルト | 説明                                       |
| ----------- | ----------- | ---------- | ------------------------------------------ |
| `children`  | `ReactNode` | (必須)     | 車窓の内側に配置するコンテンツ             |
| `moving`    | `boolean`   | `true`     | 車窓を流れる街灯りのアニメーションを有効化 |
| `className` | `string`    | `''`       | 追加クラス名                               |

---

### 9. `NotebookMemo`

朝に手帳へ言葉を書き留める場面をイメージした、罫線・赤マージン線・万年筆インク色切り替え付きの入力コンポーネントです。

| Prop           | 型                                                                   | デフォルト                                     | 説明                           |
| -------------- | -------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------ |
| `date`         | `string`                                                             | `'朝の手帳'`                                   | ヘッダーに表示する日付や見出し |
| `placeholder`  | `string`                                                             | `'窓の向こうに触れ、それを手帳に書き留める……'` | プレースホルダー文言           |
| `value`        | `string`                                                             | -                                              | 制御モード時の入力テキスト     |
| `defaultValue` | `string`                                                             | `''`                                           | 非制御モード時の初期テキスト   |
| `defaultInk`   | `FountainInk`                                                        | `'blue-black'`                                 | 初期インク色（`'blue-black'    | 'crimson' | 'sepia'`） |
| `submitLabel`  | `string`                                                             | `'書き留める'`                                 | 保存ボタンのラベル             |
| `onChange`     | `(value: string) => void`                                            | -                                              | 入力変更時のコールバック       |
| `onSave`       | `(entry: { text: string; ink: FountainInk; date?: string }) => void` | -                                              | 保存ボタン押下時のコールバック |
| `className`    | `string`                                                             | `''`                                           | 追加クラス名                   |

---

## ライセンス

MIT
EOF

```

```
