import React from 'react';
import './LetterCard.css';

export interface LetterCardProps {
  children: React.ReactNode;
  date?: string;
  signature?: string;
  vertical?: boolean;
  className?: string;
}

export const LetterCard: React.FC<LetterCardProps> = ({
  children,
  date,
  signature,
  vertical = false,
  className = '',
}) => {
  return (
    <article
      className={`akane-letter ${vertical ? 'akane-letter--vertical' : ''} ${className}`}
    >
      {date && <time className="akane-letter__date">{date}</time>}
      <div className="akane-letter__body">{children}</div>
      {signature && <footer className="akane-letter__signature">{signature}</footer>}
    </article>
  );
};
