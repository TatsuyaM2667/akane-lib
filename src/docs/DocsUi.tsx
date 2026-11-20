import { useState, type ReactNode } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
}

export function CodeBlock({ code, language = 'tsx', label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="docs-code">
      <div className="docs-code__bar">
        <span className="docs-code__label">{label ?? language}</span>
        <button type="button" className="docs-copy" onClick={handleCopy}>
          {copied ? 'コピーしました' : 'コピー'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
      <span className="docs-visually-hidden" aria-live="polite">
        {copied ? 'コードをコピーしました' : ''}
      </span>
    </div>
  );
}

interface PageHeaderProps {
  kicker: string;
  title: string;
  lead: string;
  meta?: string;
}

export function PageHeader({ kicker, title, lead, meta }: PageHeaderProps) {
  return (
    <header className="docs-page-header">
      <p className="docs-kicker">{kicker}</p>
      <h1>{title}</h1>
      <p className="docs-lead">{lead}</p>
      {meta && <p className="docs-meta">{meta}</p>}
    </header>
  );
}

interface SectionHeadingProps {
  id?: string;
  index?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, index, title, description }: SectionHeadingProps) {
  return (
    <div className="docs-section-heading" id={id}>
      {index && <span className="docs-section-heading__index">{index}</span>}
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

interface PropsTableProps {
  rows: { name: string; type: string; default: string; description: string }[];
}

export function PropsTable({ rows }: PropsTableProps) {
  return (
    <div className="docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>型</th>
            <th>初期値</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                <code>{row.name}</code>
              </td>
              <td>
                <code>{row.type}</code>
              </td>
              <td>
                <code>{row.default}</code>
              </td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface CalloutProps {
  title: string;
  children: ReactNode;
  tone?: 'info' | 'note' | 'warning';
}

export function Callout({ title, children, tone = 'info' }: CalloutProps) {
  return (
    <aside className={`docs-callout docs-callout--${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

interface LinkCardProps {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
}

export function LinkCard({ href, eyebrow, title, body }: LinkCardProps) {
  return (
    <a className="docs-link-card" href={href}>
      <span className="docs-link-card__eyebrow">{eyebrow}</span>
      <strong>{title}</strong>
      <span className="docs-link-card__body">{body}</span>
      <span className="docs-link-card__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

interface NextLinksProps {
  items: { href: string; label: string; hint: string }[];
}

export function NextLinks({ items }: NextLinksProps) {
  return (
    <nav className="docs-next" aria-label="次のページ">
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          <span>{item.hint}</span>
          <strong>{item.label}</strong>
        </a>
      ))}
    </nav>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="docs-tag">{children}</span>;
}
