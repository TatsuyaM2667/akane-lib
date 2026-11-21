# @tatsuyamiura2667/akane-lib

[![CI (Type Check, Test & Build)](https://github.com/TatsuyaM2667/akane-lib/actions/workflows/ci.yml/badge.svg)](https://github.com/TatsuyaM2667/akane-lib/actions/workflows/ci.yml)
[![Publish Package](https://github.com/TatsuyaM2667/akane-lib/actions/workflows/publish.yml/badge.svg)](https://github.com/TatsuyaM2667/akane-lib/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/@tatsuyamiura2667/akane-lib.svg)](https://www.npmjs.com/package/@tatsuyamiura2667/akane-lib)

現在の安定版: **0.4.8**

ヨルシカの楽曲・物語（『エルマ』『エイミー』『第一夜』など）の情景から着想を得た、詩的な React UI コンポーネントライブラリです。  
茜さす夕暮れから群青の深夜へと移ろう空の配色、便箋の質感、カセットテープ、夜列車の車窓、万年筆の手帳などを宣言的なコンポーネントとして提供します。雪海の記号が降る「テレパス」や、夜景の妬みを描く「昼鳶」のダークな情景も追加しました。2017〜2026年の43作品から抽象化した紙・光・風・水の処理を、画像不要の CSS / SVG マテリアルとしてまとめています。

## ドキュメント

- **ドキュメントサイト / インタラクティブデモ**: https://TatsuyaM2667.github.io/akane-lib/
- **コンポーネントカタログ (Storybook)**: https://TatsuyaM2667.github.io/akane-lib/storybook/

ドキュメントサイトでは、導入方法、8つの空の時間帯、全31コンポーネントの API とライブプレビュー、27ストーリーの Storybook、モチーフ辞典、43作品の MV マテリアル・ギャラリー、モチーフ年表、素材システム、よくある質問を掲載しています。

---

## インストール

### npm 公式レジストリからインストール

```bash
npm install @tatsuyamiura2667/akane-lib
```

### GitHub Packages からインストールする場合

プロジェクトルートに `.npmrc` を作成してレジストリを指定したうえでインストールします。

```bash
echo "@tatsuyamiura2667:registry=https://npm.pkg.github.com" >> .npmrc
npm install @tatsuyamiura2667/akane-lib
```

### 推奨フォントの設定

明朝体フォント（`Shippori Mincho`）を推奨しています。利用側アプリの `index.html` の `<head>` 内に以下を追加すると、設計通りのタイポグラフィが適用されます。

```html
<link
  href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600&display=swap"
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
        <BookmarkRibbon chapter="一" title="夕凪" onClick={() => theme?.setPhase('dusk')} />
        <BookmarkRibbon chapter="二" title="茜さす" onClick={() => theme?.setPhase('twilight')} />
        <BookmarkRibbon chapter="三" title="第一夜" onClick={() => theme?.setPhase('night')} />
        <BookmarkRibbon chapter="四" title="夜明け" onClick={() => theme?.setPhase('dawn')} />
      </nav>

      <NotebookMemo date="朝の手帳" onSave={(entry) => console.log('書き留めた内容:', entry)} />

      <CassettePlayer
        durationSec={14}
        onTimeUpdate={setElapsed}
        side="A"
        title="第一夜 — 夢の記憶"
      />

      <TrainWindowFrame>
        <LetterCard date="第一夜" signature="ずっと待っていました">
          <LyricLines currentTime={elapsed} lines={LYRICS} />
          <WhiteLilySeal caption="白い百合を一輪" />
        </LetterCard>
      </TrainWindowFrame>
    </TwilightSky>
  );
}

export function App() {
  return (
    <AkaneThemeProvider syncWithSystemTime>
      <StoryView />
    </AkaneThemeProvider>
  );
}
```

---

## コンポーネント & API リファレンス

詳細な説明とライブプレビューは[ドキュメントサイト](https://TatsuyaM2667.github.io/akane-lib/#/components)を参照してください。

### 1. `AkaneThemeProvider` / `useAkaneTheme`

時間帯（`SkyPhase`: `'midnight' | 'night' | 'dawn' | 'morning' | 'day' | 'dusk' | 'golden' | 'twilight'`）をコンテキストで管理し、配下の全コンポーネントの紙色・インク色・アクセントカラーを一括で切り替えます。`night` / `midnight` 指定時は群青・月明かり配色（ダークテーマ）になります。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | (必須) | 配下の要素 |
| `phase` | `SkyPhase` | - | 外部から時間帯を直接制御する場合に指定 |
| `defaultPhase` | `SkyPhase` | `'twilight'` | 非制御モード時の初期時間帯 |
| `onPhaseChange` | `(phase: SkyPhase) => void` | - | 時間帯が切り替わったときのコールバック |
| `syncWithSystemTime` | `boolean` | `false` | ユーザーの現在時刻（朝・昼夕・黄昏・深夜）に応じて自動同期 |
| `autoCycle` | `boolean` | `false` | 一定間隔で8つの時間帯を自動循環 |
| `intervalMs` | `number` | `8000` | `autoCycle` 時の切り替え間隔（ミリ秒） |
| `className` | `string` | `''` | ラッパー要素の追加クラス名 |

**`useAkaneTheme()` の戻り値:**

- `phase`: 現在の `SkyPhase`
- `setPhase(phase)`: 任意の時間帯へ切り替え
- `nextPhase()`: 次の時間帯へ進める
- `isSystemSynced`: システム時刻と同期中かどうか
- `resetToSystemTime()`: 手動切り替えを解除して現在時刻の空へ戻す

`getSkyPhaseFromDate(date)` を使うと、任意の日時から `SkyPhase` を取得できます。

### 2. `TwilightSky`

群青・第一夜・夜明け・朝霧・白昼・夕凪・金色・茜さすの8種類のグラデーション空と、時間帯に応じた控えめな環境アニメーション（月・星屑・蛍火・朝霧と露・雲・夕日・通り雨・光塵・遠花火）を描画する背景コンテナです。画像を使わない油絵の筆致レイヤーも重ねます。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | (必須) | 前面に配置するコンテンツ |
| `phase` | `SkyPhase` | - | 単独使用時の時間帯指定（`AkaneThemeProvider` 内では自動継承） |
| `ambient` | `boolean` | `false` | 時間帯に応じた環境アニメーションを表示 |
| `fireworks` | `boolean` | `false` | `phase="night"` 時に遠花火の演出を追加 |
| `oilPaint` | `boolean` | `true` | 油絵の筆致・画布の目を重ねる（`ambient` 有効時） |
| `autoCycle` | `boolean` | `false` | 単独使用時の自動時間帯循環 |
| `intervalMs` | `number` | `8000` | 自動循環の切り替え間隔（ミリ秒） |
| `className` | `string` | `''` | 追加クラス名 |

### 3. `LetterCard`

便箋の質感と詩的な行間・字間を備えた手紙コンテナです。縦書きレイアウトにも対応しています。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | (必須) | 本文 |
| `date` | `string` | - | 冒頭に表示する日付や章題 |
| `signature` | `string` | - | 末尾に表示する署名・差出人 |
| `vertical` | `boolean` | `false` | `true` で縦書き（`writing-mode: vertical-rl`）表示 |
| `oilPaint` | `boolean` | `false` | 紙に油絵の厚塗りテクスチャを重ねる |
| `className` | `string` | `''` | 追加クラス名 |

### 4. `CassettePlayer`

再生中にリールが回転し、テープの進行バーが伸びるアナログ風カセットテーププレイヤーです。`audioSrc` を省略した場合はタイマー駆動のビジュアルプレイヤーとして動作します。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `title` | `string` | (必須) | ラベルに表示するタイトル |
| `side` | `'A' \| 'B'` | `'A'` | テープの面表示 |
| `audioSrc` | `string` | - | 再生する音声ファイルの URL（任意） |
| `durationSec` | `number` | `180` | `audioSrc` 未指定時の擬似再生時間（秒） |
| `onTimeUpdate` | `(elapsedSec: number) => void` | - | 経過秒数が更新されるたびに呼ばれるコールバック |
| `className` | `string` | `''` | 追加クラス名 |

### 5. `BookmarkRibbon`

本や手紙に挟む栞（しおり）をモチーフにした縦書きのボタン／ナビゲーションパーツです。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `title` | `string` | (必須) | 栞に縦書きで表示するタイトル |
| `chapter` | `string` | - | タイトルの横に添える章番号・漢数字 |
| `onClick` | `() => void` | - | クリック時のハンドラ |
| `className` | `string` | `''` | 追加クラス名 |

### 6. `LyricLines`

再生時間や自動タイマーに合わせて、紙にインクが滲むように一節ずつ浮かび上がる歌詞・詩節表示コンポーネントです。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `lines` | `LyricLine[]` | (必須) | `{ time: number; text: string }[]` 形式のタイムスタンプ付きテキスト配列 |
| `currentTime` | `number` | - | 外部から同期する現在の経過秒数 |
| `autoPlay` | `boolean` | `false` | `currentTime` 未指定時に内部タイマーで自動進行 |
| `loop` | `boolean` | `true` | `autoPlay` 時に最後まで到達したら最初に戻るか |
| `vertical` | `boolean` | `false` | 縦書きレイアウトに切り替え |
| `onLineSelect` | `(time: number) => void` | - | 行をクリックしたときにその開始秒数を返すコールバック |
| `className` | `string` | `''` | 追加クラス名 |

### 7. `WhiteLilySeal`

『第一夜』の白い百合をモチーフにした封蝋（シーリングワックス）風の紋章ボタンです。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `caption` | `string` | - | 封蝋の横に添えるキャプションテキスト |
| `onClick` | `() => void` | - | クリック時のハンドラ |
| `className` | `string` | `''` | 追加クラス名 |

### 8. `TrainWindowFrame`

少し開いた夜列車の車窓を模したフレームコンテナです。背景で遠くの街灯りが後ろへ流れ去ります。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | (必須) | 車窓の内側に配置するコンテンツ |
| `moving` | `boolean` | `true` | 車窓を流れる街灯りのアニメーションを有効化 |
| `className` | `string` | `''` | 追加クラス名 |

### 9. `NotebookMemo`

朝に手帳へ言葉を書き留める場面をイメージした、罫線・赤マージン線・万年筆インク色切り替え付きの入力コンポーネントです。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `date` | `string` | `'朝の手帳'` | ヘッダーに表示する日付や見出し |
| `placeholder` | `string` | `'窓の向こうに触れ、それを手帳に書き留める……'` | プレースホルダー文言 |
| `value` | `string` | - | 制御モード時の入力テキスト |
| `defaultValue` | `string` | `''` | 非制御モード時の初期テキスト |
| `defaultInk` | `FountainInk` | `'blue-black'` | 初期インク色（`'blue-black' \| 'crimson' \| 'sepia'`） |
| `submitLabel` | `string` | `'書き留める'` | 保存ボタンのラベル |
| `onChange` | `(value: string) => void` | - | 入力変更時のコールバック |
| `onSave` | `(entry: { text: string; ink: FountainInk; date?: string }) => void` | - | 保存ボタン押下時のコールバック |
| `className` | `string` | `''` | 追加クラス名 |

### 10. `SakuraThiefOverlay`

花びらが舞うオーバーレイです。`density` で風の強さ、`petalCount` で枚数（0〜160）を細かく調整できます。`oilPaint` で花びらに筆致を加えられます。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | 演出の内側に置く要素 |
| `active` | `boolean` | `true` | 花びらを表示するか |
| `density` | `'light' \| 'normal' \| 'gust'` | `'normal'` | 風の強さ（既定枚数 6 / 11 / 16） |
| `petalCount` | `number` | - | 花びらの枚数。`density` の枚数より優先されます |
| `oilPaint` | `boolean` | `false` | 花びらに油絵の筆致を重ねる |
| `className` | `string` | `''` | 追加クラス名 |

### 11. `RainRippleButton`

クリックした位置から雨の波紋が広がるボタンです。通常の `button` 属性をそのまま受け取れます。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | (必須) | ボタンのラベル |
| `...rest` | `ButtonHTMLAttributes<HTMLButtonElement>` | - | `onClick` / `disabled` などの標準属性 |

### 12. `GhostFlowerRefraction`

SVG フィルタで光の屈折・残像・水面の光跡を重ねるラッパーです。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | (必須) | 屈折させる要素 |
| `intensity` | `RefractionIntensity` | `'calm'` | `'calm' \| 'ripple' \| 'mirage'` |
| `afterimage` | `boolean` | `true` | 残像を重ねるか |
| `caustics` | `boolean` | `true` | 水面の光跡を表示するか |
| `className` | `string` | `''` | 追加クラス名 |

### 13. `TypewriterCensorText`

一文字ずつ打鍵しながら、`[[ ... ]]` で囲んだ語を黒塗りできるテキストです。黒塗りはクリック・Enter・Space で開示できます。

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `text` | `string` | (必須) | 表示する文字列（`[[ ]]` が黒塗りの指定） |
| `speedMs` | `number` | `65` | 1文字の打鍵間隔（ミリ秒） |
| `revealOnHover` | `boolean` | `true` | ホバーで開示可能にするか |
| `instant` | `boolean` | `false` | 打鍵アニメーションを省略するか |
| `onComplete` | `() => void` | - | 打鍵完了時のコールバック |
| `className` | `string` | `''` | 追加クラス名 |

### 14. `OilPaintTexture`

筆致・画布の目・厚塗りの光を CSS だけで重ねる、画像不要のテクスチャです。親要素いっぱいに広がり、ポインタ操作を邪魔しません。

```tsx
import { OilPaintTexture } from '@tatsuyamiura2667/akane-lib';

<div style={{ position: 'relative' }}>
  <OilPaintTexture variant="paper" intensity="subtle" />
  <p>紙の上に置いた一行</p>
</div>;
```

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `variant` | `'sky' \| 'paper' \| 'petal'` | `'sky'` | 空・紙・花びらの色味 |
| `intensity` | `'subtle' \| 'normal' \| 'strong'` | `'normal'` | 重ねる濃さ |
| `className` | `string` | `''` | 追加クラス名 |

### 15. `WhisperText`

一文字ずつ滲んで現れる文字演出です。`telepath` は白い信号の揺らぎ、`envy` は赤く滲んだ黒塗りの残響を表現します。情景だけを借りたオリジナルの文を渡してください。

```tsx
import { WhisperText } from '@tatsuyamiura2667/akane-lib';

<WhisperText text="言葉の代わりに、白い信号が降る" variant="telepath" speedMs={45} />
<WhisperText text="笑いながら夜景を数える、満たされない胸の音" variant="envy" speedMs={55} />
```

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `text` | `string` | (必須) | 表示する一文 |
| `variant` | `'telepath' \| 'envy'` | `'telepath'` | 雪海か嫉妬の演出 |
| `speedMs` | `number` | `55` | 1文字ずつの出現間隔（ミリ秒） |
| `className` | `string` | `''` | 追加クラス名 |

### 16. `RelicScene`

紙飛行機・信号輪・結晶・鳶・カセットを CSS 3D で浮かべる、画像不要の奥行きシーンです。WebGL や追加依存は使いません。

```tsx
import { RelicScene, WhisperText } from '@tatsuyamiura2667/akane-lib';

<RelicScene variant="telepath" count={16}>
  <WhisperText text="白く降る記号の中で、名前のない想いを送る" />
</RelicScene>;
```

| Prop | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `variant` | `'telepath' \| 'envy' \| 'memories'` | `'telepath'` | 浮遊物と配色の種類 |
| `count` | `number` | `14` | 浮遊物の個数（0〜40） |
| `children` | `ReactNode` | - | 手前に重ねる内容 |
| `className` | `string` | `''` | 追加クラス名 |

---

## マテリアル・プリミティブ

43作品から抽出した「紙 / 光 / 風 / 水 / 線 / 身体 / 視点」の処理を、画像なしで重ねられる装飾部品として追加しました。いずれも `className` を受け取り、装飾レイヤーは `aria-hidden`、モーションは `prefers-reduced-motion` に従います。

| コンポーネント | 役割 | 主な Prop |
| --- | --- | --- |
| `FilmGrainOverlay` | フィルム粒子の空気感 | `intensity`, `animated` |
| `PaperTexture` | 和紙・新聞紙・便箋の繊維 | `tone` |
| `HalftoneDots` | リソ／新版画の網点 | `angle`, `density`, `tone` |
| `VignetteLens` | レンズ周縁の減衰 | `strength` |
| `RisoText` | 刷りずれた見出し | `children`, `ink`, `as` |
| `KomorebiLight` | 木漏れ日の光斑 | `spots`, `direction` |
| `MoonHalo` | 月のハロー | `size`, `glow` |
| `FireworkBurst` | 放射線の花火 | `rays`, `once` |
| `TapeLabel` | 引き裂いたマスキングテープ | `children`, `angle`, `width` |
| `TypographicStamp` | インク欠けの判子 | `label`, `tone` |
| `HoleMask` | 円形の欠落 | `size`, `stitch`, `children` |
| `FractureFrame` | 内容を隠さない割れ目 | `pieces`, `children` |
| `BubbleField` | 水中の泡 | `count`, `release` |
| `WindPath` | 消え入る風の軌跡 | `seed`, `speed` |
| `SourceChip` | 一次 / 報道 / 二次の出典ラベル | `label`, `href`, `tier` |

```tsx
import { PaperTexture, FilmGrainOverlay, RisoText } from '@tatsuyamiura2667/akane-lib';

<div style={{ position: 'relative' }}>
  <PaperTexture tone="washi" />
  <RisoText as="h2" ink="#c8412f">茜色の誤差</RisoText>
  <FilmGrainOverlay intensity={0.12} />
</div>;
```

MV 資料はドキュメントサイトの「MV資料」「年表」「素材システム」から辿れます。歌詞・映像フレーム・キャラクターは複製していません。

---

## リリースノート

### Unreleased

- 43作品の MV モチーフを抽象化した MV マテリアル・ギャラリー、モチーフ年表、素材システムの3ページを追加しました。
- `FilmGrainOverlay` から `SourceChip` まで15個の画像不要マテリアル・プリミティブを追加しました。
- `--yk-*` の提案トークン12個と、4つのムードプリセットを追加しました。
- ホームに素材アーカイブ導線を追加し、Storybook を27ストーリーへ拡充しました。
- ドキュメントの背景から斜線模様を除去し、カセットテープと手帳の幅を可変化して重なりを解消しました。

### 0.4.8

- `SakuraThiefOverlay` に `petalCount` と `oilPaint` を追加し、花びらの枚数を 0〜160 で調整可能にしました。
- 画像不要の `OilPaintTexture` を追加し、空・紙・花びらへ筆致と厚塗りを重ねられるようにしました。
- 空の時間帯を 8 種類（群青 / 第一夜 / 夜明け / 朝霧 / 白昼 / 夕凪 / 金色 / 茜さす）へ拡張し、月・星・雲・露・夕日・遠花火を追加しました。
- `WhisperText` と CSS 3D の `RelicScene` を追加し、テレパスの雪海と昼鳶のダークな夜景を演出できるようにしました。
- ドキュメントサイト、Storybook（12 ストーリー）、モチーフ辞典、FAQ を全コンポーネント・全フェーズに追従させました。

---

## ライセンス

MIT
