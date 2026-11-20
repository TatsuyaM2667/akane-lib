import React, { useEffect, useState } from 'react';
import { useAkaneTheme } from '../context/AkaneThemeContext';
import { OilPaintTexture } from './OilPaintTexture';
import './TwilightSky.css';

export type SkyPhase =
  | 'dawn'
  | 'morning'
  | 'day'
  | 'dusk'
  | 'golden'
  | 'twilight'
  | 'night'
  | 'midnight';

const PHASES: SkyPhase[] = [
  'dawn',
  'morning',
  'day',
  'dusk',
  'golden',
  'twilight',
  'night',
  'midnight',
];

const RAIN_DROPS = [
  { left: '6%', duration: '1.9s', delay: '0.1s' },
  { left: '14%', duration: '2.3s', delay: '0.8s' },
  { left: '22%', duration: '1.7s', delay: '1.4s' },
  { left: '31%', duration: '2.1s', delay: '0.4s' },
  { left: '39%', duration: '2.5s', delay: '1.1s' },
  { left: '47%', duration: '1.8s', delay: '0.6s' },
  { left: '56%', duration: '2.2s', delay: '1.7s' },
  { left: '64%', duration: '1.9s', delay: '0.3s' },
  { left: '72%', duration: '2.4s', delay: '1.2s' },
  { left: '81%', duration: '1.8s', delay: '0.9s' },
  { left: '89%', duration: '2.1s', delay: '1.5s' },
  { left: '95%', duration: '2.3s', delay: '0.5s' },
];

const EMBERS = [
  { left: '12%', size: 6, duration: '11s', delay: '0s' },
  { left: '26%', size: 4, duration: '14s', delay: '2.5s' },
  { left: '42%', size: 7, duration: '12s', delay: '5s' },
  { left: '58%', size: 5, duration: '15s', delay: '1.5s' },
  { left: '74%', size: 6, duration: '13s', delay: '4s' },
  { left: '88%', size: 4, duration: '11.5s', delay: '6.5s' },
];

const STARS = [
  { top: '8%', left: '10%', size: 2, duration: '4.2s', delay: '0.2s', firefly: false },
  { top: '14%', left: '24%', size: 1.5, duration: '5.5s', delay: '1.4s', firefly: false },
  { top: '6%', left: '38%', size: 2.5, duration: '3.8s', delay: '0.8s', firefly: false },
  { top: '19%', left: '52%', size: 1.5, duration: '6.1s', delay: '2.1s', firefly: false },
  { top: '11%', left: '67%', size: 2, duration: '4.7s', delay: '0.5s', firefly: false },
  { top: '16%', left: '82%', size: 2.5, duration: '5.0s', delay: '1.9s', firefly: false },
  { top: '25%', left: '16%', size: 1.5, duration: '5.8s', delay: '2.6s', firefly: false },
  { top: '28%', left: '74%', size: 2, duration: '4.4s', delay: '1.1s', firefly: false },
  { top: '33%', left: '44%', size: 1.5, duration: '6.4s', delay: '3.0s', firefly: false },
  { top: '64%', left: '18%', size: 3.5, duration: '7.5s', delay: '0.6s', firefly: true },
  { top: '72%', left: '78%', size: 3, duration: '8.2s', delay: '2.2s', firefly: true },
  { top: '58%', left: '86%', size: 3.5, duration: '6.8s', delay: '1.3s', firefly: true },
];

const FIREWORKS = [
  { top: '18%', left: '22%', size: 38, duration: '6.5s', delay: '0.4s' },
  { top: '12%', left: '68%', size: 52, duration: '8s', delay: '3.2s' },
  { top: '34%', left: '86%', size: 30, duration: '7.2s', delay: '5.1s' },
];

const CLOUDS = [
  { top: '14%', left: '8%', width: 140, duration: '54s', delay: '0s' },
  { top: '28%', left: '46%', width: 190, duration: '72s', delay: '12s' },
  { top: '9%', left: '74%', width: 120, duration: '62s', delay: '28s' },
];

const DEW = [
  { top: '32%', left: '18%', size: 3, duration: '5.4s', delay: '0.3s' },
  { top: '48%', left: '42%', size: 2, duration: '6.2s', delay: '1.8s' },
  { top: '38%', left: '68%', size: 3, duration: '4.9s', delay: '3.1s' },
  { top: '58%', left: '84%', size: 2, duration: '5.8s', delay: '2.4s' },
];

const STARRY_PHASES: SkyPhase[] = ['night', 'midnight'];

export interface TwilightSkyProps {
  children: React.ReactNode;
  phase?: SkyPhase;
  autoCycle?: boolean;
  intervalMs?: number;
  ambient?: boolean;
  fireworks?: boolean;
  oilPaint?: boolean;
  className?: string;
}

export const TwilightSky: React.FC<TwilightSkyProps> = ({
  children,
  phase,
  autoCycle = false,
  intervalMs = 8000,
  ambient = false,
  fireworks = false,
  oilPaint = true,
  className = '',
}) => {
  const theme = useAkaneTheme();
  const [localPhase, setLocalPhase] = useState<SkyPhase>(phase ?? 'twilight');

  useEffect(() => {
    if (phase !== undefined) {
      setLocalPhase(phase);
    }
  }, [phase]);

  useEffect(() => {
    if (theme || !autoCycle) return;
    const timer = window.setInterval(() => {
      setLocalPhase((prev) => {
        const nextIdx = (PHASES.indexOf(prev) + 1) % PHASES.length;
        return PHASES[nextIdx];
      });
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [theme, autoCycle, intervalMs]);

  const activePhase = phase ?? theme?.phase ?? localPhase;

  return (
    <div
      data-akane-phase={activePhase}
      className={`akane-sky akane-sky--${activePhase} ${className}`}
    >
      {ambient && (
        <div className="akane-sky__ambient" aria-hidden="true">
          {oilPaint && <OilPaintTexture variant="sky" intensity="subtle" />}
          {activePhase === 'dusk' &&
            RAIN_DROPS.map((drop, i) => (
              <span
                key={i}
                className="akane-ambient-rain"
                style={{
                  left: drop.left,
                  animationDuration: drop.duration,
                  animationDelay: drop.delay,
                }}
              />
            ))}

          {(activePhase === 'twilight' || activePhase === 'golden') &&
            EMBERS.map((ember, i) => (
              <span
                key={i}
                className="akane-ambient-ember"
                style={{
                  left: ember.left,
                  width: `${ember.size}px`,
                  height: `${ember.size}px`,
                  animationDuration: ember.duration,
                  animationDelay: ember.delay,
                }}
              />
            ))}

          {STARRY_PHASES.includes(activePhase) &&
            STARS.map((star, i) => (
              <span
                key={`star-${i}`}
                className={`akane-ambient-star ${star.firefly ? 'akane-ambient-star--firefly' : ''}`}
                style={{
                  top: star.top,
                  left: star.left,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDuration: star.duration,
                  animationDelay: star.delay,
                }}
              />
            ))}

          {activePhase === 'midnight' && <div className="akane-ambient-moon" />}

          {STARRY_PHASES.includes(activePhase) &&
            fireworks &&
            FIREWORKS.map((firework, i) => (
              <span
                key={`fw-${i}`}
                className="akane-ambient-firework"
                style={{
                  top: firework.top,
                  left: firework.left,
                  width: `${firework.size}px`,
                  height: `${firework.size}px`,
                  animationDuration: firework.duration,
                  animationDelay: firework.delay,
                }}
              />
            ))}

          {(activePhase === 'day' || activePhase === 'morning') &&
            CLOUDS.map((cloud, i) => (
              <span
                key={`cloud-${i}`}
                className="akane-ambient-cloud"
                style={{
                  top: cloud.top,
                  left: cloud.left,
                  width: `${cloud.width}px`,
                  height: `${Math.round(cloud.width * 0.38)}px`,
                  animationDuration: cloud.duration,
                  animationDelay: cloud.delay,
                }}
              />
            ))}

          {activePhase === 'morning' &&
            DEW.map((drop, i) => (
              <span
                key={`dew-${i}`}
                className="akane-ambient-dew"
                style={{
                  top: drop.top,
                  left: drop.left,
                  width: `${drop.size}px`,
                  height: `${drop.size}px`,
                  animationDuration: drop.duration,
                  animationDelay: drop.delay,
                }}
              />
            ))}

          {activePhase === 'golden' && <div className="akane-ambient-sun" />}

          {(activePhase === 'dawn' || activePhase === 'morning') && (
            <div className="akane-ambient-mist" />
          )}
        </div>
      )}

      <div className="akane-sky__content">{children}</div>
    </div>
  );
};
