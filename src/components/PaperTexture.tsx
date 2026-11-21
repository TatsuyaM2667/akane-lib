import React from 'react';
import './PaperTexture.css';

export type PaperTone = 'paper' | 'washi' | 'newsprint';

export interface PaperTextureProps {
  tone?: PaperTone;
  className?: string;
}

export const PaperTexture: React.FC<PaperTextureProps> = ({
  tone = 'paper',
  className = '',
}) => (
  <span
    className={`akane-paper-tex akane-paper-tex--${tone} ${className}`.trim()}
    data-akane-tone={tone}
    aria-hidden="true"
  />
);
