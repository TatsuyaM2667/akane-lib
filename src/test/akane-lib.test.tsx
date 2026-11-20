import { describe, expect, it, vi, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AkaneThemeProvider,
  useAkaneTheme,
  getSkyPhaseFromDate,
  TwilightSky,
  LetterCard,
  CassettePlayer,
  BookmarkRibbon,
  LyricLines,
  NotebookMemo,
  WhiteLilySeal,
  TrainWindowFrame,
  SakuraThiefOverlay,
  RainRippleButton,
  GhostFlowerRefraction,
  TypewriterCensorText,
} from '../index';

afterEach(() => {
  vi.useRealTimers();
});

describe('getSkyPhaseFromDate', () => {
  it('時間帯に応じて正しい SkyPhase を返す', () => {
    expect(getSkyPhaseFromDate(new Date(2026, 7, 31, 6, 0))).toBe('dawn');
    expect(getSkyPhaseFromDate(new Date(2026, 7, 31, 13, 0))).toBe('dusk');
    expect(getSkyPhaseFromDate(new Date(2026, 7, 31, 18, 30))).toBe('twilight');
    expect(getSkyPhaseFromDate(new Date(2026, 7, 31, 23, 30))).toBe('night');
    expect(getSkyPhaseFromDate(new Date(2026, 7, 31, 2, 0))).toBe('night');
  });
});

describe('AkaneThemeProvider & BookmarkRibbon', () => {
  it('栞をクリックするとテーマの phase が night に切り替わる', async () => {
    const user = userEvent.setup();

    function ThemeSwitcher() {
      const theme = useAkaneTheme();
      return (
        <TwilightSky>
          <span data-testid="current-phase">{theme?.phase}</span>
          <BookmarkRibbon
            chapter="三"
            title="第一夜"
            onClick={() => theme?.setPhase('night')}
          />
        </TwilightSky>
      );
    }

    const { container } = render(
      <AkaneThemeProvider defaultPhase="twilight">
        <ThemeSwitcher />
      </AkaneThemeProvider>
    );

    expect(screen.getByTestId('current-phase')).toHaveTextContent('twilight');
    expect(container.querySelector('[data-akane-phase="twilight"]')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /第一夜/ }));

    expect(screen.getByTestId('current-phase')).toHaveTextContent('night');
    expect(container.querySelector('[data-akane-phase="night"]')).toBeInTheDocument();
  });
});

describe('LetterCard & TrainWindowFrame & WhiteLilySeal', () => {
  it('日付・本文・署名と白百合封蝋が正しく描画される', () => {
    render(
      <TrainWindowFrame>
        <LetterCard date="八月三十一日" signature="エイミーへ" vertical>
          夏の終わりの匂いがした。
          <WhiteLilySeal caption="白い百合を一輪" />
        </LetterCard>
      </TrainWindowFrame>
    );

    expect(screen.getByText('八月三十一日')).toBeInTheDocument();
    expect(screen.getByText('夏の終わりの匂いがした。')).toBeInTheDocument();
    expect(screen.getByText('エイミーへ')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '白い百合を一輪' })).toBeInTheDocument();
  });
});

describe('CassettePlayer', () => {
  it('再生ボタン押下で時間が進み、onTimeUpdate が呼ばれ、一時停止で停止する', () => {
    vi.useFakeTimers();
    const handleTimeUpdate = vi.fn();

    render(
      <CassettePlayer
        side="A"
        title="第一夜 — 夢の記憶"
        durationSec={5}
        onTimeUpdate={handleTimeUpdate}
      />
    );

    expect(screen.getByText('00:00 / 00:05')).toBeInTheDocument();
    expect(handleTimeUpdate).toHaveBeenLastCalledWith(0);

    fireEvent.click(screen.getByRole('button', { name: '再生' }));
    expect(screen.getByRole('button', { name: '一時停止' })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText('00:03 / 00:05')).toBeInTheDocument();
    expect(handleTimeUpdate).toHaveBeenLastCalledWith(3);

    fireEvent.click(screen.getByRole('button', { name: '一時停止' }));
    expect(screen.getByRole('button', { name: '再生' })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('00:03 / 00:05')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '再生' }));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('00:00 / 00:05')).toBeInTheDocument();
    expect(handleTimeUpdate).toHaveBeenLastCalledWith(0);
  });
});

describe('LyricLines', () => {
  it('currentTime に応じて現在行と過去行のクラスが切り替わる', () => {
    const lines = [
      { time: 0, text: '一行目の歌詞' },
      { time: 5, text: '二行目の歌詞' },
      { time: 10, text: '三行目の歌詞' },
    ];

    render(<LyricLines lines={lines} currentTime={6} />);

    const line1 = screen.getByText('一行目の歌詞');
    const line2 = screen.getByText('二行目の歌詞');
    const line3 = screen.getByText('三行目の歌詞');

    expect(line1).toHaveClass('akane-lyrics__line--past');
    expect(line2).toHaveClass('akane-lyrics__line--active');
    expect(line3).not.toHaveClass('akane-lyrics__line--active');
    expect(line3).not.toHaveClass('akane-lyrics__line--past');
  });
});

describe('NotebookMemo', () => {
  it('テキスト入力・インク色変更・保存コールバックが動作する', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(<NotebookMemo date="朝の手帳" onSave={handleSave} />);

    const textarea = screen.getByPlaceholderText(/窓の向こうに触れ/);
    await user.type(textarea, '白ゆり香る道を走った');
    expect(screen.getByText('10字 綴った')).toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: '茜インク' }));
    await user.click(screen.getByRole('button', { name: '書き留める' }));

    expect(handleSave).toHaveBeenCalledWith({
      text: '白ゆり香る道を走った',
      ink: 'crimson',
      date: '朝の手帳',
    });
  });
});

describe('SakuraThiefOverlay & RainRippleButton', () => {
  it('桜吹雪レイヤーの切り替えと雨紋ボタンのクリックが動作する', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { container } = render(
      <SakuraThiefOverlay density="gust">
        <RainRippleButton onClick={handleClick}>雨とカプチーノ</RainRippleButton>
      </SakuraThiefOverlay>
    );

    expect(container.querySelector('.akane-sakura__layer--gust')).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: '雨とカプチーノ' });
    await user.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(container.querySelectorAll('.akane-ripple-btn__ring').length).toBe(2);
  });
});

describe('GhostFlowerRefraction', () => {
  it('水面の揺らぎ強度と残像アニメーションクラスが適用される', () => {
    const { container } = render(
      <GhostFlowerRefraction intensity="mirage" afterimage caustics>
        <span>花に亡霊の記憶</span>
      </GhostFlowerRefraction>
    );

    const wrapper = container.querySelector('[data-refraction-intensity="mirage"]');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('akane-refraction--afterimage');
    expect(container.querySelector('.akane-refraction__caustics')).toBeInTheDocument();
    expect(screen.getByText('花に亡霊の記憶')).toBeInTheDocument();
  });
});

describe('TypewriterCensorText', () => {
  it('タイプライター打鍵と検閲黒塗りのクリック解除が動作する', () => {
    vi.useFakeTimers();
    const handleComplete = vi.fn();

    render(
      <TypewriterCensorText
        text="言葉は[[思想犯]]のように"
        speedMs={50}
        onComplete={handleComplete}
      />
    );

    // 1文字ずつ進行
    for (let i = 0; i < 11; i++) {
      act(() => {
        vi.advanceTimersByTime(50);
      });
    }

    expect(handleComplete).toHaveBeenCalledTimes(1);

    const redacted = screen.getByRole('button', { name: '検閲された言葉（クリックで表示）' });
    expect(redacted).toHaveTextContent('思想犯');
    expect(redacted).not.toHaveClass('akane-censor-text__redact--revealed');

    fireEvent.click(redacted);
    expect(redacted).toHaveClass('akane-censor-text__redact--revealed');
  });
});
