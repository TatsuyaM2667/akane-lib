import React from 'react';
import './VignetteLens.css';

export interface VignetteLensProps {
  strength?: number;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export const VignetteLens: React.FC<VignetteLensProps> = ({
  strength = 0.35,
  className = '',
}) => {
  const value = clamp(strength, 0, 1);

  return (
    <span
      className={`akane-vignette ${className}`.trim()}
      style={{ '--akane-vignette-strength': value } as React.CSSProperties}
      data-akane-strength={value}
      aria-hidden="true"
    />
  );
};
