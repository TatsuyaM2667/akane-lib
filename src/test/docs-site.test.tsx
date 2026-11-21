import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import DocsSite from '../docs/DocsSite';

beforeAll(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  window.location.hash = '';
});

describe('DocsSite', () => {
  it('デモのヒーローとナビゲーションを表示する', () => {
    render(<DocsSite />);

    expect(screen.getByRole('heading', { level: 1, name: /茜さす空と/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'コンポーネント' })).toHaveAttribute(
      'href',
      '#/components',
    );
    expect(screen.getByText('INTERACTIVE DEMO')).toBeInTheDocument();
    expect(screen.getByText('言葉の代わりに、白い信号が降る')).toBeInTheDocument();
    expect(screen.getByText('テレパスと昼鳶')).toBeInTheDocument();
  });

  it('ハッシュの変更でコンポーネント詳細とプレビューに切り替わる', () => {
    render(<DocsSite />);

    act(() => {
      window.location.hash = '#/components/typewriter-censor-text';
      fireEvent(window, new Event('hashchange'));
    });

    expect(
      screen.getByRole('heading', { level: 2, name: 'TypewriterCensorText' }),
    ).toBeInTheDocument();
    expect(screen.getByText('ライブプレビュー')).toBeInTheDocument();
    expect(screen.getByText(/黒塗りの指定/)).toBeInTheDocument();
  });

  it('MV資料・年表・素材システムのルートが切り替わる', () => {
    render(<DocsSite />);

    expect(screen.getByRole('link', { name: 'MV資料' })).toHaveAttribute('href', '#/gallery');
    expect(screen.getByRole('link', { name: '年表' })).toHaveAttribute('href', '#/timeline');
    expect(screen.getByRole('link', { name: '素材システム' })).toHaveAttribute('href', '#/materials');

    act(() => {
      window.location.hash = '#/gallery';
      fireEvent(window, new Event('hashchange'));
    });
    expect(
      screen.getByRole('heading', { level: 1, name: 'MVマテリアル・ギャラリー' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/43 \/ 43 件を表示/)).toBeInTheDocument();

    act(() => {
      window.location.hash = '#/timeline';
      fireEvent(window, new Event('hashchange'));
    });
    expect(screen.getByRole('heading', { level: 1, name: 'モチーフ年表' })).toBeInTheDocument();

    act(() => {
      window.location.hash = '#/materials';
      fireEvent(window, new Event('hashchange'));
    });
    expect(screen.getByRole('heading', { level: 1, name: '素材システム' })).toBeInTheDocument();
    expect(screen.getByText('--yk-blue-hour')).toBeInTheDocument();
  });

  it('ヘッダーの時間帯ボタンでテーマが切り替わる', () => {
    const { container } = render(<DocsSite />);

    fireEvent.click(screen.getByRole('button', { name: '六 夕凪に切り替える' }));

    expect(container.querySelector('[data-akane-phase="dusk"]')).toBeInTheDocument();
  });
});
