/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: { customfont: ['var(--font-customfont)'] },
      screens: {
        '3xl': '1920px',
      },

      boxShadow: {
        v1: '0px 0px 27px rgba(0, 0, 0, 0.3)',
        v2: '0px 0px 9px rgba(0, 0, 0, 0.13)',
        v3: '0px 5px 19px rgba(0, 0, 0, 0.14)',
        v4: '0px 4px 10px rgba(0, 0, 0, 0.35)',
        v5: '0px 0px 7px rgba(0, 0, 0, 0.13)',
        v6: '0px 0px 19px rgba(224, 225, 255, 0.5)',
        v7: '0px 4px 30px 2px rgba(224, 225, 255, 0.5)',
        v8: '0px 0px 30px 2px rgba(229, 231, 235, 0.8)',
        v9: '0px 0px 7px rgba(74,222,128)',
        v10: '0px 0px 7px rgba(125,69,192)',
        v11: '0px 0px 19px 0px rgba(0, 0, 0, 0.09)',
        v12: '0px 0px 7px 0px rgba(0, 0, 0, 0.13);',
        v13: '0px 0px 6px 0px rgba(0, 0, 0, 0.10)',
        v14: '0px 4px 12px 0px rgba(0, 0, 0, 0.12)',
        v15: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        indigo50: '#F5F5FF',
        indigo100: '#E1E1FE',
        indigo200: '#C3C4FE',
        indigo300: '#9B9DFD',
        indigo400: '#7375FD',
        indigo500: '#4E52F8',
        indigo550: '#4B4EFC',
        indigo600: '#3e41c6',
        indigo700: '#2e3194',
        indigo800: '#27297c',
        indigo900: '#D1D5DB',
        green100: '#DCFCE7',
        green200: '#BBF7D0',
        green300: '#86EFAC',
        green400: '#4ADE80',
        green500: '#22C55E',
        green600: '#F0FDF4',
        neutral00: '#FFFFFF',
        neutral50: '#F9FAFB',
        neutral100: '#F3F4F6',
        neutral200: '#E5E7EB',
        neutral250: '#E4E4E4',
        neutral300: '#C2C2C9',
        neutral350: '#C3C3C3',
        neutral360: '#d1d5db',
        neutral375: '#BBBEC1',
        neutral400: '#AEAEB7',
        neutral450: '#9CA3AF',
        neutral500: '#717182',
        neutral600: '#5D5D70',
        neutral650: '#4B5563',
        neutral675: '#374151',
        neutral700: '#35354D',
        neutral750: '#6B7280',
        neutral800: '#2A2A3D',
        neutral900: '#1F1F2E',
        neutral1000: '#000000',
        neutral1200: '#D1D5DB',
        neutral1100: '#d1d5db',
        blue50: '#EFF6FF',
        blue100: '#E3F2FD',
        blue200: '#BFDBFE',
        blue300: '#60A5FA',
        blue400: '#3B82F6',
        blue500: '#2563EB',
        blue600: '#256DD3',
        blue700: '#1E3A8A',
        blue800: '#282843',
        blue900: '#1F2937',
        yellowGreen100: '#ECFCCD',
        yellowGreen200: '#D9F99D',
        yellowGreen300: '#BEF264',
        yellowGreen400: '#8CD01D',
        red50: '#FEF2F2',
        red100: '#FEE2E2',
        red200: '#FECACA',
        red300: '#FCA5A5',
        red400: '#F87171',
        red500: '#EF6F5D',
        yellow100: '#FFCD4E',
        yellow200: '#FFCD4E',
        yellow300: '#FFCD4E',
        yellow350: '#FBBF24',
        yellow400: '#FCA43F',
        yellow500: '#FFFCF1',
        yellow600: '#FDE68A',
      },
      backgroundImage: {
        dotIcon: `url('/images/dotIcon.webp')`,
        dotV2Icon: `url('/images/dotWhiteIcon.webp')`,
      },
    },
  },
  plugins: [],
};
