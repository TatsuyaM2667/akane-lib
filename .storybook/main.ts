import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      config.base = '/akane-lib/storybook/';
    }
    return config;
  },
};

export default config;
