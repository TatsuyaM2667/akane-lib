import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/tokens.css';
import { AkaneThemeProvider, TwilightSky, type SkyPhase } from '../src/index';

const preview: Preview = {
  globalTypes: {
    skyPhase: {
      description: '空の時間帯テーマ',
      toolbar: {
        title: '空の時間帯',
        icon: 'mirror',
        items: [
          { value: 'dusk', title: '一: 夕凪 (dusk)' },
          { value: 'twilight', title: '二: 茜さす (twilight)' },
          { value: 'night', title: '三: 第一夜 (night)' },
          { value: 'dawn', title: '四: 夜明け (dawn)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    skyPhase: 'twilight',
  },
  decorators: [
    (Story, context) => {
      const phase = (context.globals.skyPhase || 'twilight') as SkyPhase;
      return (
        <AkaneThemeProvider phase={phase}>
          <TwilightSky ambient fireworks>
            <div
              style={{
                minHeight: '100vh',
                padding: '3rem 1.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Story />
            </div>
          </TwilightSky>
        </AkaneThemeProvider>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
