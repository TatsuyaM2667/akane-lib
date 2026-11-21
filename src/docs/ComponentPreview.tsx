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
  type CassetteVariant,
  type RelicVariant,
  type WhisperAnimation,
} from '../index';
import { PHASES } from './content';

const PREVIEW_LINES = [
  { time: 0, text: '窓の外に、まだ夜が残っている' },
  { time: 4, text: '手帳の罫線をなぞる' },
  { time: 8, text: '白い百合を一輪、置いていく' },
];

function MaterialStage({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="docs-material-preview">
      <span className="docs-material-preview__label">{label}</span>
      <div className="docs-material-preview__stage">{children}</div>
    </div>
  );
}

const CASSETTE_VARIANTS: { id: CassetteVariant; label: string; note: string }[] = [
  { id: 'normal', label: 'NORMAL', note: '紙ラベル / 標準' },
  { id: 'chrome', label: 'CHROME', note: '黒艶 / 高域' },
  { id: 'metal', label: 'METAL', note: '銀灰 / 金属' },
  { id: 'clear', label: 'CLEAR', note: '透明殻 / 水色' },
  { id: 'archive', label: 'ARCHIVE', note: '褪せた紙 / 保管' },
];

const WHISPER_ANIMATIONS: { id: WhisperAnimation; label: string; note: string }[] = [
  { id: 'reveal', label: 'REVEAL', note: '滲んで浮かぶ' },
  { id: 'ink', label: 'INK', note: 'インクが滲む' },
  { id: 'flicker', label: 'FLICKER', note: '信号が途切れる' },
  { id: 'wave', label: 'WAVE', note: '波打って届く' },
  { id: 'drift', label: 'DRIFT', note: '遠くから漂う' },
];

function CassetteVariantsPreview() {
  return (
    <div className="docs-variant-gallery">
      {CASSETTE_VARIANTS.map((variant) => (
        <div className="docs-variant-card" key={variant.id}>
          <span className="docs-variant-card__label">{variant.label}</span>
          <CassettePlayer
            title="夢の記憶"
            variant={variant.id}
            durationSec={180}
          />
          <p className="docs-variant-card__note">{variant.note}</p>
        </div>
      ))}
    </div>
  );
}

function WhisperAnimationsPreview() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className="docs-variant-gallery docs-variant-gallery--wide">
      <button
        type="button"
        className="docs-plain-button docs-variant-gallery__replay"
        onClick={() => setReplayKey((key) => key + 1)}
      >
        アニメーションを再生し直す
      </button>
      {WHISPER_ANIMATIONS.map((item) => (
        <div className="docs-variant-card docs-variant-card--wide" key={item.id}>
          <span className="docs-variant-card__label">{item.label}</span>
          <div className="docs-preview__whisper docs-preview__whisper--telepath">
            <WhisperText
              key={`${item.id}-${replayKey}`}
              text="白い信号が、夜を渡っていく"
              animation={item.id}
              speedMs={45}
            />
          </div>
          <p className="docs-variant-card__note">{item.note}</p>
        </div>
      ))}
    </div>
  );
}

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
      <SakuraThiefOverlay density="gust" petalCount={count}>
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
  const [animation, setAnimation] = useState<WhisperAnimation>('reveal');
  const [line, setLine] = useState('言葉の代わりに、白い信号が降る');
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className="docs-preview__stack">
      <div className={`docs-preview__whisper docs-preview__whisper--${variant}`}>
        <WhisperText
          key={`${variant}-${animation}-${line}-${replayKey}`}
          text={line}
          variant={variant}
          animation={animation}
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
      <div className="docs-preview__row">
        {WHISPER_ANIMATIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="docs-plain-button"
            aria-pressed={animation === item.id}
            onClick={() => setAnimation(item.id)}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          className="docs-plain-button"
          onClick={() => setReplayKey((key) => key + 1)}
        >
          再生し直す
        </button>
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
      return (
        <div className="docs-preview__stack">
          <CassetteVariantsPreview />
          <div className="docs-variant-live">
            <span className="docs-variant-card__label">LIVE / SIDE A</span>
            <CassettePlayer side="A" title="サンプル — 夢の記憶" durationSec={14} />
          </div>
        </div>
      );
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
        <LetterCard date="独白の断片" signature="黒塗りをクリック">
          <TypewriterCensorText text={'書いたはずの[[言葉]]が、まだ読めない。'} speedMs={55} />
        </LetterCard>
      );
    case 'oil-paint-texture':
      return <OilPaintPreview />;
    case 'whisper-text':
      return (
        <div className="docs-preview__stack">
          <WhisperAnimationsPreview />
          <WhisperPreview />
        </div>
      );
    case 'relic-scene':
      return <RelicPreview />;
    case 'film-grain-overlay':
      return (
        <MaterialStage label="FE TURBULENCE">
          <p className="docs-material-preview__centered">粒子の粗さを、空気の密度に変える。</p>
          <FilmGrainOverlay intensity={0.18} />
        </MaterialStage>
      );
    case 'paper-tex':
      return (
        <MaterialStage label="FIBER / WASH">
          <PaperTexture tone="washi" />
          <p className="docs-material-preview__centered">和紙の繊維と、薄い洗いの跡。</p>
        </MaterialStage>
      );
    case 'halftone-dots':
      return (
        <MaterialStage label="HALFTONE">
          <HalftoneDots angle={45} density={7} tone="ink" />
          <p className="docs-material-preview__centered">網点は、光を一度紙に翻訳する。</p>
        </MaterialStage>
      );
    case 'vignette-lens':
      return (
        <MaterialStage label="LENS EDGE">
          <VignetteLens strength={0.55} />
          <p className="docs-material-preview__centered">視線を中央へ寄せる、静かな縁。</p>
        </MaterialStage>
      );
    case 'riso-text':
      return (
        <MaterialStage label="MISREGISTRATION">
          <RisoText as="h3" ink="var(--yk-accent-red)">
            茜色の誤差
          </RisoText>
          <p>刷りずれた数ミリが、文字に体温を与える。</p>
        </MaterialStage>
      );
    case 'komorebi-light':
      return (
        <MaterialStage label="THROUGH THE LEAVES">
          <KomorebiLight spots={11} direction="left" />
          <p className="docs-material-preview__centered">木漏れ日は、輪郭のない光斑から。</p>
        </MaterialStage>
      );
    case 'moon-halo':
      return (
        <MaterialStage label="MOONLIGHT">
          <MoonHalo size={170} glow={0.8} />
          <p className="docs-material-preview__centered">月は、圆盘ではなく周囲の滲みで在る。</p>
        </MaterialStage>
      );
    case 'firework-burst':
      return (
        <MaterialStage label="RADIAL LINES">
          <FireworkBurst rays={18} />
          <p className="docs-material-preview__centered">夏空に、短い放射線を描く。</p>
        </MaterialStage>
      );
    case 'tape-label':
      return (
        <MaterialStage label="ADHESIVE">
          <TapeLabel width={220} angle={-2}>
            八月、某、月明かり
          </TapeLabel>
          <p>引き裂いた端と、糊の筋を残す。</p>
        </MaterialStage>
      );
    case 'typographic-stamp':
      return (
        <MaterialStage label="INK GAP">
          <TypographicStamp label="承認" tone="crimson" />
          <p>押す力によって、インクは欠ける。</p>
        </MaterialStage>
      );
    case 'hole-mask':
      return (
        <MaterialStage label="CIRCULAR LOSS">
          <HoleMask size={150} stitch>
            <p className="docs-material-preview__centered">読める本文は、そのまま残ります。</p>
          </HoleMask>
        </MaterialStage>
      );
    case 'fracture-frame':
      return (
        <MaterialStage label="FRAGMENTS">
          <FractureFrame pieces={6}>
            <p className="docs-material-preview__centered">割れ目は、内容を隠さない。</p>
          </FractureFrame>
        </MaterialStage>
      );
    case 'bubble-field':
      return (
        <MaterialStage label="BUBBLE FIELD">
          <BubbleField count={14} release />
          <p className="docs-material-preview__centered">泡は、視点を替える合図。</p>
        </MaterialStage>
      );
    case 'wind-path':
      return (
        <MaterialStage label="CUBIC WIND">
          <WindPath seed={19} speed={7} />
          <p className="docs-material-preview__centered">風は線ではなく、消え入る軌跡。</p>
        </MaterialStage>
      );
    case 'source-chip':
      return (
        <MaterialStage label="SOURCE LAYER">
          <div className="docs-material-preview__chips">
            <SourceChip label="公式 BIOGRAPHY" tier="primary" href="https://yorushika.com/" />
            <SourceChip label="インタビュー" tier="press" />
            <SourceChip label="二次資料" tier="secondary" />
          </div>
          <p>一次・報道・二次を、見た目でも区別します。</p>
        </MaterialStage>
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
