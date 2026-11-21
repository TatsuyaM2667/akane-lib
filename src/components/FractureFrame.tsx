import React, { useMemo } from 'react';
import './FractureFrame.css';

export interface FractureFrameProps {
  pieces?: number;
  children: React.ReactNode;
  className?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export const FractureFrame: React.FC<FractureFrameProps> = ({
  pieces = 5,
  children,
  className = '',
}) => {
  const count = clamp(Math.round(pieces), 2, 10);
  const lines = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const x = ((index + 0.5) / count) * 100;
        const wave = Math.sin(index * 13.7 + 4.9);
        const lean = wave * (3 + (index % 3));
        return `M ${x.toFixed(2)} 0 L ${(x + lean).toFixed(2)} 32 L ${(x - lean * 0.6).toFixed(2)} 68 L ${(x + lean * 0.3).toFixed(2)} 100`;
      }),
    [count],
  );

  return (
    <div
      className={`akane-fracture ${className}`.trim()}
      data-akane-pieces={count}
    >
      <svg
        className="akane-fracture__lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {lines.map((line, index) => (
          <path key={index} d={line} />
        ))}
      </svg>
      <div className="akane-fracture__content">{children}</div>
    </div>
  );
};
