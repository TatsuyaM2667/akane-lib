import React, { useId } from 'react';
import './GhostFlowerRefraction.css';

export type RefractionIntensity = 'calm' | 'ripple' | 'mirage';

export interface GhostFlowerRefractionProps {
  children: React.ReactNode;
  intensity?: RefractionIntensity;
  afterimage?: boolean;
  caustics?: boolean;
  className?: string;
}

const SCALE_MAP: Record<RefractionIntensity, number> = {
  calm: 2.5,
  ripple: 6,
  mirage: 11,
};

const FREQ_MAP: Record<RefractionIntensity, string> = {
  calm: '0.012 0.025',
  ripple: '0.02 0.045',
  mirage: '0.032 0.07',
};

export const GhostFlowerRefraction: React.FC<GhostFlowerRefractionProps> = ({
  children,
  intensity = 'calm',
  afterimage = true,
  caustics = true,
  className = '',
}) => {
  const rawId = useId();
  const filterId = `akane-refraction-filter-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <div
      className={`akane-refraction ${afterimage ? 'akane-refraction--afterimage' : ''} ${className}`}
      data-refraction-intensity={intensity}
    >
      <svg className="akane-refraction__svg-defs" aria-hidden="true">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={FREQ_MAP[intensity]}
              numOctaves={2}
              seed={7}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur={intensity === 'mirage' ? '4.5s' : '8s'}
                values={`${FREQ_MAP[intensity]};0.018 0.038;${FREQ_MAP[intensity]}`}
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={SCALE_MAP[intensity]}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {caustics && <div className="akane-refraction__caustics" aria-hidden="true" />}

      <div
        className="akane-refraction__surface"
        style={{ filter: `url(#${filterId})` }}
      >
        {children}
      </div>
    </div>
  );
};
