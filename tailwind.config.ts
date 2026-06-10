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

      /* ── Font size scale with Nastaliq-tuned line heights ──
         Nastaliq is a tall calligraphic script — smaller text needs more
         vertical breathing room than Latin equivalents.               */
      fontSize: {
        'xs':   ['0.75rem',    { lineHeight: '1.6'  }],  /* 12px — captions, labels  */
        'sm':   ['0.8125rem',  { lineHeight: '1.65' }],  /* 13px — secondary, nav    */
        'base': ['1rem',       { lineHeight: '1.85' }],  /* 16px — body text         */
        'lg':   ['1.125rem',   { lineHeight: '1.75' }],  /* 18px — large body, intro */
        'xl':   ['1.25rem',    { lineHeight: '1.65' }],  /* 20px — lead text         */
        '2xl':  ['1.5rem',     { lineHeight: '1.5'  }],  /* 24px — small headings    */
        '3xl':  ['1.875rem',   { lineHeight: '1.4'  }],  /* 30px — section headings  */
        '4xl':  ['2.25rem',    { lineHeight: '1.35' }],  /* 36px — page headings     */
        '5xl':  ['3rem',       { lineHeight: '1.3'  }],  /* 48px — hero sub-heads    */
        '6xl':  ['3.75rem',    { lineHeight: '1.25' }],  /* 60px — hero headings     */
        '7xl':  ['4.5rem',     { lineHeight: '1.2'  }],  /* 72px — display           */
        '8xl':  ['6rem',       { lineHeight: '1.15' }],  /* 96px — jumbo display     */
        '9xl':  ['8rem',       { lineHeight: '1.1'  }],  /* 128px                    */
      },

      /* ── Semantic line-height aliases ── */
      lineHeight: {
        none:     '1',
        tight:    '1.25',
        snug:     '1.375',
        normal:   '1.5',
        relaxed:  '1.85',   /* Nastaliq body — more generous than Tailwind's 1.625 */
        loose:    '2.1',
        body:     '1.85',   /* alias for relaxed */
        heading:  '1.35',   /* generic heading line height */
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
            color:      '#1e293b',
            lineHeight: '1.85',
            fontSize:   '1rem',
            a: {
              color:          '#b8900e',
              textDecoration: 'underline',
              fontWeight:     '500',
            },
            'a:hover': { color: '#9a7509' },
            h1: { lineHeight: '1.25', letterSpacing: '0', fontWeight: '700' },
            h2: { lineHeight: '1.3',  letterSpacing: '0', fontWeight: '700' },
            h3: { lineHeight: '1.35', letterSpacing: '0', fontWeight: '700' },
            h4: { lineHeight: '1.5',  letterSpacing: '0', fontWeight: '700' },
            blockquote: {
              borderInlineStartColor: '#b8900e',
              color: '#475569',
              fontStyle: 'normal',
            },
            strong: { color: '#0f172a', fontWeight: '700' },
            code:   { color: '#b8900e', fontWeight: '500' },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
