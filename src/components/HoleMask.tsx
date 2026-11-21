import React from 'react';
import './HoleMask.css';

export interface HoleMaskProps {
  size?: number;
  stitch?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export const HoleMask: React.FC<HoleMaskProps> = ({
  size = 96,
  stitch = true,
  children,
  className = '',
}) => {
  const safeSize = clamp(Math.round(size), 24, 400);

  return (
    <div
      className={`akane-hole ${stitch ? 'akane-hole--stitch' : ''} ${className}`.trim()}
      style={{ '--akane-hole-size': `${safeSize}px` } as React.CSSProperties}
      data-akane-size={safeSize}
    >
      <span className="akane-hole__ring" aria-hidden="true" />
      <div className="akane-hole__content">{children}</div>
    </div>
  );
};
