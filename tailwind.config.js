/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        forest: {
          50: '#f0f7f2', 100: '#dceddf', 200: '#b9dac1', 300: '#8cbf99',
          400: '#5ea072', 500: '#3d8253', 600: '#2c6840', 700: '#225032',
          800: '#1a3e27', 900: '#152f1f', 950: '#0a1a11',
        },
        gold: {
          50: '#fdfcee', 100: '#faf5cc', 200: '#f5e989', 300: '#f0d944',
          400: '#e8c51e', 500: '#c9a213', 600: '#a27c0e', 700: '#825d10',
          800: '#6c4b14', 900: '#5c3d16', 950: '#361f09',
        },
        cream: {
          50: '#fdfbf7', 100: '#f8f2e8', 200: '#f0e4cc',
          300: '#e4ceaa', 400: '#d4b385', 500: '#c49963',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
