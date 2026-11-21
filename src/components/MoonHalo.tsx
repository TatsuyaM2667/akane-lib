import React from 'react';
import './MoonHalo.css';

export interface MoonHaloProps {
  size?: number;
  glow?: number;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export const MoonHalo: React.FC<MoonHaloProps> = ({
  size = 120,
  glow = 0.6,
  className = '',
}) => {
  const safeSize = clamp(Math.round(size), 24, 480);
  const safeGlow = clamp(glow, 0, 1);

  return (
    <span
      className={`akane-moon-halo ${className}`.trim()}
      style={
        {
          '--akane-moon-size': `${safeSize}px`,
          '--akane-moon-glow': safeGlow,
        } as React.CSSProperties
      }
      data-akane-size={safeSize}
      data-akane-glow={safeGlow}
      aria-hidden="true"
    />
  );
};
