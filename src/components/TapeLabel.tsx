import React from 'react';
import './TapeLabel.css';

export interface TapeLabelProps {
  children: React.ReactNode;
  angle?: number;
  width?: number | string;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export const TapeLabel: React.FC<TapeLabelProps> = ({
  children,
  angle = -1.5,
  width = 180,
  className = '',
}) => {
  const safeAngle = clamp(angle, -30, 30);
  const safeWidth = typeof width === 'number' ? `${clamp(width, 24, 1200)}px` : width;

  return (
    <div
      className={`akane-tape ${className}`.trim()}
      style={
        {
          '--akane-tape-width': safeWidth,
          '--akane-tape-angle': `${safeAngle}deg`,
        } as React.CSSProperties
      }
      data-akane-angle={safeAngle}
    >
      <span className="akane-tape__stripe" aria-hidden="true" />
      <span className="akane-tape__content">{children}</span>
    </div>
  );
};
