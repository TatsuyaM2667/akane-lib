import React from 'react';
import './RisoText.css';

export type RisoTextTag = 'span' | 'h1' | 'h2' | 'h3' | 'p';

export interface RisoTextProps {
  children: React.ReactNode;
  ink?: string;
  as?: RisoTextTag;
  className?: string;
}

export const RisoText: React.FC<RisoTextProps> = ({
  children,
  ink = 'currentColor',
  as = 'span',
  className = '',
}) => {
  const Tag: React.ElementType = as;
  const ghostText =
    typeof children === 'string' || typeof children === 'number'
      ? String(children)
      : '';

  return (
    <Tag
      className={`akane-riso akane-riso--${as} ${className}`.trim()}
      data-ink={ink}
      style={{ '--akane-riso-ink': ink } as React.CSSProperties}
    >
      {children}
      <span
        className="akane-riso__ghost"
        data-text={ghostText}
        aria-hidden="true"
      />
    </Tag>
  );
};
