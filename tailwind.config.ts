import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark cinematic base — #0a0a0f deepening toward indigo/violet.
        ink: {
          DEFAULT: '#0a0a0f',
          deep: '#06060a',
          soft: '#12121c',
          line: '#1d1d2e',
        },
        // Accent ramp used for the violet → cyan gradient throughout.
        accent: {
          violet: '#8b5cf6',
          purple: '#a855f7',
          indigo: '#6366f1',
          cyan: '#22d3ee',
          sky: '#38bdf8',
          pink: '#ec4899',
        },
      },
      fontFamily: {
        // Wired to the next/font variables set on <html> in app/layout.tsx.
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // The signature violet → cyan accent gradient.
        'accent-gradient':
          'linear-gradient(110deg, #8b5cf6 0%, #6366f1 35%, #38bdf8 70%, #22d3ee 100%)',
        'accent-radial':
          'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.18), transparent 60%)',
        'hero-glow':
          'radial-gradient(40% 40% at 50% 30%, rgba(99,102,241,0.25), transparent 70%)',
        // Subtle film-grain noise overlay (data URI SVG) layered over the page.
        noise:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: '0 0 24px rgba(139,92,246,0.35)',
        'glow-cyan': '0 0 24px rgba(34,211,238,0.30)',
        'glow-lg': '0 0 60px rgba(99,102,241,0.35)',
        glass: '0 8px 40px rgba(0,0,0,0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-26px)' },
        },
        riseUp: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-120vh) translateX(20px)', opacity: '0' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        spinReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(4%, -6%) scale(1.1)' },
          '66%': { transform: 'translate(-4%, 4%) scale(0.95)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        rise: 'riseUp linear infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
        'spin-reverse': 'spinReverse 26s linear infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        aurora: 'aurora 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
