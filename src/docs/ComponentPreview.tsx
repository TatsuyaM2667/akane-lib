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
  OilPaintTexture,
  WhisperText,
  RelicScene,
  type RelicVariant,
} from '../index';
import { PHASES } from './content';

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
      {PHASES.map((phase) => (
        <BookmarkRibbon
          key={phase.id}
          chapter={phase.chapter}
          title={phase.name}
          onClick={() => theme?.setPhase(phase.id)}
        />
      ))}
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

function SakuraPreview() {
  const [count, setCount] = useState(24);
  return (
    <div className="docs-preview__stack">
      <SakuraThiefOverlay density="gust" petalCount={count} oilPaint>
        <p className="docs-preview__centered">花びらの枚数を動かせます</p>
      </SakuraThiefOverlay>
      <label className="docs-preview__slider">
        <span>枚数</span>
        <input
          type="range"
          min={0}
          max={160}
          value={count}
          onChange={(event) => setCount(Number(event.target.value))}
          aria-label="花びらの枚数"
        />
        <output>{count}</output>
      </label>
    </div>
  );
}

function OilPaintPreview() {
  const [variant, setVariant] = useState<'sky' | 'paper' | 'petal'>('sky');
  return (
    <div className="docs-preview__stack">
      <div className="docs-preview__oil">
        <OilPaintTexture variant={variant} intensity="strong" />
        <p className="docs-preview__centered">{variant} / 厚塗り</p>
      </div>
      <div className="docs-preview__row">
        {(['sky', 'paper', 'petal'] as const).map((item) => (
          <button
            key={item}
            type="button"
            className="docs-plain-button"
            aria-pressed={variant === item}
            onClick={() => setVariant(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function WhisperPreview() {
  const [variant, setVariant] = useState<'telepath' | 'envy'>('telepath');
  const [line, setLine] = useState('言葉の代わりに、白い信号が降る');

  return (
    <div className="docs-preview__stack">
      <div className={`docs-preview__whisper docs-preview__whisper--${variant}`}>
        <WhisperText
          key={`${variant}-${line}`}
          text={line}
          variant={variant}
          speedMs={variant === 'telepath' ? 42 : 58}
        />
      </div>
      <input
        className="docs-preview__input"
        value={line}
        onChange={(event) => setLine(event.target.value)}
        aria-label="囁く文字"
      />
      <div className="docs-preview__row">
        {(['telepath', 'envy'] as const).map((item) => (
          <button
            key={item}
            type="button"
            className="docs-plain-button"
            aria-pressed={variant === item}
            onClick={() => setVariant(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function RelicPreview() {
  const [variant, setVariant] = useState<RelicVariant>('telepath');
  const [count, setCount] = useState(16);

  return (
    <div className="docs-preview__stack">
      <RelicScene variant={variant} count={count}>
        <WhisperText
          key={variant}
          text={
            variant === 'telepath'
              ? '白く降る記号の中で、名前のない想いを送る'
              : '夜景を数えるたび、胸の渇きが増える'
          }
          variant={variant === 'envy' ? 'envy' : 'telepath'}
          speedMs={48}
        />
      </RelicScene>
      <div className="docs-preview__row">
        {(['telepath', 'envy', 'memories'] as const).map((item) => (
          <button
            key={item}
            type="button"
            className="docs-plain-button"
            aria-pressed={variant === item}
            onClick={() => setVariant(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <label className="docs-preview__slider">
        <span>個数</span>
        <input
          type="range"
          min={0}
          max={40}
          value={count}
          onChange={(event) => setCount(Number(event.target.value))}
          aria-label="浮遊物の個数"
        />
        <output>{count}</output>
      </label>
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
          <TwilightSky ambient fireworks phase="night" oilPaint={false}>
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
      return <SakuraPreview />;
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
        <LetterCard date="独白の断片" signature="黒塗りをクリック" oilPaint>
          <TypewriterCensorText text={'書いたはずの[[言葉]]が、まだ読めない。'} speedMs={55} />
        </LetterCard>
      );
    case 'oil-paint-texture':
      return <OilPaintPreview />;
    case 'whisper-text':
      return <WhisperPreview />;
    case 'relic-scene':
      return <RelicPreview />;
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
