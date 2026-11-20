import type { Preview } from '@storybook/react-vite';
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
          { value: 'midnight', title: '一: 群青 (midnight)' },
          { value: 'night', title: '二: 第一夜 (night)' },
          { value: 'dawn', title: '三: 夜明け (dawn)' },
          { value: 'morning', title: '四: 朝霧 (morning)' },
          { value: 'day', title: '五: 白昼 (day)' },
          { value: 'dusk', title: '六: 夕凪 (dusk)' },
          { value: 'golden', title: '七: 金色 (golden)' },
          { value: 'twilight', title: '八: 茜さす (twilight)' },
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
