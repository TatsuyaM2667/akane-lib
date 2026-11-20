import { useState } from 'react';
import {
  useAkaneTheme,
  SakuraThiefOverlay,
  BookmarkRibbon,
  RainRippleButton,
  NotebookMemo,
  CassettePlayer,
  TrainWindowFrame,
  LetterCard,
  LyricLines,
  WhiteLilySeal,
  GhostFlowerRefraction,
  TypewriterCensorText,
  WhisperText,
  RelicScene,
  type LyricLine,
  type RefractionIntensity,
} from '../index';
import { PHASES } from './content';

const FIRST_NIGHT_LINES: LyricLine[] = [
  { time: 0, text: 'あなただけを覚えている' },
  { time: 3, text: '雲の影が流れていく' },
  { time: 6, text: '白い百合を一輪持って、隣の街から帰ります' },
  { time: 9, text: '列車の窓を少し開いて、夜風が頬を撫でていく' },
];

const DEFAULT_MONOLOGUE =
  'もう忘れてしまったかな、夏の木陰に座ったまま、他人に理解されない言葉だけを[[思想犯]]のように打ち込んでいた。';

type SakuraMode = 'off' | 'light' | 'normal' | 'gust';

const SAKURA_CYCLE: SakuraMode[] = ['normal', 'gust', 'light', 'off'];
const SAKURA_PRESET_COUNT: Record<SakuraMode, number> = {
  off: 0,
  light: 6,
  normal: 11,
  gust: 16,
};
const SAKURA_LABELS: Record<SakuraMode, string> = {
  off: '桜吹雪: 静寂',
  light: '桜吹雪: 微風',
  normal: '桜吹雪: 春風',
  gust: '桜吹雪: 春泥棒',
};

const REFRACTION_CYCLE: RefractionIntensity[] = ['calm', 'ripple', 'mirage'];
const REFRACTION_LABELS: Record<RefractionIntensity, string> = {
  calm: '水面揺らぎ: 静水',
  ripple: '水面揺らぎ: さざ波',
  mirage: '水面揺らぎ: 陽炎',
};

export function Showcase() {
  const theme = useAkaneTheme();
  const [elapsed, setElapsed] = useState(0);
  const [savedMemo, setSavedMemo] = useState<string | null>(null);
  const [sakuraMode, setSakuraMode] = useState<SakuraMode>('normal');
  const [petalCount, setPetalCount] = useState(SAKURA_PRESET_COUNT.normal);
  const [refraction, setRefraction] = useState<RefractionIntensity>('calm');
  const [verticalCard, setVerticalCard] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const cycleSakura = () => {
    const next = SAKURA_CYCLE[(SAKURA_CYCLE.indexOf(sakuraMode) + 1) % SAKURA_CYCLE.length];
    setSakuraMode(next);
    setPetalCount(SAKURA_PRESET_COUNT[next] || SAKURA_PRESET_COUNT.normal);
  };

  const cycleRefraction = () => {
    const next =
      REFRACTION_CYCLE[(REFRACTION_CYCLE.indexOf(refraction) + 1) % REFRACTION_CYCLE.length];
    setRefraction(next);
  };

  return (
    <SakuraThiefOverlay
      active={sakuraMode !== 'off'}
      density={sakuraMode === 'off' ? 'normal' : sakuraMode}
      petalCount={petalCount}
      oilPaint
    >
      <div className="docs-showcase">
        <div className="docs-showcase__section-label">
          <span>01</span>
          <div>
            <h2>時間帯を選ぶ</h2>
            <p>栞をクリックすると、空と紙の色が四季の章のように切り替わります。</p>
          </div>
        </div>

        <nav className="docs-showcase__bookmarks" aria-label="時間帯の切り替え">
          {PHASES.map((phase) => (
            <BookmarkRibbon
              key={phase.id}
              chapter={phase.chapter}
              title={phase.name}
              onClick={() => theme?.setPhase(phase.id)}
            />
          ))}
        </nav>

        <div className="docs-showcase__section-label">
          <span>02</span>
          <div>
            <h2>演出を触る</h2>
            <p>桜の風、水面の揺らぎ、縦書き、打鍵のリプレイを組み合わせてみてください。</p>
          </div>
        </div>

        <div className="docs-showcase__controls">
          <RainRippleButton onClick={cycleSakura}>{SAKURA_LABELS[sakuraMode]}</RainRippleButton>
          <label className="docs-showcase__slider">
            <span>桜の枚数</span>
            <input
              type="range"
              min={0}
              max={160}
              step={1}
              value={petalCount}
              onChange={(event) => setPetalCount(Number(event.target.value))}
              aria-label="桜の枚数"
            />
            <output>{petalCount}</output>
          </label>
          <RainRippleButton onClick={cycleRefraction}>{REFRACTION_LABELS[refraction]}</RainRippleButton>
          <RainRippleButton onClick={() => setVerticalCard((v) => !v)}>
            {verticalCard ? '便箋: 縦書き' : '便箋: 横書き'}
          </RainRippleButton>
          <RainRippleButton onClick={() => setReplayKey((k) => k + 1)}>
            タイプライター再打鍵
          </RainRippleButton>
        </div>

        <div className="docs-showcase__grid">
          <NotebookMemo
            date="第一夜 — 朝の手帳"
            placeholder="窓の向こうに触れ、それを手帳に書き留める……（[[言葉]] で黒塗り指定も可）"
            onSave={({ text }) => {
              setSavedMemo(text);
              setReplayKey((k) => k + 1);
            }}
          />
          <CassettePlayer side="A" title="第一夜 — 夢の記憶" durationSec={14} onTimeUpdate={setElapsed} />
        </div>

        <div className="docs-showcase__section-label">
          <span>03</span>
          <div>
            <h2>記憶を綴る</h2>
            <p>車窓の向こうで、インクが滲む歌詞と手帳の一行が重なります。</p>
          </div>
        </div>

        <TrainWindowFrame>
          <GhostFlowerRefraction key={refraction} intensity={refraction} afterimage caustics>
            <LetterCard
              date="第一夜 / 花に亡霊"
              signature="ずっと待っていました"
              vertical={verticalCard}
              oilPaint
            >
              {savedMemo ? (
                <TypewriterCensorText key={`memo-${replayKey}`} text={savedMemo} speedMs={55} />
              ) : (
                <LyricLines lines={FIRST_NIGHT_LINES} currentTime={elapsed} vertical={verticalCard} />
              )}
              <div className="docs-showcase__seal">
                <WhiteLilySeal
                  caption={savedMemo ? '歌詞へ戻る' : '白い百合を一輪'}
                  onClick={() => {
                    setSavedMemo(null);
                    theme?.setPhase('night');
                  }}
                />
              </div>
            </LetterCard>
          </GhostFlowerRefraction>
        </TrainWindowFrame>

        <div className="docs-showcase__monologue">
          <LetterCard date="思想犯 — 独白の断片" signature="黒塗りをクリックして開示" oilPaint>
            <TypewriterCensorText
              key={`default-${replayKey}`}
              text={DEFAULT_MONOLOGUE}
              speedMs={60}
              revealOnHover
            />
          </LetterCard>
        </div>

        <div className="docs-showcase__section-label">
          <span>04</span>
          <div>
            <h2>テレパスと昼鳶</h2>
            <p>白い雪の記号と、夜景に潜む妬み。言葉にならない情景を文字と3Dの遺物で置いています。</p>
          </div>
        </div>

        <div className="docs-showcase__worlds">
          <section className="docs-world docs-world--telepath" aria-label="テレパスの世界">
            <RelicScene variant="telepath" count={18}>
              <WhisperText
                text="白く降る記号の中で、名前のない想いを送る"
                variant="telepath"
                speedMs={45}
              />
            </RelicScene>
            <p className="docs-world__caption">SNOW SEA / TELEPATH — 言葉が記号になったあとの共感</p>
          </section>
          <section className="docs-world docs-world--envy" aria-label="昼鳶の世界">
            <RelicScene variant="envy" count={14}>
              <WhisperText
                text="笑いながら夜景を数える、満たされない胸の音"
                variant="envy"
                speedMs={52}
              />
            </RelicScene>
            <p className="docs-world__caption">DIAMOND NIGHT / ENVY — 明るい昼に潜む闇</p>
          </section>
        </div>
      </div>
    </SakuraThiefOverlay>
  );
}
