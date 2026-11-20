import React from 'react';
import { OilPaintTexture } from './OilPaintTexture';
import './LetterCard.css';

export interface LetterCardProps {
  children: React.ReactNode;
  date?: string;
  signature?: string;
  vertical?: boolean;
  oilPaint?: boolean;
  className?: string;
}

export const LetterCard: React.FC<LetterCardProps> = ({
  children,
  date,
  signature,
  vertical = false,
  oilPaint = false,
  className = '',
}) => {
  return (
    <article
      className={`akane-letter ${vertical ? 'akane-letter--vertical' : ''} ${className}`}
    >
      {oilPaint && <OilPaintTexture variant="paper" intensity="subtle" />}
      {date && <time className="akane-letter__date">{date}</time>}
      <div className="akane-letter__body">{children}</div>
      {signature && <footer className="akane-letter__signature">{signature}</footer>}
    </article>
  );
};
