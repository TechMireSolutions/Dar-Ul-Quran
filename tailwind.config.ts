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
      },
    },
  },
}

export default config
