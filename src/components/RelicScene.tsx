import React from 'react';
import './RelicScene.css';

export type RelicVariant = 'telepath' | 'envy' | 'memories';

export interface RelicSceneProps {
  variant?: RelicVariant;
  count?: number;
  className?: string;
  children?: React.ReactNode;
}

const OBJECTS: Record<RelicVariant, string[]> = {
  telepath: ['plane', 'ring', 'snow', 'plane', 'ring', 'snow'],
  envy: ['shard', 'crow', 'shard', 'ring', 'snow'],
  memories: ['cassette', 'plane', 'ring', 'snow', 'cassette'],
};

const seeded = (index: number, salt: number): number => {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export const RelicScene: React.FC<RelicSceneProps> = ({
  variant = 'telepath',
  count = 14,
  className = '',
  children,
}) => {
  const amount = Math.max(0, Math.min(40, Math.round(count)));
  const types = OBJECTS[variant];

  return (
    <div className={`akane-relic akane-relic--${variant} ${className}`.trim()}>
      <div className="akane-relic__scene" aria-hidden="true">
        {Array.from({ length: amount }, (_, index) => {
          const type = types[index % types.length];
          const scale = 0.55 + seeded(index, 3) * 0.9;
          const rotate = -35 + seeded(index, 4) * 70;
          const tilt = type === 'ring' ? 72 : 0;

          return (
            <span
              key={index}
              className={`akane-relic__object akane-relic__object--${type}`}
              style={
                {
                  left: `${8 + seeded(index, 1) * 82}%`,
                  top: `${12 + seeded(index, 2) * 70}%`,
                  '--akane-relic-duration': `${7 + seeded(index, 5) * 8}s`,
                  '--akane-relic-delay': `${-seeded(index, 6) * 12}s`,
                  '--akane-relic-rise': `${-12 - seeded(index, 7) * 26}px`,
                } as React.CSSProperties
              }
            >
              <span
                className="akane-relic__inner"
                style={{
                  transform: `scale(${scale}) rotate(${rotate}deg) rotateY(${tilt}deg)`,
                }}
              />
            </span>
          );
        })}
      </div>
      {children ? <div className="akane-relic__content">{children}</div> : null}
    </div>
  );
};
