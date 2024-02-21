import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx,html}',
    './components/**/*.{js,ts,jsx,tsx,mdx,html}',
    './app/**/*.{js,ts,jsx,tsx,mdx,html}',
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textColor: {
        'transparent-to-white': 'transparent',
      },
      animation: {  
        'fade-in-down': 'fadeInDown 1s ease-out',
        'fly-in-left': 'flyInLeft 1s ease-out',
        'show-up': 'showUp 1s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-up': 'fadeInUp 1s ease-out'
      },
      keyframes: {  
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        flyInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        showUp: {
          '0%': {
            opacity: '0',
            transform: 'scale(0)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text', 
          'text-fill-color': 'transparent',
        },
      }
      addUtilities(newUtilities)
    },
    daisyui
  ],
}

export default config