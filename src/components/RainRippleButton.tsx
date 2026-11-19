import React, { useState } from 'react';
import './RainRippleButton.css';

interface RipplePoint {
  id: number;
  x: number;
  y: number;
}

export interface RainRippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const RainRippleButton: React.FC<RainRippleButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  ...rest
}) => {
  const [ripples, setRipples] = useState<RipplePoint[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;
    const id = Date.now() + Math.random();

    setRipples((prev) => [...prev, { id, x, y }]);
    onClick?.(e);
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <button
      type={type}
      className={`akane-ripple-btn ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {ripples.map((ripple) => (
        <React.Fragment key={ripple.id}>
          <span
            className="akane-ripple-btn__ring"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
            onAnimationEnd={() => removeRipple(ripple.id)}
          />
          <span
            className="akane-ripple-btn__ring akane-ripple-btn__ring--outer"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
          />
        </React.Fragment>
      ))}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
};
