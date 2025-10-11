/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B76FF',
        accent: '#FF7B6B',
        success: '#9AE66E',
        'bg-light': '#F6F8FA',
        'bg-dark': '#0B1020',
        coral: {
          300: '#FFB4A6',
          500: '#FF7B6B',
          700: '#E55A4A',
        },
      },
      spacing: {
        'xs': '6px',
        's': '12px',
        'm': '24px',
        'l': '40px',
        'xl': '64px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(2, 6, 23, 0.08)',
        'deep': '0 20px 60px rgba(2, 6, 23, 0.18)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
