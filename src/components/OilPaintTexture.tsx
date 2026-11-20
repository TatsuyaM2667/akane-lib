import React from 'react';
import './OilPaintTexture.css';

export type OilPaintVariant = 'sky' | 'paper' | 'petal';
export type OilPaintIntensity = 'subtle' | 'normal' | 'strong';

export interface OilPaintTextureProps {
  variant?: OilPaintVariant;
  intensity?: OilPaintIntensity;
  className?: string;
}

export const OilPaintTexture: React.FC<OilPaintTextureProps> = ({
  variant = 'sky',
  intensity = 'normal',
  className = '',
}) => (
  <div
    className={`akane-oil akane-oil--${variant} akane-oil--${intensity} ${className}`.trim()}
    aria-hidden="true"
  >
    <span className="akane-oil__strokes" />
    <span className="akane-oil__impasto" />
    <span className="akane-oil__weave" />
  </div>
);
