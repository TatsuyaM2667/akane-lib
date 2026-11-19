import React, { useState } from 'react';
import './NotebookMemo.css';

export type FountainInk = 'blue-black' | 'crimson' | 'sepia';

export interface NotebookMemoProps {
  date?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  defaultInk?: FountainInk;
  submitLabel?: string;
  onChange?: (value: string) => void;
  onSave?: (entry: { text: string; ink: FountainInk; date?: string }) => void;
  className?: string;
}

const INK_SWATCHES: { id: FountainInk; label: string; color: string }[] = [
  { id: 'blue-black', label: 'ブルーブラック', color: '#24211e' },
  { id: 'crimson', label: '茜インク', color: '#9e2f2e' },
  { id: 'sepia', label: 'セピア', color: '#5c4332' },
];

export const NotebookMemo: React.FC<NotebookMemoProps> = ({
  date,
  placeholder = '窓の向こうに触れ、それを手帳に書き留める……',
  defaultValue = '',
  value: controlledValue,
  defaultInk = 'blue-black',
  submitLabel = '書き留める',
  onChange,
  onSave,
  className = '',
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [ink, setInk] = useState<FountainInk>(defaultInk);

  const text = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    if (controlledValue === undefined) {
      setUncontrolledValue(next);
    }
    onChange?.(next);
  };

  const handleSave = () => {
    if (!text.trim()) return;
    onSave?.({ text, ink, date });
  };

  return (
    <section className={`akane-notebook ${className}`}>
      <header className="akane-notebook__header">
        <span className="akane-notebook__date">{date ?? '朝の手帳'}</span>
        <div className="akane-notebook__inks" role="radiogroup" aria-label="万年筆のインク色">
          {INK_SWATCHES.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              title={swatch.label}
              aria-label={swatch.label}
              aria-checked={ink === swatch.id}
              role="radio"
              onClick={() => setInk(swatch.id)}
              className={`akane-notebook__ink-dot ${
                ink === swatch.id ? 'akane-notebook__ink-dot--active' : ''
              }`}
              style={{ backgroundColor: swatch.color }}
            />
          ))}
        </div>
      </header>

      <textarea
        className={`akane-notebook__textarea akane-notebook__textarea--${ink}`}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
      />

      <footer className="akane-notebook__footer">
        <span className="akane-notebook__count">{text.length}字 綴った</span>
        {onSave && (
          <button
            type="button"
            className="akane-notebook__submit"
            onClick={handleSave}
            disabled={!text.trim()}
          >
            {submitLabel}
          </button>
        )}
      </footer>
    </section>
  );
};
