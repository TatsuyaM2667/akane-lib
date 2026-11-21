import { useState, type ChangeEvent, type CSSProperties, type ReactNode } from 'react';
import { Callout, NextLinks, PageHeader, SectionHeading, Tag } from './DocsUi';
import {
  ERA_GROUPS,
  MATERIAL_PRIMITIVES,
  MOTIF_SYSTEMS,
  MOOD_TOKENS,
  MV_CATALOG,
  type CatalogEntry,
  type EraGroup,
  type MaterialPrimitive,
  type MotifSystem,
  type MoodToken,
} from './catalog';
import './catalog.css';

export function GalleryPage() {
  const [era, setEra] = useState<string>('all');
  const [motif, setMotif] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const handleEraChange = (id: string): void => setEra(id);
  const handleMotifChange = (event: ChangeEvent<HTMLSelectElement>): void => setMotif(event.target.value);
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => setQuery(event.target.value);

  const selectedEra: EraGroup | undefined = ERA_GROUPS.find((group: EraGroup) => group.id === era);
  const normalizedQuery: string = query.trim().toLowerCase();

  const visibleEntries: CatalogEntry[] = MV_CATALOG.filter((entry: CatalogEntry): boolean => {
    const inEra: boolean = era === 'all' || (selectedEra?.years.includes(entry.year) ?? false);
    const inMotif: boolean = motif === 'all' || entry.motifs.includes(motif);
    const labels: string[] = MOTIF_SYSTEMS.filter(
      (system: MotifSystem): boolean => entry.motifs.includes(system.id),
    ).map((system: MotifSystem) => system.label);
    const searchable: string = [entry.title, entry.material, entry.note, ...entry.motifs, ...labels]
      .join(' ')
      .toLowerCase();
    return inEra && inMotif && (normalizedQuery === '' || searchable.includes(normalizedQuery));
  });

  return (
    <div className="docs-page docs-catalog docs-gallery">
      <PageHeader
        kicker="MV MATERIAL GALLERY"
        title="MVマテリアル・ギャラリー"
        lead="43作品のモチーフを、曲の再現ではなく紙・光・風・水・線・身体・視点の処理として抽象化し、オリジナルのUI素材へ翻訳したカタログです。"
        meta="43 works · 12 motif systems · 12 proposal tokens"
      />

      <div className="docs-catalog__notice">
        <Callout title="取り扱いの範囲" tone="note">
          <p>
            歌詞・映像フレーム・キャラクターデザイン・音声は含まれていません。タイトルと出典リンクは資料として掲載し、HEXはすべて設計用の提案値です。
          </p>
        </Callout>
      </div>

      <SectionHeading
        index="01"
        title="作品を絞り込む"
        description="時代・モチーフ・キーワードの組み合わせで、素材の種を探せます。"
      />

      <div className="docs-gallery__controls">
        <div className="docs-gallery__era" role="group" aria-label="時代で絞り込む">
          <button
            type="button"
            className="docs-gallery__era-button"
            aria-pressed={era === 'all'}
            onClick={(): void => handleEraChange('all')}
          >
            すべて
          </button>
          {ERA_GROUPS.map((group: EraGroup) => (
            <button
              key={group.id}
              type="button"
              className="docs-gallery__era-button"
              aria-pressed={era === group.id}
              onClick={(): void => handleEraChange(group.id)}
            >
              {group.label}
            </button>
          ))}
        </div>

        <label className="docs-gallery__filter">
          <span>モチーフ系統</span>
          <select value={motif} onChange={handleMotifChange}>
            <option value="all">すべての系統</option>
            {MOTIF_SYSTEMS.map((system: MotifSystem) => (
              <option key={system.id} value={system.id}>
                {system.label}
              </option>
            ))}
          </select>
        </label>

        <label className="docs-gallery__search">
          <span>キーワード</span>
          <input
            type="search"
            value={query}
            onChange={handleQueryChange}
            placeholder="作品名・素材・モチーフ"
          />
        </label>
      </div>

      <p className="docs-gallery__count" aria-live="polite">
        {visibleEntries.length} / {MV_CATALOG.length} 件を表示
      </p>

      {visibleEntries.length > 0 ? (
        <div className="docs-gallery__grid">
          {visibleEntries.map((entry: CatalogEntry) => (
            <article className="docs-gallery__card" id={entry.id} key={entry.id}>
              <div className="docs-gallery__card-top">
                <span className="docs-gallery__year">{entry.year}</span>
                <span className="docs-gallery__badge">{entry.kind}</span>
                <span className={`docs-gallery__badge docs-gallery__badge--${entry.sourceTier}`}>
                  {entry.sourceTier}
                </span>
              </div>
              <h3 className="docs-gallery__title">{entry.title}</h3>
              <div className="docs-gallery__motifs">
                {MOTIF_SYSTEMS.filter((system: MotifSystem): boolean => entry.motifs.includes(system.id)).map(
                  (system: MotifSystem) => (
                    <Tag key={system.id}>{system.label}</Tag>
                  ),
                )}
              </div>
              <p className="docs-gallery__material">{entry.material}</p>
              <p className="docs-gallery__note">{entry.note}</p>
              <div className="docs-gallery__swatches" aria-label="提案カラー">
                {entry.palette.map((hex: string) => (
                  <span
                    key={hex}
                    className="docs-gallery__swatch"
                    style={{ backgroundColor: hex }}
                    title={`提案値 ${hex}`}
                  />
                ))}
              </div>
              <a className="docs-gallery__source" href={entry.sourceUrl} target="_blank" rel="noreferrer">
                出典を開く
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="docs-gallery__empty">
          <p>条件に合う作品がありません。時代・系統・キーワードを変えてお試しください。</p>
        </div>
      )}

      <NextLinks
        items={[
          { href: '#/timeline', label: 'モチーフ年表', hint: '時代ごとの移ろいをたどる' },
          { href: '#/materials', label: '素材システム', hint: '系統・トークン・プリミティブを見る' },
        ]}
      />
    </div>
  );
}

const ERA_SHIFT: Record<string, string> = {
  early: '線画と紙の余白から出発し、夏空・雨・深い青が厚みを増していく時期。',
  'tousaku-yakou': '引用とコラージュが増え、固定視点・仮面・低フレームの揺らぎが共有言語になる。',
  'fantasy-newdeals': '文学と寓言の参照が強まり、多重露光・泡・上昇する光へと視点が開かれる。',
};

export function TimelinePage() {
  return (
    <div className="docs-page docs-catalog docs-timeline">
      <PageHeader
        kicker="VISUAL CHRONOLOGY"
        title="モチーフ年表"
        lead="2017年から2026年までの43作品を、紙・光・水・身体の処理がどう積み重なってきたかという視点で並べ直した年表です。"
        meta="2017–2019 · 2020–2022 · 2023–2026"
      />

      {ERA_GROUPS.map((group: EraGroup) => {
        const shift: string = ERA_SHIFT[group.id] ?? '';
        const yearBlocks: ReactNode[] = group.years.map((year: number): ReactNode => {
          const items: CatalogEntry[] = MV_CATALOG.filter((entry: CatalogEntry): boolean => entry.year === year);
          if (items.length === 0) return null;
          return (
            <div className="docs-timeline__year-block" key={year}>
              <p className="docs-timeline__year">{year}</p>
              <ol className="docs-timeline__list">
                {items.map((entry: CatalogEntry) => (
                  <li className="docs-timeline__item" key={entry.id}>
                    <div className="docs-timeline__content">
                      <div className="docs-timeline__heading">
                        <span className="docs-timeline__title">{entry.title}</span>
                        <span className="docs-timeline__kind">{entry.kind}</span>
                        <span className={`docs-timeline__tier docs-timeline__tier--${entry.sourceTier}`}>
                          {entry.sourceTier}
                        </span>
                      </div>
                      <p className="docs-timeline__material">{entry.material} — {entry.note}</p>
                      <div className="docs-timeline__palette" aria-label="提案カラー">
                        {entry.palette.map((hex: string) => (
                          <span
                            key={hex}
                            className="docs-timeline__swatch"
                            style={{ backgroundColor: hex }}
                            title={`提案値 ${hex}`}
                          />
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        });

        return (
          <section className="docs-timeline__group" key={group.id}>
            <div className="docs-timeline__group-head">
              <h2 className="docs-timeline__group-label">{group.label}</h2>
              <p className="docs-timeline__range">
                {group.years[0]}–{group.years[group.years.length - 1]}
              </p>
            </div>
            <p className="docs-timeline__shift">
              <strong>時代の境界</strong>
              {shift}
            </p>
            <div className="docs-timeline__track">{yearBlocks}</div>
          </section>
        );
      })}

      <NextLinks
        items={[
          { href: '#/gallery', label: 'MVマテリアル・ギャラリー', hint: '作品ごとの素材案を見る' },
          { href: '#/components', label: 'コンポーネント', hint: '既存の部品へ接続する' },
        ]}
      />
    </div>
  );
}

const COMPONENT_SLUGS: Record<string, string[]> = {
  paper: ['letter-card', 'notebook-memo'],
  blueNight: ['twilight-sky'],
  summerLight: ['twilight-sky', 'oil-paint-texture'],
  rainGlass: ['rain-ripple-button', 'train-window-frame'],
  seaBubble: ['ghost-flower-refraction'],
  windCloud: ['twilight-sky'],
  flowerPetal: ['sakura-thief-overlay'],
  linePrint: ['oil-paint-texture'],
  bodyMask: ['sakura-thief-overlay', 'relic-scene'],
  fragmentViewpoint: ['train-window-frame', 'whisper-text'],
  filmProcess: ['oil-paint-texture', 'ghost-flower-refraction'],
  literature: ['typewriter-censor-text', 'cassette-player'],
};

const PRIORITIES: MaterialPrimitive['priority'][] = ['P0', 'P1', 'P2'];

const PRIORITY_SUMMARY: Record<MaterialPrimitive['priority'], string> = {
  P0: '43作品ほぼ全てに効く共通の下地と接続層。',
  P1: '代表作を覆う上位モチーフの演出。',
  P2: '個別作品の語彙を補う物語的ディテール。',
};

export function MaterialsPage() {
  return (
    <div className="docs-page docs-catalog docs-material">
      <PageHeader
        kicker="MATERIAL SYSTEM"
        title="素材システム"
        lead="12の横断モチーフ、12の提案トークン、優先度付きのCSS/SVG/Reactプリミティブ。作品から学んだ処理を部品として扱うための三層構造です。"
        meta="12 motifs · 12 tokens · 30 primitives"
      />

      <SectionHeading
        index="01"
        title="12の横断モチーフ"
        description="曲名ではなく、反復する処理を再利用の単位にした辞典です。"
      />
      <div className="docs-material__grid">
        {MOTIF_SYSTEMS.map((system: MotifSystem) => {
          const style: CSSProperties = { '--docs-material-accent': system.accent } as CSSProperties;
          const slugs: string[] = COMPONENT_SLUGS[system.id] ?? [];
          return (
            <article className="docs-material__card" key={system.id} style={style}>
              <span className="docs-material__accent" aria-hidden="true" />
              <h3 className="docs-material__label">{system.label}</h3>
              <p className="docs-material__description">{system.description}</p>
              <div className="docs-material__related">
                <span className="docs-material__hint">該当作品</span>
                {system.related.map((entryId: string) => {
                  const entry: CatalogEntry | undefined = MV_CATALOG.find(
                    (item: CatalogEntry) => item.id === entryId,
                  );
                  if (!entry) return null;
                  return (
                    <a key={entryId} href={`#/gallery/${entryId}`} title={entry.material}>
                      {entry.title}
                    </a>
                  );
                })}
              </div>
              {slugs.length > 0 && (
                <div className="docs-material__related">
                  <span className="docs-material__hint">接続コンポーネント</span>
                  {slugs.map((slug: string) => (
                    <a key={slug} href={`#/components/${slug}`}>
                      {slug}
                    </a>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <SectionHeading
        index="02"
        title="12の提案ムードトークン"
        description="既存の --akane-* を上書きせず、8フェーズへムードを重ねる別系統です。"
      />
      <p className="docs-material__token-note">下記のHEXはすべて設計用の提案値であり、公式カラースクリプトや実測値ではありません。</p>
      <div className="docs-table-wrap">
        <table className="docs-table docs-material__token-table">
          <thead>
            <tr>
              <th>スウォッチ</th>
              <th>トークン名</th>
              <th>提案HEX</th>
              <th>役割</th>
            </tr>
          </thead>
          <tbody>
            {MOOD_TOKENS.map((token: MoodToken) => (
              <tr key={token.name}>
                <td>
                  <span
                    className="docs-material__swatch"
                    style={{ backgroundColor: token.value }}
                    aria-hidden="true"
                  />
                </td>
                <td>
                  <code>{token.name}</code>
                </td>
                <td>
                  <code className="docs-material__value">{token.value}</code>
                </td>
                <td>{token.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionHeading
        index="03"
        title="優先度付きプリミティブ"
        description="共通の下地から代表作のモチーフ、個別作品の語彙の順に実装します。"
      />
      {PRIORITIES.map((priority: MaterialPrimitive['priority']) => {
        const primitives: MaterialPrimitive[] = MATERIAL_PRIMITIVES.filter(
          (primitive: MaterialPrimitive): boolean => primitive.priority === priority,
        );
        return (
          <section className="docs-material__group" key={priority}>
            <h3 className="docs-material__priority">
              {priority}
              <span>{PRIORITY_SUMMARY[priority]}</span>
            </h3>
            <div className="docs-material__primitive-grid">
              {primitives.map((primitive: MaterialPrimitive) => (
                <article className="docs-material__primitive" key={primitive.id}>
                  <div className="docs-material__primitive-head">
                    <h4>{primitive.name}</h4>
                    <span className="docs-material__family">{primitive.family}</span>
                  </div>
                  <p className="docs-material__description">{primitive.description}</p>
                  <p className="docs-material__recipe">
                    <span>レシピ</span>
                    {primitive.recipe}
                  </p>
                  <p className="docs-material__api">
                    <span>React API</span>
                    <code>{primitive.api}</code>
                  </p>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <div className="docs-catalog__notice">
        <Callout title="アクセシビリティの前提" tone="warning">
          <ul>
            <li>装飾レイヤーは aria-hidden と pointer-events: none を付け、テキストや操作を邪魔しないようにします。</li>
            <li>モーションは静止を既定とし、prefers-reduced-motion: no-preference のときだけ有効化します。</li>
            <li>文字色は背景の最もコントラストが低い点で評価し、通常テキスト4.5:1・大テキスト3:1を満たします。</li>
          </ul>
        </Callout>
      </div>

      <NextLinks
        items={[
          { href: '#/gallery', label: 'MVマテリアル・ギャラリー', hint: '作品ごとの素材案を見る' },
          { href: '#/components', label: 'コンポーネント', hint: '既存の部品へ接続する' },
        ]}
      />
    </div>
  );
}
