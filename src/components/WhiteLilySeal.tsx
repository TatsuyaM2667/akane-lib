import React from 'react';
import './WhiteLilySeal.css';

export interface WhiteLilySealProps {
  caption?: string;
  onClick?: () => void;
  className?: string;
}

export const WhiteLilySeal: React.FC<WhiteLilySealProps> = ({
  caption,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`akane-lily-seal ${className}`}
      aria-label={caption ?? '白い百合の封蝋'}
    >
      <span className="akane-lily-seal__emblem">
        <svg viewBox="0 0 32 32" className="akane-lily-seal__svg" aria-hidden="true">
          {/* 白百合の花弁と蕊（しべ）のミニマル線画 */}
          <path d="M16 4 C13 10, 13 16, 16 21 C19 16, 19 10, 16 4 Z" />
          <path d="M16 21 C11 18, 6 14, 5 9 C10 10, 14 14, 16 21 Z" />
          <path d="M16 21 C21 18, 26 14, 27 9 C22 10, 18 14, 16 21 Z" />
          <path d="M16 21 C12 22, 8 24, 7 27 C11 26, 14 24, 16 21 Z" />
          <path d="M16 21 C20 22, 24 24, 25 27 C21 26, 18 24, 16 21 Z" />
          <line x1="16" y1="21" x2="16" y2="29" />
        </svg>
      </span>
      {caption && <span className="akane-lily-seal__caption">{caption}</span>}
    </button>
  );
};
