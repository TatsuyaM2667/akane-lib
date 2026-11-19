import React, { useEffect, useMemo, useState } from 'react';
import './LyricLines.css';

export interface LyricLine {
  time: number;
  text: string;
}

export interface LyricLinesProps {
  lines: LyricLine[];
  currentTime?: number;
  autoPlay?: boolean;
  loop?: boolean;
  vertical?: boolean;
  onLineSelect?: (time: number) => void;
  className?: string;
}

export const LyricLines: React.FC<LyricLinesProps> = ({
  lines,
  currentTime,
  autoPlay = false,
  loop = true,
  vertical = false,
  onLineSelect,
  className = '',
}) => {
  const [internalTime, setInternalTime] = useState(0);

  const maxTime = useMemo(() => {
    if (lines.length === 0) return 0;
    return lines[lines.length - 1].time + 4;
  }, [lines]);

  useEffect(() => {
    if (currentTime !== undefined || !autoPlay || maxTime === 0) return;
    const timer = window.setInterval(() => {
      setInternalTime((prev) => {
        const next = prev + 0.25;
        if (next >= maxTime) {
          return loop ? 0 : maxTime;
        }
        return next;
      });
    }, 250);
    return () => window.clearInterval(timer);
  }, [currentTime, autoPlay, loop, maxTime]);

  const activeTime = currentTime ?? internalTime;

  const activeIndex = useMemo(() => {
    let idx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (activeTime >= lines[i].time) {
        idx = i;
      } else {
        break;
      }
    }
    return idx;
  }, [lines, activeTime]);

  return (
    <div
      className={`akane-lyrics ${vertical ? 'akane-lyrics--vertical' : ''} ${
        onLineSelect ? 'akane-lyrics--interactive' : ''
      } ${className}`}
    >
      {lines.map((line, index) => {
        const isActive = index === activeIndex;
        const isPast = activeIndex > -1 && index < activeIndex;
        const stateClass = isActive
          ? 'akane-lyrics__line--active'
          : isPast
            ? 'akane-lyrics__line--past'
            : '';

        return (
          <p
            key={`${line.time}-${index}`}
            className={`akane-lyrics__line ${stateClass}`}
            onClick={onLineSelect ? () => onLineSelect(line.time) : undefined}
          >
            {line.text}
          </p>
        );
      })}
    </div>
  );
};
