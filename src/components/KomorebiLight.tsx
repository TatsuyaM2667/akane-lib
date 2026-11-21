import React, { useMemo } from 'react';
import './KomorebiLight.css';

export type KomorebiDirection = 'left' | 'right';

export interface KomorebiLightProps {
  spots?: number;
  direction?: KomorebiDirection;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export const KomorebiLight: React.FC<KomorebiLightProps> = ({
  spots = 7,
  direction = 'left',
  className = '',
}) => {
  const count = clamp(Math.round(spots), 1, 18);
  const lights = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const spread = count === 1 ? 0.5 : index / (count - 1);
        const wave = (Math.sin(index * 19.7 + 2.3) + 1) / 2;
        const rawX = 6 + spread * 86;
        return {
          x: direction === 'left' ? rawX : 100 - rawX,
          y: 10 + wave * 72,
          size: 12 + wave * 24,
          blur: 10 + wave * 16,
          delay: wave * 5,
        };
      }),
    [count, direction],
  );

  return (
    <span
      className={`akane-komorebi akane-komorebi--${direction} ${className}`.trim()}
      data-akane-spots={count}
      aria-hidden="true"
    >
      {lights.map((light, index) => (
        <span
          key={index}
          className="akane-komorebi__spot"
          style={
            {
              '--akane-komorebi-x': `${light.x}%`,
              '--akane-komorebi-y': `${light.y}%`,
              '--akane-komorebi-size': `${light.size}px`,
              '--akane-komorebi-blur': `${light.blur}px`,
              '--akane-komorebi-delay': `${light.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
};
