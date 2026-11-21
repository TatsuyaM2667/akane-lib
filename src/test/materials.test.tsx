import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
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
} from '../index';

describe('新しいマテリアル・プリミティブ', () => {
  it('15個のコンポーネントがそれぞれ描画される', () => {
    const { container } = render(
      <div>
        <FilmGrainOverlay />
        <PaperTexture />
        <HalftoneDots />
        <VignetteLens />
        <RisoText>茜色の文字</RisoText>
        <KomorebiLight />
        <MoonHalo />
        <FireworkBurst />
        <TapeLabel>付箋</TapeLabel>
        <TypographicStamp label="承認" />
        <HoleMask>穴</HoleMask>
        <FractureFrame>割れ目</FractureFrame>
        <BubbleField />
        <WindPath />
        <SourceChip label="参考資料" />
      </div>,
    );

    const selectors = [
      '.akane-grain',
      '.akane-paper-tex',
      '.akane-halftone',
      '.akane-vignette',
      '.akane-riso',
      '.akane-komorebi',
      '.akane-moon-halo',
      '.akane-firework',
      '.akane-tape',
      '.akane-stamp',
      '.akane-hole',
      '.akane-fracture',
      '.akane-bubbles',
      '.akane-wind',
      '.akane-source-chip',
    ];

    selectors.forEach((selector) => {
      expect(container.querySelector(selector)).toBeInTheDocument();
    });

    expect(screen.getByText('付箋')).toBeInTheDocument();
    expect(screen.getByText('承認')).toBeInTheDocument();
    expect(screen.getByText('割れ目')).toBeInTheDocument();
    expect(screen.getByText('参考資料')).toBeInTheDocument();
  });

  it('装飾レイヤーには aria-hidden が付く', () => {
    const { container } = render(
      <div>
        <FilmGrainOverlay />
        <PaperTexture />
        <HalftoneDots />
        <VignetteLens />
        <KomorebiLight />
        <MoonHalo />
        <FireworkBurst />
        <BubbleField />
        <WindPath />
        <RisoText>本文</RisoText>
        <TapeLabel>張る</TapeLabel>
        <HoleMask>読める本文</HoleMask>
        <FractureFrame>読める本文</FractureFrame>
      </div>,
    );

    const decorative = [
      '.akane-grain',
      '.akane-paper-tex',
      '.akane-halftone',
      '.akane-vignette',
      '.akane-komorebi',
      '.akane-moon-halo',
      '.akane-firework',
      '.akane-bubbles',
      '.akane-wind',
      '.akane-riso__ghost',
      '.akane-tape__stripe',
      '.akane-hole__ring',
      '.akane-fracture__lines',
    ];

    decorative.forEach((selector) => {
      expect(container.querySelector(selector)).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    });

    expect(screen.getAllByText('読める本文')).toHaveLength(2);
  });

  it('数値 props は範囲内にクランプされる', () => {
    const { container } = render(
      <div>
        <FilmGrainOverlay intensity={4} />
        <FilmGrainOverlay intensity={-2} />
        <HalftoneDots angle={720} density={200} />
        <HalftoneDots angle={-30} density={0} />
        <VignetteLens strength={3} />
        <VignetteLens strength={-1} />
        <KomorebiLight spots={99} />
        <KomorebiLight spots={0} />
        <MoonHalo size={9999} glow={5} />
        <MoonHalo size={0} glow={-3} />
        <FireworkBurst rays={99} />
        <FireworkBurst rays={1} />
        <TapeLabel angle={90}>角度</TapeLabel>
        <HoleMask size={9999}>穴</HoleMask>
        <HoleMask size={-4}>穴</HoleMask>
        <FractureFrame pieces={99}>割れ</FractureFrame>
        <FractureFrame pieces={1}>割れ</FractureFrame>
        <BubbleField count={99} />
        <BubbleField count={0} />
        <WindPath seed={-10} speed={999} />
      </div>,
    );

    const attr = (selector: string, name: string) =>
      container.querySelector(selector)?.getAttribute(name);

    const styleVar = (selector: string, name: string) =>
      (container.querySelector(selector) as HTMLElement | null)?.style.getPropertyValue(name);

    expect(attr('.akane-grain', 'data-akane-intensity')).toBe('1');
    expect(
      container.querySelectorAll('.akane-grain')[1].getAttribute('data-akane-intensity'),
    ).toBe('0');
    expect(styleVar('.akane-grain', '--akane-grain-opacity')).toBe('1');

    expect(attr('.akane-halftone', 'data-akane-angle')).toBe('360');
    expect(attr('.akane-halftone', 'data-akane-density')).toBe('48');
    expect(
      container.querySelectorAll('.akane-halftone')[1].getAttribute('data-akane-angle'),
    ).toBe('0');
    expect(
      container.querySelectorAll('.akane-halftone')[1].getAttribute('data-akane-density'),
    ).toBe('2');
    expect(styleVar('.akane-halftone', '--akane-halftone-size')).toBe('48px');

    expect(attr('.akane-vignette', 'data-akane-strength')).toBe('1');
    expect(
      container.querySelectorAll('.akane-vignette')[1].getAttribute('data-akane-strength'),
    ).toBe('0');

    expect(attr('.akane-komorebi', 'data-akane-spots')).toBe('18');
    expect(
      container.querySelectorAll('.akane-komorebi')[1].getAttribute('data-akane-spots'),
    ).toBe('1');
    expect(container.querySelector('.akane-komorebi')?.children).toHaveLength(18);

    expect(attr('.akane-moon-halo', 'data-akane-size')).toBe('480');
    expect(attr('.akane-moon-halo', 'data-akane-glow')).toBe('1');
    expect(
      container.querySelectorAll('.akane-moon-halo')[1].getAttribute('data-akane-size'),
    ).toBe('24');
    expect(
      container.querySelectorAll('.akane-moon-halo')[1].getAttribute('data-akane-glow'),
    ).toBe('0');
    expect(styleVar('.akane-moon-halo', '--akane-moon-size')).toBe('480px');

    expect(attr('.akane-firework', 'data-akane-rays')).toBe('32');
    expect(
      container.querySelectorAll('.akane-firework')[1].getAttribute('data-akane-rays'),
    ).toBe('6');
    expect(container.querySelector('.akane-firework')?.querySelectorAll('line')).toHaveLength(32);

    expect(attr('.akane-tape', 'data-akane-angle')).toBe('30');
    expect(styleVar('.akane-tape', '--akane-tape-angle')).toBe('30deg');
    expect(styleVar('.akane-tape', '--akane-tape-width')).toBe('180px');

    expect(attr('.akane-hole', 'data-akane-size')).toBe('400');
    expect(
      container.querySelectorAll('.akane-hole')[1].getAttribute('data-akane-size'),
    ).toBe('24');
    expect(styleVar('.akane-hole', '--akane-hole-size')).toBe('400px');

    expect(attr('.akane-fracture', 'data-akane-pieces')).toBe('10');
    expect(
      container.querySelectorAll('.akane-fracture')[1].getAttribute('data-akane-pieces'),
    ).toBe('2');
    expect(
      container.querySelector('.akane-fracture')?.querySelectorAll('path'),
    ).toHaveLength(10);

    expect(attr('.akane-bubbles', 'data-akane-count')).toBe('24');
    expect(
      container.querySelectorAll('.akane-bubbles')[1].getAttribute('data-akane-count'),
    ).toBe('1');
    expect(container.querySelector('.akane-bubbles')?.children).toHaveLength(24);

    expect(attr('.akane-wind', 'data-akane-seed')).toBe('0');
    expect(attr('.akane-wind', 'data-akane-speed')).toBe('60');
    expect(styleVar('.akane-wind', '--akane-wind-speed')).toBe('60s');
    expect(container.querySelector('.akane-wind')?.querySelectorAll('path')).toHaveLength(3);
  });

  it('RisoText の本文はスクリーンリーダーに一度だけ読まれる', () => {
    const { container } = render(
      <RisoText as="p" ink="#b73b3a" className="custom">
        茜さす駅
      </RisoText>,
    );

    expect(screen.getAllByText('茜さす駅')).toHaveLength(1);
    expect(screen.getByText('茜さす駅').tagName).toBe('P');
    expect(screen.getByText('茜さす駅')).toHaveClass('custom');
    expect(container.querySelector('.akane-riso')).toHaveAttribute('data-ink', '#b73b3a');
    expect(container.querySelector('.akane-riso__ghost')).toHaveAttribute(
      'data-text',
      '茜さす駅',
    );
  });

  it('SourceChip は href があればリンクとして描画される', () => {
    const { container, rerender } = render(
      <SourceChip label="一次資料" href="https://example.test/source" tier="primary" />,
    );

    const link = screen.getByRole('link', { name: /一次資料/ });
    expect(link).toHaveAttribute('href', 'https://example.test/source');
    expect(link).toHaveClass('akane-source-chip--primary');
    expect(screen.getByText('一次')).toBeInTheDocument();
    expect(container.querySelector('span.akane-source-chip')).not.toBeInTheDocument();

    rerender(<SourceChip label="二次資料" tier="secondary" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('二次')).toBeInTheDocument();
    expect(screen.getByText('二次資料').closest('.akane-source-chip')).toHaveClass(
      'akane-source-chip--secondary',
    );
  });

  it('Deterministic な形状は同じ props で常に同じになる', () => {
    const { container: first } = render(<FireworkBurst rays={12} />);
    const firstLines = Array.from(first.querySelectorAll('line')).map((line) =>
      [line.getAttribute('x1'), line.getAttribute('y1'), line.getAttribute('x2'), line.getAttribute('y2')].join(','),
    );

    const { container: second } = render(<FireworkBurst rays={12} />);
    const secondLines = Array.from(second.querySelectorAll('line')).map((line) =>
      [line.getAttribute('x1'), line.getAttribute('y1'), line.getAttribute('x2'), line.getAttribute('y2')].join(','),
    );
    expect(secondLines).toEqual(firstLines);

    const { container: firstWind } = render(<WindPath seed={11} />);
    const firstPaths = Array.from(firstWind.querySelectorAll('path')).map((path) =>
      path.getAttribute('d'),
    );
    const { container: secondWind } = render(<WindPath seed={11} />);
    const secondPaths = Array.from(secondWind.querySelectorAll('path')).map((path) =>
      path.getAttribute('d'),
    );
    expect(secondPaths).toEqual(firstPaths);
  });

  it('すべてのコンポーネントが className を保持する', () => {
    const { container } = render(
      <div>
        <FilmGrainOverlay className="test-a" />
        <PaperTexture className="test-b" />
        <HalftoneDots className="test-c" />
        <VignetteLens className="test-d" />
        <RisoText className="test-e">文字</RisoText>
        <KomorebiLight className="test-f" />
        <MoonHalo className="test-g" />
        <FireworkBurst className="test-h" />
        <TapeLabel className="test-i">ラベル</TapeLabel>
        <TypographicStamp label="判子" className="test-j" />
        <HoleMask className="test-k">本文</HoleMask>
        <FractureFrame className="test-l">本文</FractureFrame>
        <BubbleField className="test-m" />
        <WindPath className="test-n" />
        <SourceChip label="出典" className="test-o" />
      </div>,
    );

    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'].forEach(
      (suffix) => {
        expect(container.querySelector(`.test-${suffix}`)).toBeInTheDocument();
      },
    );
  });

  it('バリエーションに応じたクラスとトーンが適用される', () => {
    const { container } = render(
      <div>
        <PaperTexture tone="washi" />
        <HalftoneDots tone="accent" />
        <KomorebiLight direction="right" />
        <FireworkBurst once />
        <TypographicStamp label="承認" tone="sepia" />
        <BubbleField release />
      </div>,
    );

    expect(container.querySelector('.akane-paper-tex')).toHaveClass('akane-paper-tex--washi');
    expect(container.querySelector('.akane-halftone')).toHaveClass('akane-halftone--accent');
    expect(container.querySelector('.akane-komorebi')).toHaveClass('akane-komorebi--right');
    expect(container.querySelector('.akane-firework')).toHaveClass('akane-firework--once');
    expect(container.querySelector('.akane-stamp')).toHaveClass('akane-stamp--sepia');
    expect(container.querySelector('.akane-bubbles')).toHaveClass('akane-bubbles--release');
  });
});
