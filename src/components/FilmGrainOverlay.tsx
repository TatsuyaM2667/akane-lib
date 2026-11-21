import React from 'react';
import './FilmGrainOverlay.css';

export interface FilmGrainOverlayProps {
  intensity?: number;
  animated?: boolean;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export const FilmGrainOverlay: React.FC<FilmGrainOverlayProps> = ({
  intensity = 0.12,
  animated = false,
  className = '',
}) => {
  const value = clamp(intensity, 0, 1);

  return (
    <span
      className={`akane-grain ${animated ? 'akane-grain--animated' : ''} ${className}`.trim()}
      style={{ '--akane-grain-opacity': value } as React.CSSProperties}
      data-akane-intensity={value}
      aria-hidden="true"
    />
  );
};
