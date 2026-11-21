import React, { useMemo } from 'react';
import './BubbleField.css';

export interface BubbleFieldProps {
  count?: number;
  release?: boolean;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

const seeded = (index: number, salt: number): number => {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export const BubbleField: React.FC<BubbleFieldProps> = ({
  count = 10,
  release = false,
  className = '',
}) => {
  const amount = clamp(Math.round(count), 1, 24);
  const bubbles = useMemo(
    () =>
      Array.from({ length: amount }, (_, index) => ({
        left: 4 + seeded(index, 1) * 90,
        bottom: seeded(index, 2) * 26,
        size: 5 + seeded(index, 3) * 16,
        duration: 5 + seeded(index, 4) * 7,
        delay: seeded(index, 5) * 6,
      })),
    [amount],
  );

  return (
    <span
      className={`akane-bubbles ${release ? 'akane-bubbles--release' : ''} ${className}`.trim()}
      data-akane-count={amount}
      aria-hidden="true"
    >
      {bubbles.map((bubble, index) => (
        <span
          key={index}
          className="akane-bubbles__bubble"
          style={
            {
              '--akane-bubble-left': `${bubble.left}%`,
              '--akane-bubble-bottom': `${bubble.bottom}%`,
              '--akane-bubble-size': `${bubble.size}px`,
              '--akane-bubble-duration': `${bubble.duration}s`,
              '--akane-bubble-delay': `${bubble.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
};
