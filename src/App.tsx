import { useState } from 'react';
import {
  AkaneThemeProvider,
  useAkaneTheme,
  LetterCard,
  TwilightSky,
  CassettePlayer,
  BookmarkRibbon,
  LyricLines,
  WhiteLilySeal,
  TrainWindowFrame,
  NotebookMemo,
  type LyricLine,
} from './index';

const INITIAL_LINES: LyricLine[] = [
  { time: 0, text: 'あなただけを覚えている' },
  { time: 3, text: '雲の影が流れていく' },
  { time: 6, text: '白い百合を一輪持って、隣の街から帰ります' },
  { time: 9, text: '列車の窓を少し開いて、夜風が頬を撫でていく' },
];

function ShowcaseContent() {
  const theme = useAkaneTheme();
  const [elapsed, setElapsed] = useState(0);
  const [savedMemo, setSavedMemo] = useState<string | null>(null);

  return (
    <TwilightSky ambient fireworks>
      <div
        style={{
          minHeight: '100vh',
          padding: '0 2rem 4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <BookmarkRibbon chapter="一" title="夕凪" onClick={() => theme?.setPhase('dusk')} />
          <BookmarkRibbon chapter="二" title="茜さす" onClick={() => theme?.setPhase('twilight')} />
          <BookmarkRibbon chapter="三" title="第一夜" onClick={() => theme?.setPhase('night')} />
          <BookmarkRibbon chapter="四" title="夜明け" onClick={() => theme?.setPhase('dawn')} />
        </nav>

        <NotebookMemo
          date="第一夜 — 朝の手帳"
          onSave={({ text }) => setSavedMemo(text)}
        />

        <CassettePlayer
          side="A"
          title="第一夜 — 夢の記憶"
          durationSec={14}
          onTimeUpdate={setElapsed}
        />

        <TrainWindowFrame>
          <LetterCard date="第一夜" signature="ずっと待っていました">
            {savedMemo ? (
              <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{savedMemo}</p>
            ) : (
              <LyricLines lines={INITIAL_LINES} currentTime={elapsed} />
            )}
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <WhiteLilySeal
                caption="白い百合を一輪"
                onClick={() => {
                  setSavedMemo(null);
                  theme?.setPhase('night');
                }}
              />
            </div>
          </LetterCard>
        </TrainWindowFrame>
      </div>
    </TwilightSky>
  );
}

export function App() {
  return (
    <AkaneThemeProvider defaultPhase="dawn">
      <ShowcaseContent />
    </AkaneThemeProvider>
  );
}

export default App;
