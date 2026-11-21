import React, { useMemo } from 'react';
import './FireworkBurst.css';

export interface FireworkBurstProps {
  rays?: number;
  once?: boolean;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

const seeded = (index: number): number => {
  const value = Math.sin(index * 78.233 + 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

export const FireworkBurst: React.FC<FireworkBurstProps> = ({
  rays = 14,
  once = false,
  className = '',
}) => {
  const count = clamp(Math.round(rays), 6, 32);
  const lines = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const jitter = seeded(index + 1);
        const inner = 9 + jitter * 5;
        const outer = 38 + jitter * 10;
        return {
          x1: 50 + Math.cos(angle) * inner,
          y1: 50 + Math.sin(angle) * inner,
          x2: 50 + Math.cos(angle) * outer,
          y2: 50 + Math.sin(angle) * outer,
          width: 0.6 + jitter * 0.8,
        };
      }),
    [count],
  );

  return (
    <svg
      className={`akane-firework ${once ? 'akane-firework--once' : ''} ${className}`.trim()}
      viewBox="0 0 100 100"
      data-akane-rays={count}
      aria-hidden="true"
      focusable="false"
    >
      <g className="akane-firework__rays">
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            strokeWidth={line.width}
          />
        ))}
      </g>
    </svg>
  );
};
