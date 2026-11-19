import React, { useEffect, useRef, useState } from 'react';
import './CassettePlayer.css';

export interface CassettePlayerProps {
  title: string;
  side?: 'A' | 'B';
  audioSrc?: string;
  durationSec?: number;
  onTimeUpdate?: (elapsedSec: number) => void;
  className?: string;
}

export const CassettePlayer: React.FC<CassettePlayerProps> = ({
  title,
  side = 'A',
  audioSrc,
  durationSec = 180,
  onTimeUpdate,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    onTimeUpdate?.(elapsed);
  }, [elapsed, onTimeUpdate]);

  useEffect(() => {
    if (!audioSrc || !isPlaying) return;
    const interval = window.setInterval(() => {
      if (audioRef.current) {
        setElapsed(Math.floor(audioRef.current.currentTime));
      }
    }, 250);
    return () => window.clearInterval(interval);
  }, [audioSrc, isPlaying]);

  useEffect(() => {
    if (audioSrc || !isPlaying) return;
    const interval = window.setInterval(() => {
      setElapsed((prev) => (prev + 1 >= durationSec ? 0 : prev + 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [audioSrc, isPlaying, durationSec]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        void audioRef.current.play();
      }
    }
    setIsPlaying((prev) => !prev);
  };

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const total = audioRef.current?.duration || durationSec;
  const progressPct = Math.min(100, (elapsed / total) * 100);

  return (
    <div className={`akane-cassette ${className}`}>
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onEnded={() => setIsPlaying(false)}
        />
      )}
      <div className="akane-cassette__label">
        <span className="akane-cassette__side">SIDE {side}</span>
        <span className="akane-cassette__title">{title}</span>
      </div>

      <div className="akane-cassette__window">
        <div className={`akane-cassette__reel ${isPlaying ? 'akane-cassette__reel--spinning' : ''}`}>
          <div className="akane-cassette__reel-core" />
        </div>
        <div className="akane-cassette__tape-bar">
          <div
            className="akane-cassette__tape-progress"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className={`akane-cassette__reel ${isPlaying ? 'akane-cassette__reel--spinning' : ''}`}>
          <div className="akane-cassette__reel-core" />
        </div>
      </div>

      <div className="akane-cassette__controls">
        <button type="button" className="akane-cassette__btn" onClick={togglePlay}>
          {isPlaying ? '一時停止' : '再生'}
        </button>
        <span className="akane-cassette__time">
          {formatTime(elapsed)} / {formatTime(Math.floor(total))}
        </span>
      </div>
    </div>
  );
};
