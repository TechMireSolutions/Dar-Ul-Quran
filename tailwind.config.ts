import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Geeza Pro', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'system-ui', 'sans-serif'],
        // Explicit urdu class for components that need to override font-sans
        urdu:    ['Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Geeza Pro', 'serif'],
      },

      fontSize: {
        '2xs':  ['0.65625rem', { lineHeight: '1.5'  }], /* 10.5px — eyebrow labels */
        'xs':   ['0.75rem',    { lineHeight: '1.6'  }],
        'sm':   ['0.8125rem',  { lineHeight: '1.65' }],
        'base': ['1rem',       { lineHeight: '1.85' }],
        'lg':   ['1.125rem',   { lineHeight: '1.75' }],
        'xl':   ['1.25rem',    { lineHeight: '1.65' }],
        '2xl':  ['1.5rem',     { lineHeight: '1.5'  }],
        '3xl':  ['1.875rem',   { lineHeight: '1.4'  }],
        '4xl':  ['2.25rem',    { lineHeight: '1.35' }],
        '5xl':  ['3rem',       { lineHeight: '1.3'  }],
        '6xl':  ['3.75rem',    { lineHeight: '1.25' }],
        '7xl':  ['4.5rem',     { lineHeight: '1.2'  }],
        '8xl':  ['6rem',       { lineHeight: '1.15' }],
        '9xl':  ['8rem',       { lineHeight: '1.1'  }],
      },

      lineHeight: {
        none:           '1',
        tight:          '1.25',
        snug:           '1.375',
        normal:         '1.5',
        relaxed:        '1.85',
        loose:          '2.1',
        body:           '1.85',
        heading:        '1.35',
        // Nastaliq-specific leading — reserve vertical space before font loads
        'urdu':         '1.9',
        'urdu-display': '1.3',
        'urdu-tight':   '1.6',
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
        'gold-sm':    '0 4px 16px rgb(184 144 14 / 0.3)',
        'gold-md':    '0 4px 20px rgb(184 144 14 / 0.3)',
        'gold-lg':    '0 4px 24px rgb(184 144 14 / 0.45)',
        'gold-hover': '0 6px 22px rgb(184 144 14 / 0.45)',
        'gold-subtle': '0 4px 16px rgb(184 144 14 / 0.08)',
        'gold-dot':   '0 0 6px rgb(212 168 32 / 0.5)',
        'gold-icon':  '0 2px 8px rgb(184 144 14 / 0.12)',
        'focus-gold': '0 0 0 3px rgb(184 144 14 / 0.15)',
        'focus-gold-subtle': '0 0 0 3px rgb(184 144 14 / 0.12)',
        'inset-highlight': 'inset 0 1px 0 rgb(255 255 255 / 0.18)',
        nav:          '0 8px 32px rgb(0 0 0 / 0.13)',
        'nav-scrolled': '0 2px 20px rgb(0 0 0 / 0.4)',
      },

      backgroundImage: {
        'dot-grid':       'radial-gradient(circle, rgb(226 232 240) 1px, transparent 1px)',
        'dot-grid-gold':  'radial-gradient(circle, rgb(212 168 32 / 0.2) 1px, transparent 1px)',
        'hero-surface':   'linear-gradient(155deg, rgb(253 251 242) 0%, #fff 55%, rgb(253 251 240) 100%)',
        'hero-fallback':  'linear-gradient(135deg, rgb(240 216 154) 0%, rgb(253 243 208) 60%, #fff 100%)',
        'hero-fade-rtl':  'linear-gradient(to left, rgb(253 251 242) 0%, rgb(253 251 242 / 0.88) 16%, rgb(253 251 242 / 0.2) 46%, transparent 68%)',
        'hero-fade-ltr':  'linear-gradient(to right, rgb(253 251 242) 0%, rgb(253 251 242 / 0.88) 16%, rgb(253 251 242 / 0.2) 46%, transparent 68%)',
        'gold-radial':    'radial-gradient(ellipse at 75% 35%, rgb(184 144 14 / 0.1) 0%, transparent 60%)',
        'gold-radial-sm': 'radial-gradient(circle, rgb(184 144 14 / 0.6) 0%, transparent 70%)',
        'gold-line':      'linear-gradient(to right, rgb(212 168 32), rgb(212 168 32 / 0))',
        'gold-divider':   'linear-gradient(to bottom, transparent, rgb(212 168 32 / 0.3), transparent)',
        'gold-cta':       'linear-gradient(135deg, rgb(196 154 24) 0%, rgb(154 117 9) 100%)',
        'gold-icon':      'linear-gradient(135deg, rgb(253 248 232) 0%, rgb(250 239 196) 100%)',
        'dot-grid-slate': 'radial-gradient(circle, rgb(203 213 225) 1px, transparent 1px)',
      },

      backgroundSize: {
        'dot-grid': '28px 28px',
        'dot-grid-lg': '32px 32px',
        'dot-grid-sm': '24px 24px',
      },
    },
  },
}

export default config
