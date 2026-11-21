import React from 'react';
import './TypographicStamp.css';

export type StampTone = 'crimson' | 'ink' | 'sepia';

export interface TypographicStampProps {
  label: string;
  tone?: StampTone;
  className?: string;
}

export const TypographicStamp: React.FC<TypographicStampProps> = ({
  label,
  tone = 'crimson',
  className = '',
}) => (
  <span
    className={`akane-stamp akane-stamp--${tone} ${className}`.trim()}
    data-akane-tone={tone}
  >
    <span className="akane-stamp__label">{label}</span>
  </span>
);
