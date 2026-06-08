import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    { pattern: /^bg-dq-(50|100|200|300|400|500|600|700|800|900|950)(\/\d+)?$/, variants: ['hover', 'focus', 'active', 'group-hover'] },
    { pattern: /^text-dq-(50|100|200|300|400|500|600|700|800|900|950)(\/\d+)?$/, variants: ['hover', 'focus', 'group-hover'] },
    { pattern: /^border-dq-(50|100|200|300|400|500|600|700|800|900|950)(\/\d+)?$/, variants: ['hover', 'focus', 'focus-within'] },
    { pattern: /^from-dq-(50|100|200|300|400|500|600|700|800|900|950)(\/\d+)?$/ },
    { pattern: /^to-dq-(50|100|200|300|400|500|600|700|800|900|950)(\/\d+)?$/ },
    { pattern: /^via-dq-(50|100|200|300|400|500|600|700|800|900|950)(\/\d+)?$/ },
    { pattern: /^ring-dq-(50|100|200|300|400|500|600|700|800|900|950)(\/\d+)?$/ },
    { pattern: /^shadow-dq-(50|100|200|300|400|500|600|700|800|900|950)(\/\d+)?$/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-urdu,system-ui)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-urdu,system-ui)', 'system-ui', 'sans-serif'],
      },
      colors: {
        dq: {
          50:  '#fdf8e8',
          100: '#faefc4',
          200: '#f3d988',
          300: '#e8c246',
          400: '#d4a820',
          500: '#b8900e',
          600: '#9a7509',
          700: '#7c5d07',
          800: '#5f4605',
          900: '#3d3100',
          950: '#2a2200',
        },
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)'     },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)'    },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)'  },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up':   'fadeInUp   0.65s cubic-bezier(0.16,1,0.3,1) both',
        'fade-left': 'fadeInLeft 0.65s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in':  'scaleIn    0.5s  cubic-bezier(0.16,1,0.3,1) both',
        shimmer:     'shimmer 3s linear infinite',
        float:       'floatY  4s ease-in-out infinite',
      },
      boxShadow: {
        card:         '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 12px 32px -4px rgb(0 0 0 / 0.11), 0 4px 12px -2px rgb(0 0 0 / 0.06)',
        'gold-glow':  '0 6px 24px rgba(184,144,14,0.38)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#0f172a',
            a: { color: '#b8900e' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
