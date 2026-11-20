import React, { useMemo } from 'react';
import { OilPaintTexture } from './OilPaintTexture';
import './SakuraThiefOverlay.css';

const DENSITY_COUNT = { light: 6, normal: 11, gust: 16 } as const;
const MAX_PETALS = 160;

function randomSeed(index: number): number {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function makePetal(index: number) {
  return {
    left: `${(randomSeed(index * 5 + 1) * 94 + 3).toFixed(1)}%`,
    size: Math.round(7 + randomSeed(index * 5 + 2) * 8),
    duration: `${(7 + randomSeed(index * 5 + 3) * 6).toFixed(1)}s`,
    delay: `${(randomSeed(index * 5 + 4) * 8).toFixed(1)}s`,
    drift: Math.round((randomSeed(index * 5 + 5) - 0.5) * 120),
  };
}

export interface SakuraThiefOverlayProps {
  children?: React.ReactNode;
  active?: boolean;
  density?: 'light' | 'normal' | 'gust';
  petalCount?: number;
  oilPaint?: boolean;
  className?: string;
}

const PETAL_SEEDS = [
  { left: '5%', size: 11, duration: '9.5s', delay: '0.2s' },
  { left: '13%', size: 9, duration: '11.2s', delay: '2.1s' },
  { left: '21%', size: 13, duration: '8.8s', delay: '4.4s' },
  { left: '29%', size: 10, duration: '12.0s', delay: '1.0s' },
  { left: '37%', size: 12, duration: '10.1s', delay: '3.3s' },
  { left: '45%', size: 8, duration: '11.8s', delay: '5.5s' },
  { left: '53%', size: 13, duration: '9.2s', delay: '0.7s' },
  { left: '61%', size: 10, duration: '10.7s', delay: '2.9s' },
  { left: '69%', size: 12, duration: '8.6s', delay: '4.8s' },
  { left: '77%', size: 9, duration: '11.5s', delay: '1.6s' },
  { left: '85%', size: 11, duration: '9.8s', delay: '3.9s' },
  { left: '93%', size: 10, duration: '10.4s', delay: '6.1s' },
  { left: '17%', size: 12, duration: '9.0s', delay: '6.8s' },
  { left: '49%', size: 9, duration: '10.9s', delay: '7.2s' },
  { left: '73%', size: 11, duration: '9.4s', delay: '5.1s' },
  { left: '89%', size: 13, duration: '8.9s', delay: '2.4s' },
];

export const SakuraThiefOverlay: React.FC<SakuraThiefOverlayProps> = ({
  children,
  active = true,
  density = 'normal',
  petalCount,
  oilPaint = false,
  className = '',
}) => {
  const count = Math.max(
    0,
    Math.min(Math.floor(petalCount ?? DENSITY_COUNT[density]), MAX_PETALS),
  );

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, index) =>
        index < PETAL_SEEDS.length
          ? { ...PETAL_SEEDS[index], drift: 90 }
          : makePetal(index),
      ),
    [count],
  );

  return (
    <div className={`akane-sakura ${className}`}>
      {active && (
        <div
          className={`akane-sakura__layer ${density === 'gust' ? 'akane-sakura__layer--gust' : ''}`}
          aria-hidden="true"
        >
          {oilPaint && <OilPaintTexture variant="petal" intensity="subtle" />}
          {petals.map((petal, idx) => (
            <span
              key={idx}
              className="akane-sakura__petal"
              style={
                {
                  left: petal.left,
                  width: `${petal.size}px`,
                  height: `${Math.round(petal.size * 0.65)}px`,
                  animationDuration: density === 'gust' ? '6.5s' : petal.duration,
                  animationDelay: petal.delay,
                  '--akane-petal-drift': `${petal.drift}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
      {children && <div className="akane-sakura__content">{children}</div>}
    </div>
  );
};
