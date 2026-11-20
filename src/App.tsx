import { useState } from 'react';
import {
  AkaneThemeProvider,
  useAkaneTheme,
  TwilightSky,
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
  type LyricLine,
  type RefractionIntensity,
} from './index';

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

function ShowcaseContent() {
  const theme = useAkaneTheme();
  const [elapsed, setElapsed] = useState(0);
  const [savedMemo, setSavedMemo] = useState<string | null>(null);
  const [sakuraMode, setSakuraMode] = useState<SakuraMode>('normal');
  const [refraction, setRefraction] = useState<RefractionIntensity>('calm');
  const [verticalCard, setVerticalCard] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const cycleSakura = () => {
    const next = SAKURA_CYCLE[(SAKURA_CYCLE.indexOf(sakuraMode) + 1) % SAKURA_CYCLE.length];
    setSakuraMode(next);
  };

  const cycleRefraction = () => {
    const next =
      REFRACTION_CYCLE[(REFRACTION_CYCLE.indexOf(refraction) + 1) % REFRACTION_CYCLE.length];
    setRefraction(next);
  };

  return (
    <TwilightSky ambient fireworks>
      <SakuraThiefOverlay
        active={sakuraMode !== 'off'}
        density={sakuraMode === 'off' ? 'normal' : sakuraMode}
      >
        <main
          style={{
            minHeight: '100vh',
            padding: '0 1.5rem 5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2.5rem',
          }}
        >
          {/* 1. 栞ナビゲーション */}
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <BookmarkRibbon chapter="一" title="夕凪" onClick={() => theme?.setPhase('dusk')} />
            <BookmarkRibbon chapter="二" title="茜さす" onClick={() => theme?.setPhase('twilight')} />
            <BookmarkRibbon chapter="三" title="第一夜" onClick={() => theme?.setPhase('night')} />
            <BookmarkRibbon chapter="四" title="夜明け" onClick={() => theme?.setPhase('dawn')} />
          </nav>

          {/* 2. 環境演出コントロール & Storybook カタログへの導線 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
            <RainRippleButton onClick={cycleSakura}>
              {SAKURA_LABELS[sakuraMode]}
            </RainRippleButton>
            <RainRippleButton onClick={cycleRefraction}>
              {REFRACTION_LABELS[refraction]}
            </RainRippleButton>
            <RainRippleButton onClick={() => setVerticalCard((v) => !v)}>
              {verticalCard ? '便箋: 縦書き' : '便箋: 横書き'}
            </RainRippleButton>
            <RainRippleButton onClick={() => setReplayKey((k) => k + 1)}>
              タイプライター再打鍵
            </RainRippleButton>
            <RainRippleButton onClick={() => window.location.assign('./storybook/')}>
              コンポーネントカタログ (Storybook)
            </RainRippleButton>
          </div>

          {/* 3. 朝の手帳メモ（[[言葉]] で黒塗り検閲にも対応） */}
          <NotebookMemo
            date="第一夜 — 朝の手帳"
            placeholder="窓の向こうに触れ、それを手帳に書き留める……（[[言葉]] で黒塗り指定も可）"
            onSave={({ text }) => {
              setSavedMemo(text);
              setReplayKey((k) => k + 1);
            }}
          />

          {/* 4. カセットプレイヤー */}
          <CassettePlayer
            side="A"
            title="第一夜 — 夢の記憶"
            durationSec={14}
            onTimeUpdate={setElapsed}
          />

          {/* 5. 夜列車の車窓 + 水面の揺らぎ + 便箋 + インク滲み歌詞 + 白百合の封蝋 */}
          <TrainWindowFrame>
            <GhostFlowerRefraction key={refraction} intensity={refraction} afterimage caustics>
              <LetterCard
                date="第一夜 / 花に亡霊"
                signature="ずっと待っていました"
                vertical={verticalCard}
              >
                {savedMemo ? (
                  <TypewriterCensorText key={`memo-${replayKey}`} text={savedMemo} speedMs={55} />
                ) : (
                  <LyricLines
                    lines={FIRST_NIGHT_LINES}
                    currentTime={elapsed}
                    vertical={verticalCard}
                  />
                )}
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
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

          {/* 6. 思想犯モチーフ：タイプライター＆黒塗り検閲カード */}
          <div style={{ width: '100%', maxWidth: '640px' }}>
            <LetterCard date="思想犯 — 独白の断片" signature="黒塗りをクリックして開示">
              <TypewriterCensorText
                key={`default-${replayKey}`}
                text={DEFAULT_MONOLOGUE}
                speedMs={60}
                revealOnHover
              />
            </LetterCard>
          </div>
        </main>
      </SakuraThiefOverlay>
    </TwilightSky>
  );
}

export function App() {
  return (
    <AkaneThemeProvider defaultPhase="night">
      <ShowcaseContent />
    </AkaneThemeProvider>
  );
}

export default App;
