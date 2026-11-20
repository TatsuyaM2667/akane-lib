import React, { useEffect, useMemo, useRef, useState } from 'react';
import './TypewriterCensorText.css';

interface TextSegment {
  text: string;
  censored: boolean;
}

export interface TypewriterCensorTextProps {
  text: string;
  speedMs?: number;
  revealOnHover?: boolean;
  instant?: boolean;
  onComplete?: () => void;
  className?: string;
}

function parseSegments(raw: string): TextSegment[] {
  const regex = /\[\[(.+?)\]\]/g;
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: raw.slice(lastIndex, match.index), censored: false });
    }
    segments.push({ text: match[1], censored: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < raw.length) {
    segments.push({ text: raw.slice(lastIndex), censored: false });
  }

  return segments;
}

export const TypewriterCensorText: React.FC<TypewriterCensorTextProps> = ({
  text,
  speedMs = 65,
  revealOnHover = true,
  instant = false,
  onComplete,
  className = '',
}) => {
  const segments = useMemo(() => parseSegments(text), [text]);
  const totalLength = useMemo(
    () => segments.reduce((sum, seg) => sum + seg.text.length, 0),
    [segments]
  );

  const [visibleChars, setVisibleChars] = useState<number>(() =>
    instant ? totalLength : 0
  );
  const [revealedIndices, setRevealedIndices] = useState<Record<number, boolean>>({});
  const completedRef = useRef(false);

  useEffect(() => {
    completedRef.current = false;
    setRevealedIndices({});
    if (instant) {
      setVisibleChars(totalLength);
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }
    setVisibleChars(0);
  }, [text, instant, totalLength, onComplete]);

  useEffect(() => {
    if (instant || visibleChars >= totalLength) {
      if (visibleChars >= totalLength && !completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }

    // 句読点・改行でわずかに思考の間を作る
    let currentChar = '';
    let acc = 0;
    for (const seg of segments) {
      if (visibleChars < acc + seg.text.length) {
        currentChar = seg.text[visibleChars - acc] || '';
        break;
      }
      acc += seg.text.length;
    }

    const pauseMultiplier =
      currentChar === '。' || currentChar === '\n'
        ? 4.2
        : currentChar === '、'
          ? 2.4
          : 1;

    const timer = window.setTimeout(() => {
      setVisibleChars((prev) => Math.min(prev + 1, totalLength));
    }, Math.round(speedMs * pauseMultiplier));

    return () => window.clearTimeout(timer);
  }, [visibleChars, totalLength, speedMs, instant, segments, onComplete]);

  const toggleReveal = (idx: number) => {
    setRevealedIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  let remaining = visibleChars;

  return (
    <div className={`akane-censor-text ${className}`} aria-label={text.replace(/\[\[|\]\]/g, '')}>
      {segments.map((seg, idx) => {
        if (remaining <= 0) return null;
        const sliceLen = Math.min(seg.text.length, remaining);
        const visibleText = seg.text.slice(0, sliceLen);
        remaining -= sliceLen;

        if (!seg.censored) {
          return <span key={idx}>{visibleText}</span>;
        }

        const isRevealed = Boolean(revealedIndices[idx]);
        return (
          <span
            key={idx}
            role="button"
            tabIndex={0}
            aria-pressed={isRevealed}
            aria-label={isRevealed ? visibleText : '検閲された言葉（クリックで表示）'}
            className={`akane-censor-text__redact ${
              revealOnHover ? 'akane-censor-text__redact--interactive' : ''
            } ${isRevealed ? 'akane-censor-text__redact--revealed' : ''}`}
            onClick={() => toggleReveal(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleReveal(idx);
              }
            }}
          >
            {visibleText}
          </span>
        );
      })}
      {visibleChars < totalLength && (
        <span className="akane-censor-text__caret" aria-hidden="true" />
      )}
    </div>
  );
};
