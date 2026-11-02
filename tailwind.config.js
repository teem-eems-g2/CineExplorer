/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cine-bg': '#0A0A0F',
        'cine-bg-secondary': '#0F0F1A',
        'cine-primary': '#E8B4B8',
        'cine-accent': '#FF6B6B',
        'cine-gold': '#F5C518',
        'cine-foreground': '#F5F5F0',
        'cine-muted': 'rgba(245, 245, 240, 0.5)',
        'cine-border': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, transparent 40%, rgba(10,10,15,0.85) 100%)',
        'card-gradient':
          'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.4) 40%, transparent 70%)',
        'cine-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #E8B4B8 100%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '4px',
      },
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'blob-float': 'blobFloat 12s ease-in-out infinite',
        'blob-float-2': 'blobFloat2 16s ease-in-out infinite',
        shimmer: 'shimmer 1.8s infinite',
        'modal-in': 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 24px 48px rgba(0,0,0,0.6)',
        'glow-accent': '0 0 40px rgba(255,107,107,0.2)',
        'glow-primary': '0 0 40px rgba(232,180,184,0.2)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};
