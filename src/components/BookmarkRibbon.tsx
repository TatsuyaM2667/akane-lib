import React from 'react';
import './BookmarkRibbon.css';

export interface BookmarkRibbonProps {
  title: string;
  chapter?: string;
  onClick?: () => void;
  className?: string;
}

export const BookmarkRibbon: React.FC<BookmarkRibbonProps> = ({
  title,
  chapter,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`akane-bookmark ${className}`}
    >
      {chapter && <span className="akane-bookmark__chapter">{chapter}</span>}
      <span className="akane-bookmark__title">{title}</span>
    </button>
  );
};
