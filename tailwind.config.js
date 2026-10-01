/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030307',
          900: '#070711',
          850: '#0c0c1b',
          800: '#121226',
          700: '#1b1b36',
          600: '#2b2a52',
        },
        nebula: {
          purple: '#9333ea',
          violet: '#7c3aed',
          pink: '#f43f5e',
          crimson: '#e11d48',
          gold: '#fcd34d',
          starlight: '#f8fafc',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Inter"', 'Outfit', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', '"Great Vibes"', 'cursive'],
        display: ['"Cinzel"', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(225, 29, 72, 0.3))' },
          '100%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.6))' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        drift: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(147, 51, 234, 0.25)',
        'starlight': '0 0 25px rgba(253, 224, 71, 0.35)',
        'rose-glow': '0 0 35px rgba(225, 29, 72, 0.35)',
      }
    },
  },
  plugins: [],
}
