import type { Meta, StoryObj } from '@storybook/react-vite';
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
} from '../index';

const SAMPLE_LYRICS = [
  { time: 0, text: 'あなただけを覚えている' },
  { time: 3, text: '雲の影が流れていく' },
  { time: 6, text: '白い百合を一輪持って、隣の街から帰ります' },
  { time: 9, text: '列車の窓を少し開いて、夜風が頬を撫でていく' },
];

const meta: Meta = {
  title: 'akane-lib/コンポーネントカタログ',
};
export default meta;

export const LetterCardStory: StoryObj<typeof LetterCard> = {
  name: 'LetterCard（便箋）',
  args: {
    date: '八月三十一日',
    signature: 'エイミーへ',
    vertical: false,
    children: '夏の終わりの匂いがした。言葉にすれば消えてしまいそうで、ただ茜色の空だけを覚えていた。',
  },
  argTypes: {
    vertical: { control: 'boolean' },
    date: { control: 'text' },
    signature: { control: 'text' },
  },
  render: (args) => <LetterCard {...args} />,
};

export const CassettePlayerStory: StoryObj<typeof CassettePlayer> = {
  name: 'CassettePlayer（カセットテープ）',
  args: {
    side: 'A',
    title: '第一夜 — 夢の記憶',
    durationSec: 180,
  },
  argTypes: {
    side: { control: 'radio', options: ['A', 'B'] },
    durationSec: { control: { type: 'number', min: 10, max: 600 } },
  },
  render: (args) => <CassettePlayer {...args} />,
};

export const LyricLinesStory: StoryObj<typeof LyricLines> = {
  name: 'LyricLines（インク滲み歌詞）',
  args: {
    lines: SAMPLE_LYRICS,
    currentTime: 6,
    vertical: false,
    autoPlay: false,
  },
  argTypes: {
    currentTime: { control: { type: 'range', min: 0, max: 12, step: 0.5 } },
    vertical: { control: 'boolean' },
    autoPlay: { control: 'boolean' },
  },
  render: (args) => (
    <LetterCard date="第一夜">
      <LyricLines {...args} />
    </LetterCard>
  ),
};

export const NotebookMemoStory: StoryObj<typeof NotebookMemo> = {
  name: 'NotebookMemo（朝の手帳）',
  args: {
    date: '第一夜 — 朝の手帳',
    defaultInk: 'blue-black',
    submitLabel: '書き留める',
  },
  argTypes: {
    defaultInk: { control: 'radio', options: ['blue-black', 'crimson', 'sepia'] },
  },
  render: (args) => <NotebookMemo {...args} onSave={(entry) => alert(JSON.stringify(entry))} />,
};

export const TrainWindowAndLilyStory: StoryObj<typeof TrainWindowFrame> = {
  name: 'TrainWindowFrame & WhiteLilySeal（夜列車と白百合）',
  args: {
    moving: true,
  },
  render: (args) => (
    <TrainWindowFrame {...args}>
      <LetterCard date="第一夜" signature="ずっと待っていました">
        <p style={{ margin: 0 }}>列車の窓を少し開いて、夜風が頬を撫でていく。</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <WhiteLilySeal caption="白い百合を一輪" />
        </div>
      </LetterCard>
    </TrainWindowFrame>
  ),
};

export const SakuraAndRippleStory: StoryObj<typeof SakuraThiefOverlay> = {
  name: 'SakuraThiefOverlay & RainRippleButton（桜吹雪と雨紋）',
  args: {
    active: true,
    density: 'normal',
  },
  argTypes: {
    active: { control: 'boolean' },
    density: { control: 'radio', options: ['light', 'normal', 'gust'] },
  },
  render: (args) => (
    <SakuraThiefOverlay {...args}>
      <div style={{ minHeight: '320px', display: 'grid', placeItems: 'center' }}>
        <RainRippleButton>雨とカプチーノ</RainRippleButton>
      </div>
    </SakuraThiefOverlay>
  ),
};

export const GhostFlowerRefractionStory: StoryObj<typeof GhostFlowerRefraction> = {
  name: 'GhostFlowerRefraction（花に亡霊・水面の揺らぎ）',
  args: {
    intensity: 'ripple',
    afterimage: true,
    caustics: true,
  },
  argTypes: {
    intensity: { control: 'radio', options: ['calm', 'ripple', 'mirage'] },
    afterimage: { control: 'boolean' },
    caustics: { control: 'boolean' },
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

export const TypewriterCensorTextStory: StoryObj<typeof TypewriterCensorText> = {
  name: 'TypewriterCensorText（思想犯・タイプライター＆検閲）',
  args: {
    text: '他人に理解されない言葉だけを、[[思想犯]]のように原稿用紙へ打ち込んでいた。',
    speedMs: 65,
    revealOnHover: true,
    instant: false,
  },
  argTypes: {
    speedMs: { control: { type: 'range', min: 20, max: 180, step: 5 } },
    revealOnHover: { control: 'boolean' },
    instant: { control: 'boolean' },
  },
  render: (args) => (
    <LetterCard date="思想犯 — 独白">
      <TypewriterCensorText {...args} />
    </LetterCard>
  ),
};

export const BookmarkRibbonStory: StoryObj<typeof BookmarkRibbon> = {
  name: 'BookmarkRibbon（栞）',
  args: {
    chapter: '三',
    title: '第一夜',
  },
  render: (args) => <BookmarkRibbon {...args} />,
};
