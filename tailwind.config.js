/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#03050d',
          900: '#070b1a',
          800: '#0a0f24',
          700: '#101632',
          600: '#1a2145',
        },
        accent: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          violet: '#8b5cf6',
          fuchsia: '#d946ef',
          emerald: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse at center, rgba(34,211,238,0.18), transparent 60%)',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.25), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(34,211,238,0.45)',
        'glow-violet': '0 0 60px -10px rgba(139,92,246,0.5)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
    },
  },
  plugins: [],
};
