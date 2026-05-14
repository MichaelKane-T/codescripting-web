/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:  ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        cream: '#f0ede8',
        paper: '#e8e4de',
        ink:   '#1a2340',
        ink2:  '#4a5568',
        ink3:  '#9aa3b0',
        blue:  '#3b7bd4',
        blue2: '#1e3a6e',
      },
      animation: {
        'blink':  'blink 2s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'fade-up-delay': 'fadeUp 0.8s 0.3s cubic-bezier(0.22,1,0.36,1) both',
        'fade-up-delay2': 'fadeUp 0.8s 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in-slow': 'fadeIn 1.2s 1.4s both',
      },
      keyframes: {
        blink:      { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        'bounce-slow': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(5px)' } },
        fadeUp:     { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:     { from: { opacity: '0' }, to: { opacity: '1' } },
      },
    },
  },
  plugins: [],
}
