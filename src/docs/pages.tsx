import { useState } from 'react';
import { useAkaneTheme } from '../index';
import { Showcase } from './Showcase';
import { ComponentPreview } from './ComponentPreview';
import { Callout, CodeBlock, LinkCard, NextLinks, PageHeader, PropsTable, SectionHeading, Tag } from './DocsUi';
import { COMPONENTS, FAQS, MOTIFS, PHASES, TOKENS } from './content';

const INSTALL_CODE = 'npm install @tatsuyamiura2667/akane-lib';

const FONT_CODE = `<link
  href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600&display=swap"
  rel="stylesheet"
/>`;

const QUICK_START_CODE = `import '@tatsuyamiura2667/akane-lib/style.css';
import { AkaneThemeProvider, TwilightSky, LetterCard } from '@tatsuyamiura2667/akane-lib';

export function App() {
  return (
    <AkaneThemeProvider defaultPhase="night">
      <TwilightSky ambient fireworks>
        <LetterCard date="第一夜" signature="ずっと待っていました">
          白い百合を一輪持って、隣の街から帰ります。
        </LetterCard>
      </TwilightSky>
    </AkaneThemeProvider>
  );
}`;

const SYSTEM_TIME_CODE = `import { AkaneThemeProvider, useAkaneTheme } from '@tatsuyamiura2667/akane-lib';

function ResetButton() {
  const theme = useAkaneTheme();
  return <button onClick={() => theme?.resetToSystemTime()}>現在時刻に戻す</button>;
}

<AkaneThemeProvider syncWithSystemTime>
  <ResetButton />
</AkaneThemeProvider>`;

export function HomePage() {
  return (
    <div className="docs-page docs-page--home">
      <section className="docs-hero">
        <p className="docs-kicker">YORUSHIKA-INSPIRED REACT UI LIBRARY</p>
        <h1>
          茜さす空と、
          <br />
          記憶の余韻を。
        </h1>
        <p className="docs-lead">
          夕凪から群青の深夜へ移ろう空、便箋、カセットテープ、夜列車の車窓。
          {' '}ヨルシカの物語から着想を得た情景を、宣言的な React コンポーネントとして扱えるライブラリです。
        </p>
        <div className="docs-hero__actions">
          <a className="docs-button docs-button--primary" href="#/components">
            コンポーネントを見る
          </a>
          <a className="docs-button" href="./storybook/">
            Storybook を開く
          </a>
          <a className="docs-button docs-button--quiet" href="#/start">
            導入方法を読む
          </a>
        </div>
        <dl className="docs-stats">
          <div>
            <dt>COMPONENTS</dt>
            <dd>{COMPONENTS.length}</dd>
          </div>
          <div>
            <dt>SKY PHASES</dt>
            <dd>{PHASES.length}</dd>
          </div>
          <div>
            <dt>STORYBOOK STORIES</dt>
            <dd>9</dd>
          </div>
          <div>
            <dt>LICENSE</dt>
            <dd>MIT</dd>
          </div>
        </dl>
      </section>

      <div className="docs-home-divider">
        <span>INTERACTIVE DEMO</span>
      </div>

      <Showcase />

      <NextLinks
        items={[
          { href: '#/motifs', label: 'モチーフ辞典', hint: '曲と情景からコンポーネントを辿る' },
          { href: '#/faq', label: 'よくある質問', hint: '導入や表示の悩みを解消する' },
        ]}
      />
    </div>
  );
}

export function StartPage() {
  return (
    <div className="docs-page">
      <PageHeader
        kicker="GET STARTED"
        title="はじめに"
        lead="インストールから最初の一行まで。3ステップで空と便箋を自分のアプリに置けます。"
        meta="React 18 / 19 対応 · TypeScript 型定義同梱 · MIT"
      />

      <SectionHeading index="01" title="パッケージを入れる" description="npm 公式レジストリから取得できます。" />
      <CodeBlock code={INSTALL_CODE} language="bash" label="terminal" />

      <Callout title="GitHub Packages を使う場合">
        <p>
          プロジェクト直下の <code>.npmrc</code> に <code>@tatsuyamiura2667:registry=https://npm.pkg.github.com</code> を設定してから、同じコマンドでインストールしてください。認証には GitHub の PAT が必要です。
        </p>
      </Callout>

      <SectionHeading index="02" title="スタイルとフォントを読み込む" description="CSS は自動挿入されません。エントリで一度だけ import します。" />
      <CodeBlock code="import '@tatsuyamiura2667/akane-lib/style.css';" label="src/main.tsx" />
      <p>
        推奨フォントの Shippori Mincho は利用側で読み込みます。未設定でも明朝体のフォールバックで表示されます。
      </p>
      <CodeBlock code={FONT_CODE} language="html" label="index.html" />

      <SectionHeading index="03" title="テーマで包む" description="Provider が空の時間帯を管理し、Sky が背景と環境演出を描きます。" />
      <CodeBlock code={QUICK_START_CODE} label="App.tsx" />

      <Callout title="次の一手" tone="note">
        <p>
          時間帯の動かし方は「テーマと空」、各コンポーネントの詳細は「コンポーネント」で、実際の動きは各ページのライブプレビューで確認できます。
        </p>
      </Callout>

      <div className="docs-card-grid">
        <LinkCard href="#/theme" eyebrow="THEME" title="テーマと空" body="4つの時間帯、トークン、システム時刻との同期" />
        <LinkCard href="#/components" eyebrow="REFERENCE" title="コンポーネント" body="13個の API とライブプレビュー" />
        <LinkCard href="#/motifs" eyebrow="MOTIFS" title="モチーフ辞典" body="曲の情景から使うパーツを探す" />
      </div>

      <NextLinks items={[{ href: '#/theme', label: 'テーマと空', hint: '次へ' }]} />
    </div>
  );
}

function PhaseCards() {
  const theme = useAkaneTheme();
  return (
    <div className="docs-phase-grid">
      {PHASES.map((phase) => (
        <section className={`docs-phase-card docs-phase-card--${phase.id}`} key={phase.id}>
          <div className="docs-phase-card__sky" aria-hidden="true" />
          <div className="docs-phase-card__body">
            <span className="docs-phase-card__chapter">{phase.chapter}</span>
            <h3>{phase.name}</h3>
            <p className="docs-phase-card__reading">{phase.reading} / {phase.id}</p>
            <p className="docs-phase-card__hours">{phase.hours}</p>
            <p className="docs-phase-card__keywords">{phase.keywords}</p>
            <p className="docs-phase-card__description">{phase.description}</p>
            <button
              type="button"
              className="docs-plain-button"
              aria-pressed={theme?.phase === phase.id}
              onClick={() => theme?.setPhase(phase.id)}
            >
              {theme?.phase === phase.id ? '表示中の空' : 'この空に切り替える'}
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}

export function ThemePage() {
  return (
    <div className="docs-page">
      <PageHeader
        kicker="THEME & SKY"
        title="テーマと空"
        lead="空は単なる背景ではなく、紙・インク・アクセント色をまとめて切り替える状態です。"
      />

      <SectionHeading title="4つの時間帯" description="カードのボタンから、このページ全体の空を切り替えてみてください。" />
      <PhaseCards />

      <SectionHeading title="時刻と同期する" description="syncWithSystemTime を付けると、現在時刻に応じて空が選ばれます。" />
      <CodeBlock code={SYSTEM_TIME_CODE} label="SystemTime.tsx" />
      <Callout title="判定の目安" tone="note">
        <p>
          04–09時が dawn、10–16時が dusk、17–19時が twilight、20–03時が night。
          <code>getSkyPhaseFromDate(date)</code> で同じ判定を直接呼べます。
        </p>
      </Callout>

      <SectionHeading title="useAkaneTheme()" description="Provider の内側から現在の空と操作を取り出せます。" />
      <PropsTable
        rows={[
          { name: 'phase', type: 'SkyPhase', default: '—', description: '現在の時間帯' },
          { name: 'setPhase', type: '(phase: SkyPhase) => void', default: '—', description: '指定した空へ切り替える' },
          { name: 'nextPhase', type: '() => void', default: '—', description: '次の空へ進める' },
          { name: 'isSystemSynced', type: 'boolean', default: '—', description: '時刻と同期中か' },
          { name: 'resetToSystemTime', type: '() => void', default: '—', description: '手動操作を解除して同期へ戻す' },
        ]}
      />

      <SectionHeading title="デザイントークン" description="すべてのコンポーネントは CSS カスタムプロパティを参照しています。" />
      {TOKENS.map((tokenGroup) => (
        <div className="docs-token-group" key={tokenGroup.group}>
          <h3>{tokenGroup.group}</h3>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>変数名</th>
                  <th>初期値</th>
                  <th>役割</th>
                </tr>
              </thead>
              <tbody>
                {tokenGroup.rows.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <code>{row.name}</code>
                    </td>
                    <td>
                      <code>{row.value}</code>
                    </td>
                    <td>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <Callout title="動きを減らす設定" tone="warning">
        <p>
          prefers-reduced-motion が有効な環境では、雨・光塵・星・花びら・車窓の流れ・花火のアニメーションが自動的に止まります。
        </p>
      </Callout>

      <NextLinks items={[{ href: '#/components', label: 'コンポーネント', hint: '次へ' }]} />
    </div>
  );
}

export function ComponentsPage({ slug }: { slug?: string }) {
  const [query, setQuery] = useState('');
  const selected =
    COMPONENTS.find((component) => component.slug === slug) ?? COMPONENTS[0];
  const filtered = COMPONENTS.filter((component) =>
    [component.name, component.japanese, component.motif, component.group, component.summary]
      .join(' ')
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const selectedIndex = COMPONENTS.findIndex((component) => component.slug === selected.slug);
  const previous = COMPONENTS[(selectedIndex - 1 + COMPONENTS.length) % COMPONENTS.length];
  const next = COMPONENTS[(selectedIndex + 1) % COMPONENTS.length];

  return (
    <div className="docs-page docs-page--components">
      <PageHeader
        kicker="API REFERENCE"
        title="コンポーネント"
        lead="13のコンポーネントを、役割・モチーフ・Props・動きの順に掲載しています。"
      />

      <div className="docs-components-layout">
        <aside className="docs-components-nav" aria-label="コンポーネント一覧">
          <label className="docs-search">
            <span>名前・モチーフで探す</span>
            <input
              type="search"
              value={query}
              placeholder="例：花、縦書き、ボタン"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          {filtered.length === 0 && <p className="docs-components-nav__empty">該当がありません</p>}
          {[...new Set(filtered.map((component) => component.group))].map((group) => (
            <div className="docs-components-nav__group" key={group}>
              <h2>{group}</h2>
              <ul>
                {filtered
                  .filter((component) => component.group === group)
                  .map((component) => (
                    <li key={component.slug}>
                      <a
                        href={`#/components/${component.slug}`}
                        aria-current={component.slug === selected.slug ? 'page' : undefined}
                      >
                        <strong>{component.name}</strong>
                        <span>{component.japanese}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </aside>

        <article className="docs-component-detail" key={selected.slug}>
          <div className="docs-component-detail__heading">
            <div>
              <p className="docs-kicker">{selected.motif}</p>
              <h2>{selected.name}</h2>
              <p className="docs-component-detail__japanese">{selected.japanese}</p>
            </div>
            <Tag>{selected.group}</Tag>
          </div>
          <p className="docs-component-detail__summary">{selected.summary}</p>
          <p className="docs-component-detail__detail">{selected.detail}</p>

          <SectionHeading title="動きを見る" />
          <ComponentPreview slug={selected.slug} />

          <SectionHeading title="使い方" />
          <CodeBlock code={selected.usage} label={`${selected.name}.tsx`} />

          <SectionHeading title="Props" />
          <PropsTable rows={selected.props} />

          {selected.notes && (
            <Callout title="覚えておくと便利" tone="note">
              <ul>
                {selected.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </Callout>
          )}

          {selected.related && (
            <div className="docs-related">
              <h3>関連コンポーネント</h3>
              <div className="docs-related__links">
                {selected.related.map((relatedSlug) => {
                  const related = COMPONENTS.find((component) => component.slug === relatedSlug);
                  if (!related) return null;
                  return (
                    <a key={relatedSlug} href={`#/components/${relatedSlug}`}>
                      {related.name} <span aria-hidden="true">→</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          <nav className="docs-component-pager" aria-label="コンポーネントの移動">
            <a href={`#/components/${previous.slug}`}>
              <span>前へ</span>
              <strong>{previous.name}</strong>
            </a>
            <a href={`#/components/${next.slug}`}>
              <span>次へ</span>
              <strong>{next.name}</strong>
            </a>
          </nav>
        </article>
      </div>
    </div>
  );
}

export function MotifsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        kicker="MOTIF DICTIONARY"
        title="モチーフ辞典"
        lead="曲や物語の情景を手がかりに、どのコンポーネントが対応するかを辿れる一覧です。"
      />

      <Callout title="このライブラリについて" tone="note">
        <p>
          楽曲・物語の情景から着想を得たオリジナルの UI 表現です。歌詞や音声データは同梱しておらず、公式の作品ではありません。
        </p>
      </Callout>

      <div className="docs-motif-grid">
        {MOTIFS.map((motif) => (
          <article className="docs-motif-card" key={motif.title} style={{ borderTopColor: motif.accent }}>
            <span className="docs-motif-card__accent" style={{ backgroundColor: motif.accent }} aria-hidden="true" />
            <h2>{motif.title}</h2>
            <p className="docs-motif-card__subtitle">{motif.subtitle}</p>
            <p className="docs-motif-card__body">{motif.body}</p>
            <div className="docs-motif-card__links">
              {motif.components.map((componentSlug) => {
                const component = COMPONENTS.find((item) => item.slug === componentSlug);
                if (!component) return null;
                return (
                  <a key={componentSlug} href={`#/components/${componentSlug}`}>
                    {component.name}
                  </a>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <NextLinks
        items={[
          { href: '#/components', label: 'コンポーネント一覧', hint: 'API を詳しく見る' },
          { href: '#/faq', label: 'よくある質問', hint: '次へ' },
        ]}
      />
    </div>
  );
}

export function FaqPage() {
  return (
    <div className="docs-page">
      <PageHeader
        kicker="FAQ"
        title="よくある質問"
        lead="導入時と表示時に多い質問をまとめました。項目はクリックで開きます。"
      />

      <div className="docs-faq-list">
        {FAQS.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>

      <Callout title="解決しないとき" tone="warning">
        <p>
          <a href="https://github.com/TatsuyaM2667/akane-lib/issues">GitHub Issues</a> に、利用環境・再現手順・期待する動作を添えて報告してください。
        </p>
      </Callout>

      <NextLinks items={[{ href: '#/', label: 'デモに戻る', hint: '最初から' }]} />
    </div>
  );
}
