import { useEffect, useState } from 'react';
import { AkaneThemeProvider, TwilightSky, useAkaneTheme } from '../index';
import { PHASES } from './content';
import { ComponentsPage, FaqPage, HomePage, MotifsPage, StartPage, ThemePage } from './pages';
import './docs.css';

type PageId = 'home' | 'start' | 'theme' | 'components' | 'motifs' | 'faq';

interface Route {
  page: PageId;
  slug?: string;
}

const NAV_ITEMS: { page: PageId; label: string; href: string }[] = [
  { page: 'home', label: 'デモ', href: '#/' },
  { page: 'start', label: 'はじめに', href: '#/start' },
  { page: 'theme', label: 'テーマと空', href: '#/theme' },
  { page: 'components', label: 'コンポーネント', href: '#/components' },
  { page: 'motifs', label: 'モチーフ辞典', href: '#/motifs' },
  { page: 'faq', label: 'FAQ', href: '#/faq' },
];

function parseRoute(): Route {
  const [page, slug] = window.location.hash.replace(/^#\/?/, '').split('/');
  if (page === 'start' || page === 'theme' || page === 'components' || page === 'motifs' || page === 'faq') {
    return { page, slug };
  }
  return { page: 'home' };
}

function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(parseRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [route.page, route.slug]);

  return route;
}

function PhaseIndicator() {
  const theme = useAkaneTheme();
  return (
    <div className="docs-phase-indicator" role="group" aria-label="空の時間帯">
      {PHASES.map((phase) => (
        <button
          key={phase.id}
          type="button"
          className={`docs-phase-indicator__dot docs-phase-indicator__dot--${phase.id}`}
          aria-label={`${phase.chapter} ${phase.name}に切り替える`}
          title={`${phase.name}（${phase.id}）`}
          aria-pressed={theme?.phase === phase.id}
          onClick={() => theme?.setPhase(phase.id)}
        />
      ))}
    </div>
  );
}

function SiteHeader({ route }: { route: Route }) {
  return (
    <header className="docs-header">
      <div className="docs-header__inner">
        <a className="docs-brand" href="#/">
          <img src="./favicon.svg" alt="" width="32" height="32" />
          <span>
            akane-lib
            <small>DOCUMENTATION</small>
          </span>
        </a>

        <nav className="docs-header__nav" aria-label="ドキュメントのナビゲーション">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.page}
              href={item.href}
              aria-current={route.page === item.page ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="docs-header__tools">
          <PhaseIndicator />
          <a className="docs-header__storybook" href="./storybook/">
            Storybook <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="docs-footer">
      <div className="docs-footer__inner">
        <div className="docs-footer__brand">
          <strong>akane-lib</strong>
          <p>茜空と記憶の詩的 React UI ライブラリ</p>
        </div>
        <nav aria-label="フッターナビゲーション">
          <a href="https://github.com/TatsuyaM2667/akane-lib">GitHub</a>
          <a href="https://www.npmjs.com/package/@tatsuyamiura2667/akane-lib">npm</a>
          <a href="./storybook/">Storybook</a>
          <a href="#/faq">FAQ</a>
        </nav>
        <p className="docs-footer__meta">MIT License · v0.4.7 · ヨルシカの物語に着想を得た非公式ライブラリ</p>
      </div>
    </footer>
  );
}

function RoutedContent({ route }: { route: Route }) {
  switch (route.page) {
    case 'start':
      return <StartPage />;
    case 'theme':
      return <ThemePage />;
    case 'components':
      return <ComponentsPage slug={route.slug} />;
    case 'motifs':
      return <MotifsPage />;
    case 'faq':
      return <FaqPage />;
    default:
      return <HomePage />;
  }
}

export default function DocsSite() {
  const route = useRoute();

  return (
    <AkaneThemeProvider defaultPhase="night">
      <TwilightSky ambient fireworks>
        <SiteHeader route={route} />
        <main className="docs-main" id="main">
          <RoutedContent route={route} />
        </main>
        <SiteFooter />
      </TwilightSky>
    </AkaneThemeProvider>
  );
}
