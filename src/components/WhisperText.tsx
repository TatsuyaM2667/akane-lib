import React from 'react';
import './WhisperText.css';

export type WhisperVariant = 'telepath' | 'envy';

export interface WhisperTextProps {
  text: string;
  variant?: WhisperVariant;
  speedMs?: number;
  className?: string;
}

export const WhisperText: React.FC<WhisperTextProps> = ({
  text,
  variant = 'telepath',
  speedMs = 55,
  className = '',
}) => {
  const characters = Array.from(text);

  return (
    <p
      className={`akane-whisper akane-whisper--${variant} ${className}`.trim()}
    >
      <span className="akane-whisper__sr">{text}</span>
      <span className="akane-whisper__glitch" data-text={text} aria-hidden="true" />
      <span className="akane-whisper__body" aria-hidden="true">
        {characters.map((character, index) => (
          <span
            key={`${character}-${index}`}
            className="akane-whisper__char"
            style={{
              animationDelay: `${index * speedMs}ms`,
            }}
          >
            {character === ' ' ? '\u00a0' : character}
          </span>
        ))}
      </span>
    </p>
  );
};
