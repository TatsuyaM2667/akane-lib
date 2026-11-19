import React from 'react';
import './TrainWindowFrame.css';

export interface TrainWindowFrameProps {
  children: React.ReactNode;
  moving?: boolean;
  className?: string;
}

const PASSING_LIGHTS = [
  { bottom: '12%', duration: '3.6s', delay: '0.2s' },
  { bottom: '16%', duration: '4.4s', delay: '1.8s' },
  { bottom: '10%', duration: '3.1s', delay: '2.9s' },
];

export const TrainWindowFrame: React.FC<TrainWindowFrameProps> = ({
  children,
  moving = true,
  className = '',
}) => {
  return (
    <section className={`akane-window ${className}`}>
      <div className="akane-window__sash" aria-hidden="true" />
      {moving && (
        <div className="akane-window__scenery" aria-hidden="true">
          {PASSING_LIGHTS.map((light, idx) => (
            <span
              key={idx}
              className="akane-window__passing-light"
              style={{
                bottom: light.bottom,
                animationDuration: light.duration,
                animationDelay: light.delay,
              }}
            />
          ))}
        </div>
      )}
      <div className="akane-window__inner">{children}</div>
    </section>
  );
};
