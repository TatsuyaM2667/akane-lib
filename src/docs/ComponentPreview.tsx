import { useState, type ReactNode } from 'react';
import {
  useAkaneTheme,
  TwilightSky,
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

const PREVIEW_LINES = [
  { time: 0, text: '窓の外に、まだ夜が残っている' },
  { time: 4, text: '手帳の罫線をなぞる' },
  { time: 8, text: '白い百合を一輪、置いていく' },
];

function ThemeProviderPreview() {
  const theme = useAkaneTheme();
  return (
    <div className="docs-theme-demo">
      <span>
        現在の空：<strong>{theme?.phase}</strong>
      </span>
      <div className="docs-theme-demo__actions">
        <RainRippleButton onClick={() => theme?.nextPhase()}>次の空へ</RainRippleButton>
        <button type="button" className="docs-plain-button" onClick={() => theme?.resetToSystemTime()}>
          現在時刻に戻す
        </button>
      </div>
    </div>
  );
}

function BookmarkPreview() {
  const theme = useAkaneTheme();
  return (
    <div className="docs-preview__row">
      <BookmarkRibbon chapter="一" title="夕凪" onClick={() => theme?.setPhase('dusk')} />
      <BookmarkRibbon chapter="二" title="茜さす" onClick={() => theme?.setPhase('twilight')} />
      <BookmarkRibbon chapter="三" title="第一夜" onClick={() => theme?.setPhase('night')} />
      <BookmarkRibbon chapter="四" title="夜明け" onClick={() => theme?.setPhase('dawn')} />
    </div>
  );
}

function SealPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="docs-preview__stack">
      <WhiteLilySeal caption="封を開ける" onClick={() => setOpen((v) => !v)} />
      <p>{open ? '手紙の中には、短い一行だけがありました。' : '封蝋をクリックしてみてください。'}</p>
    </div>
  );
}

function MemoPreview() {
  const [saved, setSaved] = useState<string | null>(null);
  return (
    <div className="docs-preview__stack">
      <NotebookMemo
        date="サンプルの手帳"
        placeholder="ここに一行、書き留めてみてください"
        onSave={({ text }) => setSaved(text)}
      />
      {saved && <p className="docs-preview__result">保存しました：{saved}</p>}
    </div>
  );
}

function RipplePreview() {
  const [count, setCount] = useState(0);
  return (
    <div className="docs-preview__stack">
      <RainRippleButton onClick={() => setCount((c) => c + 1)}>波紋を立てる</RainRippleButton>
      <p className="docs-preview__result">クリック回数：{count}</p>
    </div>
  );
}

function previewFor(slug: string): ReactNode {
  switch (slug) {
    case 'akane-theme-provider':
      return <ThemeProviderPreview />;
    case 'twilight-sky':
      return (
        <div className="docs-preview__sky">
          <TwilightSky ambient fireworks phase="night">
            <p>夜の空と遠花火</p>
          </TwilightSky>
        </div>
      );
    case 'letter-card':
      return (
        <LetterCard date="八月三十一日" signature="エイミーへ">
          夏の終わりの匂いがした。言葉にすれば消えてしまいそうで、ただ茜色の空だけを覚えていた。
        </LetterCard>
      );
    case 'cassette-player':
      return <CassettePlayer side="A" title="サンプル — 夢の記憶" durationSec={14} />;
    case 'bookmark-ribbon':
      return <BookmarkPreview />;
    case 'lyric-lines':
      return <LyricLines lines={PREVIEW_LINES} autoPlay loop />;
    case 'white-lily-seal':
      return <SealPreview />;
    case 'train-window-frame':
      return (
        <TrainWindowFrame>
          <LetterCard date="夜の列車" signature="窓の向こうへ">
            街灯りが後ろへ流れていく。
          </LetterCard>
        </TrainWindowFrame>
      );
    case 'notebook-memo':
      return <MemoPreview />;
    case 'sakura-thief-overlay':
      return (
        <SakuraThiefOverlay density="gust">
          <p className="docs-preview__centered">風に運ばれる花びら</p>
        </SakuraThiefOverlay>
      );
    case 'rain-ripple-button':
      return <RipplePreview />;
    case 'ghost-flower-refraction':
      return (
        <GhostFlowerRefraction intensity="mirage" afterimage caustics>
          <p className="docs-preview__centered">水面に映った記憶</p>
        </GhostFlowerRefraction>
      );
    case 'typewriter-censor-text':
      return (
        <LetterCard date="独白の断片" signature="黒塗りをクリック">
          <TypewriterCensorText text={'書いたはずの[[言葉]]が、まだ読めない。'} speedMs={55} />
        </LetterCard>
      );
    default:
      return null;
  }
}

export function ComponentPreview({ slug }: { slug: string }) {
  return (
    <div className="docs-preview">
      <div className="docs-preview__bar">
        <span>ライブプレビュー</span>
        <span>実際のコンポーネントを操作できます</span>
      </div>
      <div className="docs-preview__body">{previewFor(slug)}</div>
    </div>
  );
}
