import React, { useMemo } from 'react';
import './WindPath.css';

export interface WindPathProps {
  seed?: number;
  speed?: number;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export const WindPath: React.FC<WindPathProps> = ({
  seed = 7,
  speed = 8,
  className = '',
}) => {
  const safeSeed = clamp(Math.round(seed), 0, 9999);
  const safeSpeed = clamp(speed, 1, 60);
  const paths = useMemo(
    () =>
      Array.from({ length: 3 }, (_, index) => {
        const base = safeSeed * 0.37 + index * 17;
        const y = 22 + index * 27 + (Math.sin(base) + 1) * 6;
        const c1x = 18 + (Math.sin(base + 1.4) + 1) * 12;
        const c1y = y - 14 - (Math.sin(base + 2.1) + 1) * 10;
        const c2x = 58 + (Math.sin(base + 3.3) + 1) * 12;
        const c2y = y + 12 + (Math.sin(base + 4.2) + 1) * 10;
        return `M -10 ${y.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, 110 ${(y - 4).toFixed(2)}`;
      }),
    [safeSeed],
  );

  return (
    <svg
      className={`akane-wind ${className}`.trim()}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ '--akane-wind-speed': `${safeSpeed}s` } as React.CSSProperties}
      data-akane-seed={safeSeed}
      data-akane-speed={safeSpeed}
      aria-hidden="true"
      focusable="false"
    >
      <g className="akane-wind__paths">
        {paths.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </g>
    </svg>
  );
};
