import React from 'react';
import './SourceChip.css';

export type SourceTier = 'primary' | 'press' | 'secondary';

export interface SourceChipProps {
  label: string;
  href?: string;
  tier?: SourceTier;
  className?: string;
}

const TIER_LABEL: Record<SourceTier, string> = {
  primary: '一次',
  press: '報道',
  secondary: '二次',
};

export const SourceChip: React.FC<SourceChipProps> = ({
  label,
  href,
  tier = 'secondary',
  className = '',
}) => {
  const classes = `akane-source-chip akane-source-chip--${tier} ${className}`.trim();
  const content = (
    <>
      <span className="akane-source-chip__tier">{TIER_LABEL[tier]}</span>
      <span className="akane-source-chip__label">{label}</span>
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    );
  }

  return <span className={classes}>{content}</span>;
};
