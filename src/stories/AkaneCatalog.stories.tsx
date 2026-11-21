import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LetterCard,
  CassettePlayer,
  BookmarkRibbon,
  LyricLines,
  WhiteLilySeal,
  TrainWindowFrame,
  NotebookMemo,
  SakuraThiefOverlay,
  RainRippleButton,
  GhostFlowerRefraction,
  TypewriterCensorText,
  OilPaintTexture,
  WhisperText,
  RelicScene,
  FilmGrainOverlay,
  PaperTexture,
  HalftoneDots,
  VignetteLens,
  RisoText,
  KomorebiLight,
  MoonHalo,
  FireworkBurst,
  TapeLabel,
  TypographicStamp,
  HoleMask,
  FractureFrame,
  BubbleField,
  WindPath,
  SourceChip,
} from "../index";

const SAMPLE_LYRICS = [
  { time: 0, text: "あなただけを覚えている" },
  { time: 3, text: "雲の影が流れていく" },
  { time: 6, text: "白い百合を一輪持って、隣の街から帰ります" },
  { time: 9, text: "列車の窓を少し開いて、夜風が頬を撫でていく" },
];

function MaterialStoryFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        minHeight: "260px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "2rem",
        borderRadius: "12px",
        border: "1px solid var(--akane-paper-border)",
        background: "var(--akane-paper)",
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta = {
  title: "akane-lib/コンポーネントカタログ",
};
export default meta;

export const LetterCardStory: StoryObj<typeof LetterCard> = {
  name: "LetterCard（便箋）",
  args: {
    date: "八月三十一日",
    signature: "エイミーへ",
    vertical: false,
    children:
      "夏の終わりの匂いがした。言葉にすれば消えてしまいそうで、ただ茜色の空だけを覚えていた。",
  },
  argTypes: {
    vertical: { control: "boolean" },
    date: { control: "text" },
    signature: { control: "text" },
  },
  render: (args) => <LetterCard {...args} />,
};

export const CassettePlayerStory: StoryObj<typeof CassettePlayer> = {
  name: "CassettePlayer（カセットテープ）",
  args: {
    side: "A",
    variant: "normal",
    title: "第一夜 — 夢の記憶",
    durationSec: 180,
  },
  argTypes: {
    side: { control: "radio", options: ["A", "B"] },
    variant: {
      control: "radio",
      options: ["normal", "chrome", "metal", "clear", "archive"],
    },
    durationSec: { control: { type: "number", min: 10, max: 600 } },
  },
  render: (args) => <CassettePlayer {...args} />,
};

export const CassetteVariantsStory: StoryObj<typeof CassettePlayer> = {
  name: "CassettePlayer（5種類のテープ）",
  args: { title: "夢の記憶", durationSec: 180 },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
      }}
    >
      {(["normal", "chrome", "metal", "clear", "archive"] as const).map(
        (variant) => (
          <div
            key={variant}
            style={{
              padding: "1rem",
              borderRadius: "10px",
              border: "1px solid var(--akane-paper-border)",
            }}
          >
            <small
              style={{
                display: "block",
                marginBottom: "0.6rem",
                letterSpacing: "0.2em",
              }}
            >
              {variant.toUpperCase()}
            </small>
            <CassettePlayer title="夢の記憶" variant={variant} durationSec={180} />
          </div>
        ),
      )}
    </div>
  ),
};

export const LyricLinesStory: StoryObj<typeof LyricLines> = {
  name: "LyricLines（インク滲み歌詞）",
  args: {
    lines: SAMPLE_LYRICS,
    currentTime: 6,
    vertical: false,
    autoPlay: false,
  },
  argTypes: {
    currentTime: { control: { type: "range", min: 0, max: 12, step: 0.5 } },
    vertical: { control: "boolean" },
    autoPlay: { control: "boolean" },
  },
  render: (args) => (
    <LetterCard date="第一夜">
      <LyricLines {...args} />
    </LetterCard>
  ),
};

export const NotebookMemoStory: StoryObj<typeof NotebookMemo> = {
  name: "NotebookMemo（朝の手帳）",
  args: {
    date: "第一夜 — 朝の手帳",
    defaultInk: "blue-black",
    submitLabel: "書き留める",
  },
  argTypes: {
    defaultInk: {
      control: "radio",
      options: ["blue-black", "crimson", "sepia"],
    },
  },
  render: (args) => (
    <NotebookMemo {...args} onSave={(entry) => alert(JSON.stringify(entry))} />
  ),
};

export const TrainWindowAndLilyStory: StoryObj<typeof TrainWindowFrame> = {
  name: "TrainWindowFrame & WhiteLilySeal（夜列車と白百合）",
  args: {
    moving: true,
  },
  render: (args) => (
    <TrainWindowFrame {...args}>
      <LetterCard date="第一夜" signature="ずっと待っていました">
        <p style={{ margin: 0 }}>
          列車の窓を少し開いて、夜風が頬を撫でていく。
        </p>
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <WhiteLilySeal caption="白い百合を一輪" />
        </div>
      </LetterCard>
    </TrainWindowFrame>
  ),
};

export const SakuraAndRippleStory: StoryObj<typeof SakuraThiefOverlay> = {
  name: "SakuraThiefOverlay & RainRippleButton（桜吹雪と雨紋）",
  args: {
    active: true,
    density: "normal",
    petalCount: 48,
    oilPaint: false,
  },
  argTypes: {
    active: { control: "boolean" },
    density: { control: "radio", options: ["light", "normal", "gust"] },
    petalCount: { control: { type: "range", min: 0, max: 160, step: 1 } },
    oilPaint: { control: "boolean" },
  },
  render: (args) => (
    <SakuraThiefOverlay {...args}>
      <div
        style={{ minHeight: "320px", display: "grid", placeItems: "center" }}
      >
        <RainRippleButton>雨とカプチーノ</RainRippleButton>
      </div>
    </SakuraThiefOverlay>
  ),
};

export const GhostFlowerRefractionStory: StoryObj<
  typeof GhostFlowerRefraction
> = {
  name: "GhostFlowerRefraction（花に亡霊・水面の揺らぎ）",
  args: {
    intensity: "ripple",
    afterimage: true,
    caustics: true,
  },
  argTypes: {
    intensity: { control: "radio", options: ["calm", "ripple", "mirage"] },
    afterimage: { control: "boolean" },
    caustics: { control: "boolean" },
  },
  render: (args) => (
    <GhostFlowerRefraction {...args}>
      <LetterCard date="花に亡霊" signature="夏の匂いがした">
        <p style={{ margin: 0 }}>
          もう忘れてしまったかな、夏の木陰に座ったまま、水面の反射だけを眺めていた。
        </p>
      </LetterCard>
    </GhostFlowerRefraction>
  ),
};

export const TypewriterCensorTextStory: StoryObj<typeof TypewriterCensorText> =
  {
    name: "TypewriterCensorText（思想犯・タイプライター＆検閲）",
    args: {
      text: "他人に理解されない言葉だけを、[[思想犯]]のように原稿用紙へ打ち込んでいた。",
      speedMs: 65,
      revealOnHover: true,
      instant: false,
    },
    argTypes: {
      speedMs: { control: { type: "range", min: 20, max: 180, step: 5 } },
      revealOnHover: { control: "boolean" },
      instant: { control: "boolean" },
    },
    render: (args) => (
      <LetterCard date="思想犯 — 独白">
        <TypewriterCensorText {...args} />
      </LetterCard>
    ),
  };

export const BookmarkRibbonStory: StoryObj<typeof BookmarkRibbon> = {
  name: "BookmarkRibbon（栞）",
  args: {
    chapter: "三",
    title: "第一夜",
  },
  render: (args) => <BookmarkRibbon {...args} />,
};

export const OilPaintTextureStory: StoryObj<typeof OilPaintTexture> = {
  name: "OilPaintTexture（油絵の質感）",
  args: {
    variant: "sky",
    intensity: "normal",
  },
  argTypes: {
    variant: { control: "radio", options: ["sky", "paper", "petal"] },
    intensity: { control: "radio", options: ["subtle", "normal", "strong"] },
  },
  render: (args) => (
    <div
      style={{
        position: "relative",
        minHeight: "320px",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        borderRadius: "12px",
        background: "linear-gradient(140deg, #3d5a80, #b73b3a)",
        color: "#f7f4ee",
      }}
    >
      <OilPaintTexture {...args} />
      <p style={{ position: "relative", zIndex: 1 }}>
        画像なしの油絵テクスチャ
      </p>
    </div>
  ),
};

export const WhisperTextStory: StoryObj<typeof WhisperText> = {
  name: "WhisperText（届かない言葉）",
  args: {
    text: "白く降る記号の中で、名前のない想いを送る",
    variant: "telepath",
    animation: "reveal",
    speedMs: 45,
  },
  argTypes: {
    text: { control: "text" },
    variant: { control: "radio", options: ["telepath", "envy"] },
    animation: {
      control: "radio",
      options: ["reveal", "ink", "flicker", "wave", "drift"],
    },
    speedMs: { control: { type: "range", min: 10, max: 200, step: 5 } },
  },
  render: (args) => (
    <div
      style={{
        minHeight: "200px",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        borderRadius: "12px",
        background: args.variant === "envy" ? "#180d10" : "#101a26",
      }}
    >
      <WhisperText {...args} />
    </div>
  ),
};

export const WhisperAnimationsStory: StoryObj<typeof WhisperText> = {
  name: "WhisperText（5種類の出現モーション）",
  args: {
    text: "白い信号が、夜を渡っていく",
    variant: "telepath",
    speedMs: 45,
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1rem",
      }}
    >
      {(
        [
          ["reveal", "滲んで浮かぶ"],
          ["ink", "インクが滲む"],
          ["flicker", "信号が途切れる"],
          ["wave", "波打って届く"],
          ["drift", "遠くから漂う"],
        ] as const
      ).map(([animation, label]) => (
        <div
          key={animation}
          style={{
            minHeight: "140px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.75rem",
            padding: "1.25rem",
            borderRadius: "10px",
            background: "#101a26",
            color: "#e7f1f7",
          }}
        >
          <small style={{ letterSpacing: "0.2em", opacity: 0.7 }}>{label}</small>
          <WhisperText
            text="白い信号が、夜を渡っていく"
            animation={animation}
            speedMs={45}
          />
        </div>
      ))}
    </div>
  ),
};

export const RelicSceneStory: StoryObj<typeof RelicScene> = {
  name: "RelicScene（浮遊する遺物）",
  args: {
    variant: "telepath",
    count: 16,
  },
  argTypes: {
    variant: { control: "radio", options: ["telepath", "envy", "memories"] },
    count: { control: { type: "range", min: 0, max: 40, step: 1 } },
  },
  render: (args) => (
    <div style={{ minHeight: "300px" }}>
      <RelicScene {...args} className="story-relic-scene">
        <WhisperText
          text={
            args.variant === "envy"
              ? "笑いながら夜景を数える、満たされない胸の音"
              : "白く降る記号の中で、名前のない想いを送る"
          }
          variant={args.variant === "envy" ? "envy" : "telepath"}
          speedMs={48}
        />
      </RelicScene>
    </div>
  ),
};

export const FilmGrainOverlayStory: StoryObj<typeof FilmGrainOverlay> = {
  name: "FilmGrainOverlay（フィルム粒子）",
  args: { intensity: 0.14, animated: false },
  argTypes: {
    intensity: { control: { type: "range", min: 0, max: 1, step: 0.02 } },
    animated: { control: "boolean" },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <p>粒子の粗さを、空気の密度に変える。</p>
      <FilmGrainOverlay {...args} />
    </MaterialStoryFrame>
  ),
};

export const PaperTextureStory: StoryObj<typeof PaperTexture> = {
  name: "PaperTexture（紙の繊維）",
  args: { tone: "washi" },
  argTypes: {
    tone: { control: "radio", options: ["paper", "washi", "newsprint"] },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <PaperTexture {...args} />
      <p>和紙の繊維と、薄い洗いの跡。</p>
    </MaterialStoryFrame>
  ),
};

export const HalftoneDotsStory: StoryObj<typeof HalftoneDots> = {
  name: "HalftoneDots（網点）",
  args: { angle: 45, density: 7, tone: "ink" },
  argTypes: {
    angle: { control: { type: "range", min: 0, max: 360, step: 15 } },
    density: { control: { type: "range", min: 2, max: 48, step: 1 } },
    tone: { control: "radio", options: ["ink", "accent", "paper"] },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <HalftoneDots {...args} />
      <p>網点は、光を一度紙に翻訳する。</p>
    </MaterialStoryFrame>
  ),
};

export const VignetteLensStory: StoryObj<typeof VignetteLens> = {
  name: "VignetteLens（レンズ周縁）",
  args: { strength: 0.45 },
  argTypes: {
    strength: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <VignetteLens {...args} />
      <p>視線を中央へ寄せる、静かな縁。</p>
    </MaterialStoryFrame>
  ),
};

export const RisoTextStory: StoryObj<typeof RisoText> = {
  name: "RisoText（刷りずれた文字）",
  args: { children: "茜色の誤差", ink: "#c8412f", as: "h3" },
  argTypes: {
    ink: { control: "color" },
    as: { control: "radio", options: ["span", "h1", "h2", "h3", "p"] },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <RisoText {...args} />
      <p>刷りずれた数ミリが、文字に体温を与える。</p>
    </MaterialStoryFrame>
  ),
};

export const KomorebiLightStory: StoryObj<typeof KomorebiLight> = {
  name: "KomorebiLight（木漏れ日）",
  args: { spots: 11, direction: "left" },
  argTypes: {
    spots: { control: { type: "range", min: 1, max: 18, step: 1 } },
    direction: { control: "radio", options: ["left", "right"] },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <KomorebiLight {...args} />
      <p>木漏れ日は、輪郭のない光斑から。</p>
    </MaterialStoryFrame>
  ),
};

export const MoonHaloStory: StoryObj<typeof MoonHalo> = {
  name: "MoonHalo（月のハロー）",
  args: { size: 170, glow: 0.8 },
  argTypes: {
    size: { control: { type: "range", min: 24, max: 480, step: 4 } },
    glow: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <MoonHalo {...args} />
      <p>月は、円盤ではなく周囲の滲みで在る。</p>
    </MaterialStoryFrame>
  ),
};

export const FireworkBurstStory: StoryObj<typeof FireworkBurst> = {
  name: "FireworkBurst（放射花火）",
  args: { rays: 18, once: false },
  argTypes: {
    rays: { control: { type: "range", min: 6, max: 32, step: 1 } },
    once: { control: "boolean" },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <FireworkBurst {...args} />
      <p>夏空に、短い放射線を描く。</p>
    </MaterialStoryFrame>
  ),
};

export const TapeLabelStory: StoryObj<typeof TapeLabel> = {
  name: "TapeLabel（マスキングテープ）",
  args: { children: "八月、某、月明かり", width: 220, angle: -2 },
  argTypes: {
    width: { control: "text" },
    angle: { control: { type: "range", min: -30, max: 30, step: 0.5 } },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <TapeLabel {...args} />
      <p>引き裂いた端と、糊の筋を残す。</p>
    </MaterialStoryFrame>
  ),
};

export const TypographicStampStory: StoryObj<typeof TypographicStamp> = {
  name: "TypographicStamp（インクの判子）",
  args: { label: "承認", tone: "crimson" },
  argTypes: {
    label: { control: "text" },
    tone: { control: "radio", options: ["crimson", "ink", "sepia"] },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <TypographicStamp {...args} />
      <p>押す力によって、インクは欠ける。</p>
    </MaterialStoryFrame>
  ),
};

export const HoleMaskStory: StoryObj<typeof HoleMask> = {
  name: "HoleMask（円形の欠落）",
  args: { size: 140, stitch: true },
  argTypes: {
    size: { control: { type: "range", min: 24, max: 400, step: 4 } },
    stitch: { control: "boolean" },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <HoleMask {...args}>
        <p>読める本文は、そのまま残ります。</p>
      </HoleMask>
    </MaterialStoryFrame>
  ),
};

export const FractureFrameStory: StoryObj<typeof FractureFrame> = {
  name: "FractureFrame（割れ目の枠）",
  args: { pieces: 6, children: "割れても、読める。" },
  argTypes: {
    pieces: { control: { type: "range", min: 2, max: 10, step: 1 } },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <FractureFrame {...args} />
    </MaterialStoryFrame>
  ),
};

export const BubbleFieldStory: StoryObj<typeof BubbleField> = {
  name: "BubbleField（泡の群れ）",
  args: { count: 14, release: false },
  argTypes: {
    count: { control: { type: "range", min: 1, max: 24, step: 1 } },
    release: { control: "boolean" },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <BubbleField {...args} />
      <p>泡は、視点を替える合図。</p>
    </MaterialStoryFrame>
  ),
};

export const WindPathStory: StoryObj<typeof WindPath> = {
  name: "WindPath（風の軌跡）",
  args: { seed: 19, speed: 7 },
  argTypes: {
    seed: { control: { type: "range", min: 0, max: 99, step: 1 } },
    speed: { control: { type: "range", min: 2, max: 60, step: 1 } },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <WindPath {...args} />
      <p>風は線ではなく、消え入る軌跡。</p>
    </MaterialStoryFrame>
  ),
};

export const SourceChipStory: StoryObj<typeof SourceChip> = {
  name: "SourceChip（出典ラベル）",
  args: { label: "公式 BIOGRAPHY", tier: "primary", href: "https://yorushika.com/" },
  argTypes: {
    label: { control: "text" },
    tier: { control: "radio", options: ["primary", "press", "secondary"] },
  },
  render: (args) => (
    <MaterialStoryFrame>
      <SourceChip {...args} />
      <p>一次・報道・二次を、見た目でも区別します。</p>
    </MaterialStoryFrame>
  ),
};
