import React from 'react';
import './HalftoneDots.css';

export type HalftoneTone = 'ink' | 'accent' | 'paper';

export interface HalftoneDotsProps {
  angle?: number;
  density?: number;
  tone?: HalftoneTone;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export const HalftoneDots: React.FC<HalftoneDotsProps> = ({
  angle = 45,
  density = 6,
  tone = 'ink',
  className = '',
}) => {
  const safeAngle = clamp(Math.round(angle), 0, 360);
  const safeDensity = clamp(Math.round(density), 2, 48);

  return (
    <span
      className={`akane-halftone akane-halftone--${tone} ${className}`.trim()}
      style={
        {
          '--akane-halftone-angle': `${safeAngle}deg`,
          '--akane-halftone-size': `${safeDensity}px`,
        } as React.CSSProperties
      }
      data-akane-angle={safeAngle}
      data-akane-density={safeDensity}
      aria-hidden="true"
    />
  );
};
