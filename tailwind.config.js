/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        // Larger base sizes for accessibility
        'base': '18px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '28px',
        '3xl': '32px',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Warm terracotta — the brand's primary color
        primary: {
          50: '#fdf4ee',
          100: '#fbe7d9',
          200: '#f5c8a8',
          300: '#eea877',
          400: '#e38347',
          500: '#d66a2c',
          600: '#b8551f',
          700: '#954419',
          800: '#733415',
          900: '#552710',
        },
        // Deep teal — accent / secondary actions
        accent: {
          50: '#effbf9',
          100: '#d7f3ee',
          200: '#aee6dc',
          300: '#7dd3c4',
          400: '#45b3a0',
          500: '#2c8f80',
          600: '#21766a',
          700: '#1a5d54',
          800: '#154742',
          900: '#0f3733',
        },
        cream: {
          DEFAULT: '#fbf7f1',
          50: '#fffdfb',
          100: '#fbf7f1',
          200: '#f4ece0',
        },
        ink: '#2b2420',
      },
    },
  },
  plugins: [],
}
