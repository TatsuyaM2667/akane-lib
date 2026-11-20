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

  it('ヘッダーの時間帯ボタンでテーマが切り替わる', () => {
    const { container } = render(<DocsSite />);

    fireEvent.click(screen.getByRole('button', { name: '一 夕凪に切り替える' }));

    expect(container.querySelector('[data-akane-phase="dusk"]')).toBeInTheDocument();
  });
});
