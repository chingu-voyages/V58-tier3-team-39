import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'secondary-bg': 'var(--secondary-bg)',
        'main-text': 'var(--main-text)',
        'secondary-text': 'var(--secondary-text)',
        'footer-border': 'var(--footer-border)',

        red: '#b42263',
        green: '#0cdf89',
        blue: '#26A3DF',
        purple: '#87499C',
        'blue-brand': '#4d77ff',
      },
    },
  },
} satisfies Config;
